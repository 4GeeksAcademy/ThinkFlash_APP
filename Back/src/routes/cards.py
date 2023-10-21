from flask import Blueprint, request, jsonify
from ..models import db, User, Card, Deck, Score_per_Card, Fake_concept, Fake_description
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
            fake_descriptions = [fd.description for fd in Fake_description.query.filter_by(card_id=card.id).all()]
            fake_concepts = [fc.concept for fc in Fake_concept.query.filter_by(card_id=card.id).all()]
            if score_per_card:
                cards_with_score.append({
                    'id': card.id,
                    'description': card.description,
                    'concept': card.concept,
                    'area': card.area,
                    'fake_descriptions': fake_descriptions,
                    'fake_concepts': fake_concepts,
                    'score': score_per_card.score
                })
            else:
                try:
                    score = Score_per_Card(user_id=user_id, card_id=card.id, score=1)
                    db.session.add(score)
                    db.session.commit()
                except Exception as e:
                    print("No se ha podido crear score per card nueva")

                cards_with_score.append({
                    'id': card.id,
                    'description': card.description,
                    'concept': card.concept,
                    'area': card.area,
                    'fake_descriptions': fake_descriptions,
                    'fake_concepts': fake_concepts,
                    'score': score.score
                })

        return jsonify({'cards': cards_with_score})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@cards.route('/users/<int:user_id>/decks/<int:deck_id>/card_score/<int:card_id>', methods=['PATCH'])
def change_card_score(user_id, deck_id, card_id):
    try:
        operation = request.json.get('operation')
        score_per_card = Score_per_Card.query.filter_by(user_id=user_id, card_id=card_id).first()

        if score_per_card is None:
            return jsonify({'error': f'Score for User ID {user_id} and Card ID {card_id} not found'}), 404

        if operation == 'sum':
            score_per_card.score = min(4, score_per_card.score + 1)
        elif operation == 'subs':
            score_per_card.score = max(1, score_per_card.score - 1)

        db.session.commit()

        return jsonify({'message': f'Score for Card ID {card_id} updated successfully, your score are {score_per_card.score}'})

    except Exception as e:
        return jsonify({"error": f"Error al cambiar el score: {str(e)}"}), 500

@cards.route('/users/<int:user_id>/decks/<int:deck_id>/card_score/reset', methods=['PATCH'])
def reset_card_score(user_id, deck_id):
    try:
        user = User.query.get(user_id)
        deck = Deck.query.get(deck_id)

        if user is None:
            return jsonify({'error': f'User with ID {user_id} not found'}), 404

        if deck is None:
            return jsonify({'error': f'Deck with ID {deck_id} not found'}), 404

        if deck not in user.decks:
            return jsonify({'error': 'User does not have access to this deck'}), 403
        
        card_ids = [card.id for card in deck.cards]
        for card_id in card_ids:
            score_per_card = Score_per_Card.query.filter_by(user_id=user_id, card_id=card_id).first()
            if score_per_card is not None:
                score_per_card.score = 1

        db.session.commit()

        return jsonify({'message': f'Scores for cards in Deck ID {deck_id} reset to 1'})

    except Exception as e:
        return jsonify({"error": f"Error resetting scores: {str(e)}"}), 500
