from flask import Blueprint, request, jsonify
from ..models import db, User, Card, Deck, Score_per_Card
# from ..controllers import cards_controllers

cards =Blueprint('cards', __name__)

@cards.route('/cards', methods=['GET'])
def get_cards():
    try:
        cards = Card.query.all()
        return jsonify({"message": f'All cards accessed', "cards": [card.serialize() for card in cards]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
@cards.route('/users/<int:user_id>/decks/<int:deck_id>/cards', methods=['GET'])
def get_deck_cards(user_id, deck_id):
    try:
        user = User.query.get(user_id)
        deck = Deck.query.get(deck_id)

        if user is None:
            return jsonify({'error': f'User with ID {user_id} not found'}), 404

        if deck is None:
            return jsonify({'error': f'Deck with ID {deck_id} not found'}), 404

        if deck not in user.decks:
            return jsonify({'error': 'User does not have access to this deck'}), 403

        cards_with_score = []
        for card in deck.cards:
            score_per_card = Score_per_Card.query.filter_by(user_id=user_id, card_id=card.id).first()
            if score_per_card:
                cards_with_score.append({
                    'id': card.id,
                    'description': card.description,
                    'concept': card.concept,
                    'area': card.area,
                    'score': score_per_card.score
                })
            else:
                cards_with_score.append({
                    'id': card.id,
                    'description': card.description,
                    'concept': card.concept,
                    'area': card.area,
                    'score': 1
                })

        return jsonify({'cards': cards_with_score})

    except Exception as e:
        return jsonify({'error': str(e)}), 500