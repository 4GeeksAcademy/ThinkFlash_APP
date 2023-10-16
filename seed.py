from app import app, db  # Import your SQLAlchemy instance
from Back.src.models import User, Sponsor, Deck, Card, Fake_concept, Fake_description, Score_per_Card, students, card_deck
import random

def create_initial_data():
    # Create some users
    with app.app_context():
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

        # Generate 20 decks with non-unique areas
        decks = []
        for i in range(1, 21):
            area = f"Area-{i % 5 + 1}"
            deck = Deck(theme=f"Theme {i}", specialize=f"Specialize {i}", area=area, sponsor_id=sponsor1.id)
            decks.append(deck)
        
        # Add and commit the decks to obtain their IDs
        for deck in decks:
            db.session.add(deck)
        db.session.commit()

        # Generate 200 cards (10 for each of the 20 decks)
        cards = []
        cards_deck = []
        for deck in decks:
            for i in range(1, 11):
                description = f"Card {i} Description for Deck {deck.id}"
                concept = f"Card {i} Concept for Deck {deck.id}"
                area = deck.area
                card = Card(description=description, concept=concept, area=area)
                cards.append(card)
                # deck_id 
                # card_id
                # cards_deck = card_deck(card_id=card, deck_id=deck)
                
                db.session.add(card)
            
        db.session.commit()

        # Create some fake concepts and descriptions for the cards
        for card in cards:
            fake_concept = Fake_concept(concept=f"Fake Concept for {card.id}", card_id=card.id)
            fake_description = Fake_description(description=f"Fake Description for {card.id}", card_id=card.id)
            db.session.add(fake_concept)
            db.session.add(fake_description)
        
        db.session.commit()

        # Create some scores for the cards
        for i, card in enumerate(cards):
            user = [user1, user2][i % 2]
            score = Score_per_Card(user=user, card=card,  score=random.randint(70, 100))
            db.session.add(score)
        
        db.session.commit()

        # # Add students to the students table using SQLAlchemy Core
        # student1 = students.insert().values(student_id=user1.id, academy_id=sponsor1.id)
        # student2 = students.insert().values(student_id=user2.id, academy_id=sponsor2.id)
        
        # # Execute the insert statements
        # db.session.execute(student1)
        # db.session.execute(student2)
        db.session.commit()

if __name__ == "__main__":
    create_initial_data()
