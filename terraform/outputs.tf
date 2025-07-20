output "backend_ecr_repo_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "frontend_ecr_repo_url" {
  value = aws_ecr_repository.frontend.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.forest_cluster.name
}

output "backend_service_name" {
  value = aws_ecs_service.backend_service.name
}

output "frontend_service_name" {
  value = aws_ecs_service.frontend_service.name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.image_bucket.bucket
}

output "sqs_queue_url" {
  value = aws_sqs_queue.audit_queue.id
}

output "sns_topic_arn" {
  value = aws_sns_topic.alert_topic.arn
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.audit_logs.name
}

output "lambda_moderation_name" {
  value = aws_lambda_function.image_moderation.function_name
}
