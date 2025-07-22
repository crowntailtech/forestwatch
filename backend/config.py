import os

class Config:
    # Replace with your actual RDS endpoint
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:QZZLJlcdpp871(@database-2.cax0essmgh0i.us-east-1.rds.amazonaws.com/forestwatch'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY', '456ytfvgy6edfgt4erthggr456')

    # S3 Config (update these as well)
    S3_BUCKET = '11258998-complaint-images'
    S3_ACCESS_KEY = os.environ.get('AWS_ACCESS_KEY')
    S3_SECRET_KEY = os.environ.get('AWS_SECRET_KEY')
    S3_REGION = 'us-east-1'

