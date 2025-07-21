resource "aws_ecs_service" "combined" {
  name            = "${var.student_id}-combined-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.combined.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets         = [aws_subnet.public_a.id, aws_subnet.public_b.id]
    assign_public_ip = true
    security_groups = [aws_security_group.ecs_sg.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.combined_tg.arn
    container_name   = "combined-app"
    container_port   = 8000 # serving frontend on 8000 via Python HTTP server
  }

  depends_on = [aws_lb_listener.combined_listener]
}
