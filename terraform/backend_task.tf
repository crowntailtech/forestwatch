resource "aws_ecs_task_definition" "backend" {
  family                   = "${var.student_id}-backend-task"
  network_mode            = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                     = "256"
  memory                  = "512"
  execution_role_arn      = aws_iam_role.ecs_execution.arn
  task_role_arn           = aws_iam_role.backend_task_role.arn

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = "${var.backend_ecr_url}"
      essential = true
      portMappings = [{ containerPort = 5000 }]
      environment = [
        { name = "FLASK_ENV", value = "production" },
        { name = "DB_HOST", value = var.rds_endpoint },
        { name = "JWT_SECRET", value = var.jwt_secret },
        { name = "AWS_REGION", value = "us-east-1" },
        { name = "S3_BUCKET", value = aws_s3_bucket.media.bucket },
        { name = "SNS_TOPIC_ARN", value = aws_sns_topic.alerts.arn },
        { name = "SQS_QUEUE_URL", value = aws_sqs_queue.audit_queue.url }
      ]
    }
  ])
}
