from flask import Blueprint, request, jsonify
from ..models import db, User, Card
# from ..controllers import cards_controllers

cards =Blueprint('cards', __name__)

@cards.route('/cards', methods=['GET'])
def get_cards():
    try:
        cards = Card.query.all()
        return jsonify({"message": f'All cards accessed', "cards": [card.serialize() for card in cards]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
