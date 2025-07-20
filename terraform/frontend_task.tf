resource "aws_ecs_task_definition" "frontend" {
  family                   = "${var.student_id}-frontend-task"
  network_mode            = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                     = "256"
  memory                  = "512"
  execution_role_arn      = aws_iam_role.ecs_execution.arn

  container_definitions = jsonencode([
    {
      name      = "frontend"
      image     = "${aws_ecr_repository.frontend_repo.repository_url}:latest"
      essential = true
      portMappings = [{ containerPort = 80 }]
    }
  ])
}
