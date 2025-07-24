resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "${var.student_id}-rds-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]

  tags = {
    Name = "${var.student_id}-rds-subnet-group"
  }
}

resource "aws_security_group" "rds_sg" {
  name        = "${var.student_id}-rds-sg"
  description = "Allow backend ECS access"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.backend_ecs_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.student_id}-rds-sg"
  }
}

resource "aws_db_instance" "mysql" {
  identifier              = "${var.student_id}-mysql-db"
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  db_name                 = "forestwatch"
  username                = var.rds_username
  password                = var.rds_password
  port                    = 3306
  skip_final_snapshot     = true
  vpc_security_group_ids  = [aws_security_group.rds_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.rds_subnet_group.name
  publicly_accessible     = false

  tags = {
    Name = "${var.student_id}-mysql-db"
  }
}

output "rds_endpoint" {
  value = aws_db_instance.mysql.endpoint
}
