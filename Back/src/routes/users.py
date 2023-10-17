from flask import Blueprint, request, jsonify
from flask_cors import CORS 
from ..controllers import users_controllers
from ..models import db, User

users =Blueprint('users', __name__)
CORS(users)

@users.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(force=True)
    result = users_controllers.create_user_and_send_email(data)
    return result
   
@users.route('/login', methods=['POST', 'GET'])
def login():
   data = request.get_json(force=True)
   result = users_controllers.login_user(data)
   return result

@users.route('/users', methods=['GET'])

def get_users():
    try:
        users = User.query.all()
        return jsonify({"message": f'All users accessed', "users": [user.serialize() for user in users]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@users.route('/users/confirm/<int:user_id>', methods=['PATCH'])
def confirm_user(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            user.confirmed = True
            db.session.commit()
            return jsonify({"message": "Usuario confirmado exitosamente"}), 200
        else:
            return jsonify({"error": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": f"Error al confirmar el usuario: {str(e)}"}), 500