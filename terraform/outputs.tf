# Combined ECR Repo
output "combined_ecr_repo_url" {
  value = aws_ecr_repository.combined_repo.repository_url
}

# Combined ECS Service
output "combined_service_name" {
  value = aws_ecs_service.combined.name
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

# S3 Bucket for complaint images
output "s3_bucket_name" {
  value = aws_s3_bucket.complaint_images.bucket
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
