resource "aws_ecr_repository" "backend_repo" {
  name = "${var.student_id}-backend"
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    Name = "Backend Repo"
  }
}

resource "aws_ecr_repository" "frontend_repo" {
  name = "${var.student_id}-frontend"
  image_scanning_configuration {
    scan_on_push = true
  }
  tags = {
    Name = "Frontend Repo"
  }
}
