from flask import Blueprint, request, jsonify

from controllers import users_controllers

users =Blueprint('users', __name__)

@users.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    result = users_controllers.create_user_and_token(data)
    return result
   
@users.route('/login')
def login():
   data = request.get_json()
   result = users_controllers.login_user(data)
   return result

