from app import app, db  # Import your SQLAlchemy instance
from Back.src.models import User, Sponsor, Deck, Card, Fake_concepts, Fake_descriptions, Score_per_Card

def create_initial_data():
    # Create some users
    with app.app_context():
        # Create some users
        user1 = User(email="user1@example.com", username="user1", password="password1")
        user2 = User(email="user2@example.com", username="user2", password="password2")
        user3 = User(email="user3@example.com", username="user3", password="password3")
        
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.commit()

        # Create some sponsors
        sponsor1 = Sponsor(name="Sponsor 1", logo="sponsor1.png", user_id=user1.id)
        sponsor2 = Sponsor(name="Sponsor 2", logo="sponsor2.png", user_id=user2.id)
        db.session.add(sponsor1)
        db.session.add(sponsor2)
        db.session.commit()

        # Create some decks
        deck1 = Deck(theme="Theme 1", specialize="Specialize 1", area="Area 1", sponsor_id=sponsor1.id)
        deck2 = Deck(theme="Theme 2", specialize="Specialize 2", area="Area 2", sponsor_id=sponsor2.id)

        # Add and commit the decks first to obtain their IDs
        db.session.add(deck1)
        db.session.add(deck2)
        db.session.commit()

        # Create some cards associated with the decks
        card1 = Card(description="Card 1 Description", concept="Card 1 Concept", area="Area 1", deck_id=deck1.id)
        card2 = Card(description="Card 2 Description", concept="Card 2 Concept", area="Area 2", deck_id=deck2.id)
        db.session.add(card1)
        db.session.add(card2)
        db.session.commit()

        # Create some fake concepts and descriptions for cards
        fake_concept1 = Fake_concepts(fake_concept="Fake Concept 1", card_id=card1.id)
        fake_concept2 = Fake_concepts(fake_concept="Fake Concept 2", card_id=card2.id)
        db.session.add(fake_concept1)
        db.session.add(fake_concept2)
        
        fake_description1 = Fake_descriptions(fake_description="Fake Description 1", card_id=card1.id)
        fake_description2 = Fake_descriptions(fake_description="Fake Description 2", card_id=card2.id)
        db.session.add(fake_description1)
        db.session.add(fake_description2)

        # Create some scores for cards
        score1 = Score_per_Card(user=user1, card=card1, deck=deck1, score=95)
        score2 = Score_per_Card(user=user2, card=card1, deck=deck1, score=88)
        score3 = Score_per_Card(user=user1, card=card2, deck=deck2, score=75)
        db.session.add(score1)
        db.session.add(score2)
        db.session.add(score3)

        # Commit all changes in a single call
        db.session.commit()

if __name__ == "__main__":
    create_initial_data()