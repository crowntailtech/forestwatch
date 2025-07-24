resource "aws_db_subnet_group" "mysql_subnet_group" {
  name       = "mysql-subnet-group"
  subnet_ids = [aws_subnet.public_a.id, aws_subnet.public_b.id]

  tags = {
    Name = "MySQL Subnet Group"
  }
}

resource "aws_security_group" "mysql_sg" {
  name        = "mysql-public-sg"
  description = "Allow MySQL public access"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "mysql" {
  identifier              = "public-mysql-db"
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  db_name                 = "defaultdb"
  username                = "admin"
  password                = "QZZLJlcdpp871("
  publicly_accessible     = true
  skip_final_snapshot     = true
  vpc_security_group_ids  = [aws_security_group.mysql_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.mysql_subnet_group.name

  tags = {
    Name = "MyPublicMySQL"
  }
}
