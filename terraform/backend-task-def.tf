resource "aws_ecs_task_definition" "backend_task" {
  family                   = "backend-task-${var.student_id}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = "${aws_ecr_repository.backend.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = 5000
          hostPort      = 5000
        }
      ]
      environment = [
        {
          name  = "FLASK_ENV"
          value = "production"
        },
        {
          name  = "S3_BUCKET"
          value = aws_s3_bucket.image_bucket.bucket
        }
      ]
      secrets = [
        {
          name      = "S3_ACCESS_KEY"
          valueFrom = aws_secretsmanager_secret_version.backend_env.arn
        }
      ]
    }
  ])

  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_execution_role.arn
}
