from flask import Blueprint, request, jsonify
from models import db, User, Deck
from controllers import users_controllers

decks =Blueprint('decks', __name__)

@decks.route('/all_decks', methods=['GET'])
def get_all_decks():
    try:
        decks = Deck.query.all()
        return jsonify({"message": f'All decks accessed', "decks": [deck.serialize() for deck in decks]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500