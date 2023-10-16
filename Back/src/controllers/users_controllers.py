from flask import request, jsonify
from ..models import db, User
from ..utils import APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, get_jwt_identity


def create_user_and_token(data):
    # data = request.get_json()
    
    # data = request.get_json(force=True)
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    if not email or not password:
        return jsonify({"error": "Se requieren tanto el email como la contraseña"}), 400

    existing_user_by_username = User.query.filter_by(username=username).first() 
    existing_user_by_email = User.query.filter_by(email=email).first()
    if existing_user_by_email or existing_user_by_username:
        return jsonify({"error": "El usuario ya existe"}), 400

    new_user = User(email=email, password=password, username = username)
    db.session.add(new_user)
    db.session.commit()

    
    access_token = create_access_token(identity=new_user.id)

    return jsonify({"message": "Usuario creado exitosamente", "username": username,"token": access_token, "user_id": new_user.id}), 201

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    
    if user is None or user.password != password:
        return jsonify({"error": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({
        "token": access_token,
        "email": user.email,
        "user_id": user.id,
        "username": user.username
    })
