from app import app, db  # Import your SQLAlchemy instance
from Back.src.models import User, Sponsor, Deck, Card, Fake_concept, Fake_description, Score_per_Card, card_deck, user_deck
import random

def create_initial_data():

    with app.app_context():

        # Create some users
        users = []
        user1 = User(email="user1@example.com", username="user1", password="password1")
        user2 = User(email="user2@example.com", username="user2", password="password2")
        user3 = User(email="user3@example.com", username="user3", password="password3")
        db.session.add_all([user1, user2, user3])
        users.extend([user1, user2, user3])
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
            try: 
                area = f"Area-{i % 5 + 1}"
                deck = Deck(theme=f"Theme {i}", specialize=f"Specialize {i}", area=area, sponsor_id=sponsor1.id)
                decks.append(deck)
                db.session.add(deck)
                db.session.commit()
            except Exception as e:
                print("No se han podido crear las decks")
       
        # Generate raltionships users_cards 
        user_decks = []
        for i in range(1, 11):
            user = random.choice(users)
            deck = random.choice(decks)
            user_deck_association = user_deck.insert().values(user_id=user.id, deck_id=deck.id)
            db.session.execute(user_deck_association)
            user_decks.append(deck.id)

        db.session.commit()


        # Generate 200 cards (10 for each of the 20 decks)
        cards = []
        active_cards=[]
        for deck in decks:
            for i in range(1, 11):
                try:
                    description = f"Card {i} Description for Deck {deck.id}"
                    concept = f"Card {i} Concept for Deck {deck.id}"
                    area = deck.area
                    card = Card(description=description, concept=concept, area=area)
                    
                    cards.append(card)
                    db.session.add(card)
                    db.session.commit()
                except Exception as e:
                    print("No se ha podido crear las cards", e)
                
                # Crear la relación entre carta y deck.
                card_deck_association = card_deck.insert().values(card_id=card.id, deck_id=deck.id)
                active_cards.append(card.id)
                
                db.session.connection().execute(card_deck_association)
            print(active_cards)
        
        
        # Create some fake concepts and descriptions for the cards
        for card in cards:
            fake_concept = Fake_concept(concept=f"Fake Concept for {card.id}", card_id=card.id)
            fake_description = Fake_description(description=f"Fake Description for {card.id}", card_id=card.id)
            db.session.add(fake_concept)
            db.session.add(fake_description)
        db.session.commit()

       
        # Create some scores for the cards

        # for deck_id in user_decks:
        #     for card in cards:
        #         if card.deck == deck_id
        #     score = Score_per_Card(user=user, card=card,  score=random.randint(1,4))
        #     db.session.add(score)
        # db.session.commit()




        # # Add students to the students table using SQLAlchemy Core
        # student1 = students.insert().values(student_id=user1.id, academy_id=sponsor1.id)
        # student2 = students.insert().values(student_id=user2.id, academy_id=sponsor2.id)
        # # Execute the insert statements
        # db.session.execute(student1)
        # db.session.execute(student2)
        db.session.commit()

        

if __name__ == "__main__":
    create_initial_data()