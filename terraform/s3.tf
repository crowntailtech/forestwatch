resource "aws_s3_bucket" "complaint_images" {
  bucket        = "${var.student_id}-complaint-images"
  force_destroy = true
}

# ✅ Turn OFF all public access blocks
resource "aws_s3_bucket_public_access_block" "block_public_access" {
  bucket                  = aws_s3_bucket.complaint_images.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# ✅ Public Read/Write access via Bucket Policy
resource "aws_s3_bucket_policy" "public_rw" {
  bucket = aws_s3_bucket.complaint_images.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowPublicReadWrite"
        Effect    = "Allow"
        Principal = "*"
        Action    = [
          "s3:GetObject",
          "s3:PutObject"
        ]
        Resource  = "${aws_s3_bucket.complaint_images.arn}/*"
      }
    ]
  })
}

resource "aws_s3_bucket_notification" "image_upload_trigger" {
  bucket = aws_s3_bucket.complaint_images.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.image_moderation.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "complaints/"
  }

  depends_on = [aws_lambda_permission.allow_s3_trigger]
}
