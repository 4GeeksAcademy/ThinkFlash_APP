from flask import Blueprint, request, jsonify
from ..models import db, User, Deck
from ..controllers import users_controllers

decks =Blueprint('decks', __name__)

@decks.route('/all_decks', methods=['GET'])
def get_all_decks():
    try:
        decks = Deck.query.all()
        return jsonify({"message": f'All decks accessed', "decks": [deck.serialize() for deck in decks]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@decks.route('/create_deck', methods=['POST'])
def create_deck():
    try:
        data = request.get_json()
        theme = data.get('theme')
        specialize = data.get('specialize')
        area = data.get('area')  # If you need an area field

        # Create a new deck instance
        new_deck = Deck(theme=theme, specialize=specialize, area=area)

        # Add the deck to the database
        db.session.add(new_deck)
        db.session.commit()

        return jsonify({"message": "Deck created successfully", "deck": new_deck.serialize()}), 201
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
    
    