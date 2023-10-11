from flask import request, jsonify
from models import db, User
from utils import APIException
from flask_jwt_extended import create_access_token, get_jwt_identity


def create_user_and_token(data):
    # data = request.get_json()
    
    # data = request.get_json(force=True)
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    if not email or not password:
        return jsonify({"error": "Se requieren tanto el email como la contraseña"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "El usuario ya existe"}), 400

    new_user = User(email=email, password=password, username = username)
    db.session.add(new_user)
    db.session.commit()

    
    access_token = create_access_token(identity=new_user.id)

    return jsonify({"message": "Usuario creado exitosamente", "token": access_token, "user_id": new_user.id}), 201

def login_user(data):
    # data = request.get_json(force=True)
    password = data.get('password')
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not email or user.password != password:
        raise APIException('Invalid email or password', status_code=401)
    access_token = create_access_token(identity= user.id)
    return jsonify({ "token": access_token, "email": user.email, "user_id": user.id, "username": user.username})