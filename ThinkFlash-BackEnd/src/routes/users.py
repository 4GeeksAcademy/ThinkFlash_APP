from flask import Blueprint, request, jsonify
from flask_cors import CORS 
from controllers import users_controllers

users =Blueprint('users', __name__)
CORS(users)

@users.route('/signup', methods=['POST', 'GET'])
def signin():
    if request.method == 'POST':
        data = request.get_json()
        result = users_controllers.create_user_and_token(data)
        return result
    elif request.method == 'GET':
        return "Hola desde la página de registro"
   
@users.route('/login')
def login():
   data = request.get_json()
   result = users_controllers.login_user(data)
   return result