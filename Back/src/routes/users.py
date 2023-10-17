from flask import Blueprint, request, jsonify
from flask_cors import CORS 
from ..controllers import users_controllers
from ..models import db, User

users =Blueprint('users', __name__)
CORS(users)

@users.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(force=True)
    result = users_controllers.create_user_and_token(data)
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

@users.route('/user/<int:user_id>/decks', methods=['GET'])
def get_user_decks(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    user_decks = user.decks

    deck_list = []
    for deck in user_decks:
        deck_list.append({
            'id': deck.id,
            'theme': deck.theme,
            'specialize': deck.specialize,
            'area': deck.area,
            'sponsor_id': deck.sponsor_id
        })

    return jsonify({'decks': deck_list}), 200