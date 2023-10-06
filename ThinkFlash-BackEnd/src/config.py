import os

class Config:
    JWT_SECRET_KEY = os.getenv('JWT_SECRET') 