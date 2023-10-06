from flask import Blueprint, request, jsonify
from flask_cors import CORS 
from controllers import users_controllers

users =Blueprint('users', __name__)
CORS(users)

@users.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(force=True)
    result = users_controllers.create_user_and_token(data)
    return result
   
@users.route('/login', methods=['POST'])
def login():
   data = request.get_json(force=True)
   result = users_controllers.login_user(data)
   return result

