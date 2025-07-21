resource "aws_ecs_task_definition" "combined" {
  family                   = "${var.student_id}-combined-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "combined-app"
      image     = "${aws_ecr_repository.combined_repo.repository_url}:latest"
      essential = true
      portMappings = [
        { containerPort = 5000 },
        { containerPort = 8000 }
      ],
      environment = [
        { name = "FLASK_ENV",     value = "production" },
        { name = "DB_HOST",       value = "your-rds-endpoint-here" },
        { name = "JWT_SECRET",    value = "your-jwt-secret" },
        { name = "AWS_REGION",    value = "us-east-1" },
        { name = "S3_BUCKET",     value = aws_s3_bucket.complaint_images.bucket },
        { name = "SNS_TOPIC_ARN", value = aws_sns_topic.alert_topic.arn },
        { name = "SQS_QUEUE_URL", value = aws_sqs_queue.audit_queue.id },
        { name = "S3_ACCESS_KEY", value = var.s3_access_key }
      ],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "/ecs/${var.student_id}-combined"
          awslogs-region        = "us-east-1"
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])
}
