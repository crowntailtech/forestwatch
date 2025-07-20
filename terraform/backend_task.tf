resource "aws_ecs_task_definition" "backend" {
  family                   = "${var.student_id}-backend-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = "${aws_ecr_repository.backend_repo.repository_url}:latest"
      essential = true
      portMappings = [{ containerPort = 5000 }]
      environment = [
        { name = "FLASK_ENV", value = "production" },
        { name = "DB_HOST", value = "your-rds-endpoint-here" },
        { name = "JWT_SECRET", value = "your-jwt-secret" },
        { name = "AWS_REGION", value = "us-east-1" },
        { name = "S3_BUCKET", value = aws_s3_bucket.complaint_images.bucket },
        { name = "SNS_TOPIC_ARN", value = aws_sns_topic.alert_topic.arn },
        { name = "SQS_QUEUE_URL", value = aws_sqs_queue.audit_queue.id }
      ]
    }
  ])
}
