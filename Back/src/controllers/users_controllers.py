from flask import request, jsonify
from ..models import db, User
from ..utils import APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, get_jwt_identity
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from decouple import config
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
FRONT_URL = config('FRONT_URL')

def send_email(to_email, user_id, username):

    from_email= "think_flash@outlook.com"
    password = "thinkflash45"
    subject = "Welcome to ThinkFlash"
    body=  f"""
    Hola {username}, gracias por registrarse.😊 Por favor, confirme su email en este enlace:

    {FRONT_URL}/user/{user_id}.

    Atentamente el equipo ThinkFlash."""

    message = MIMEMultipart()
    message["From"] = from_email
    message["To"] = to_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP("smtp-mail.outlook.com", 587)
    server.starttls()
    server.login(from_email, password)

    server.sendmail(from_email, to_email, message.as_string())

    server.quit()

    

def create_user_and_send_email(data):
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    if not email or not password:
        return jsonify({"error": "Se requieren tanto el email como la contraseña"}), 400

    existing_user_by_username = User.query.filter_by(username=username).first() 
    existing_user_by_email = User.query.filter_by(email=email).first()
    if existing_user_by_email or existing_user_by_username:
        return jsonify({"error": "El usuario ya existe"}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(email=email, password=hashed_password, username = username)
    db.session.add(new_user)
    db.session.commit()

    send_email(email, new_user.id, username)

    
    access_token = create_access_token(identity=new_user.id)

    return jsonify({"message": "Usuario creado exitosamente", "username": username,"token": access_token, "user_id": new_user.id}), 201

def login_user(data):
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    
    if user is None or not bcrypt.check_password_hash(user.password, password) or not user.confirmed:
        return jsonify({"error": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({
        "token": access_token,
        "email": user.email,
        "user_id": user.id,
        "username": user.username
    })

def send_recovery_email(to_email, user_id, username):

    from_email= "think_flash@outlook.com"
    password = "thinkflash45"
    subject = "Recovery ThinkFlash Password"
    body=  f"""
    Hola {username}, puede cambiar su contraseña aquí.😊 Por favor, siga este enlace:

    {FRONT_URL}/recoveryPassword/{user_id}.

    Atentamente el equipo ThinkFlash."""
    message = MIMEMultipart()
    message["From"] = from_email
    message["To"] = to_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP("smtp-mail.outlook.com", 587)
    server.starttls()
    server.login(from_email, password)

    server.sendmail(from_email, to_email, message.as_string())

    server.quit()

def recovery_password(data):
    try:
        email = data.get('email')
        new_password = data.get('password')
        user = User.query.filter_by(email=email).first()
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        if user:
            user.password = hashed_password
            db.session.commit()
            return jsonify({"message": "Usuario confirmado exitosamente"}), 200
        else:
            return jsonify({"error": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": f"Error al confirmar el usuario: {str(e)}"}), 500

# def send_recovery_email_route(data):
#     try:
#         to_email = data.get('email')
#         print("email", email)
#         user = User.query.filter_by(email=to_email).first()
#         print("user", user)

#         if user:
#             user_id = user.id
#             username = user.username
#             send_recovery_email(to_email, user_id, username)
#             return jsonify({"message": "Email sent successfully"}), 200
#         else:
#             return jsonify({"error": "User not found"}), 404

#     except Exception as e:
#         return jsonify({"error": f"Error sending email: {str(e)}"}), 500