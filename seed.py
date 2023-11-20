from app import app, db
from Back.src.models import User, Sponsor, Deck, Card, Fake_concept, Fake_description, Score_per_Card, card_deck, user_deck
import random
from flask_bcrypt import Bcrypt 

def create_initial_data():
    with app.app_context():
        # Crea algunos usuarios
        bcrypt = Bcrypt()
        dummy_password = bcrypt.generate_password_hash("password123").decode('utf-8')

        users = [
                    User(email="alice.jones@example.com", username="alicej", password=dummy_password, confirmed=True),
                    User(email="bob.smith@datasciencelab.com", username="dataguru", password=dummy_password, confirmed=True),
                    User(email="carol.white@mathworld.org", username="mathwiz", password=dummy_password, confirmed=True),
                ]
        db.session.add(users)
        db.session.commit()

        # Crea algunos patrocinadores
        sponsors = [
            Sponsor(name="CodeAcademy", logo="sponsor1.png", user_id=users[0].id),
            Sponsor(name="HistoryChannel", logo="sponsor1.png", user_id=users[1].id),
            Sponsor(name="BiologyHub", logo="sponsor1.png", user_id=users[2].id),
        ]
        db.session.add(sponsors)
        db.session.commit()

       # Define the areas, specializations, and themes
        educational_structure = {
            "Science": {
                "Biology": ["Genetics", "Ecology", "Microbiology"],
                "Physics": ["Quantum Mechanics", "Relativity", "Thermodynamics"],
                "Chemistry": ["Organic Chemistry", "Physical Chemistry", "Analytical Chemistry"],
            },
            "Humanities": {
                "History": ["Ancient Civilizations", "Medieval Europe", "Modern History"],
                "Philosophy": ["Ethics", "Metaphysics", "Political Philosophy"],
                "Literature": ["American Literature", "World Literature", "Literary Criticism"],
            },
            "Technology": {
                "Computer Science": ["Algorithms", "Machine Learning", "Computer Networks"],
                "Data Science": ["Data Analysis", "Statistical Modeling", "Big Data Technologies"],
                "Cybersecurity": ["Network Security", "Cryptography", "Ethical Hacking"],
            }
        }

        # Create decks for each theme within each specialization and area
        decks = []
        for area, specializations in educational_structure.items():
            for specialization, themes in specializations.items():
                for theme in themes:
                    decks.append(Deck(theme=theme, specialize=specialization, area=area, sponsor_id=sponsors[0].id))

        # Add decks to the session
        db.session.bulk_save_objects(decks)
        db.session.commit()

        # Genera relaciones usuarios-mazos
        user_decks = {}
        for _ in range(10):  # Adjust the range if you want more or fewer associations
            user = random.choice(users)
            deck = random.choice(decks)
            user_deck_association = user_deck.insert().values(user_id=user.id, deck_id=deck.id)
            db.session.execute(user_deck_association)

            if user.id not in user_decks:
                user_decks[user.id] = []
            user_decks[user.id].append(deck)

        db.session.commit()

        # Genera 200 cartas (10 para cada uno de los 20 mazos)
        cards = []
        for deck in decks:
            for i in range(1, 11):  # Create 10 cards per deck
                description = f"Study {deck.theme}: Lesson {i}"
                concept = f"{deck.theme} Concept {i}"
                card = Card(description=description, concept=concept, area=deck.area)
                cards.append(card)
                db.session.add(card)

                # Associate card with the deck
                card_deck_association = card_deck.insert().values(card_id=card.id, deck_id=deck.id)
                db.session.execute(card_deck_association)

            db.session.commit()

        # Crea algunos conceptos y descripciones falsas para las cartas
        for card in cards:
            for i in range(1, 4):
                fake_concept = Fake_concept(concept=f"Common Misunderstanding {i} in {card.concept}", card_id=card.id)
                fake_description = Fake_description(description=f"Popular but incorrect view about {card.description}", card_id=card.id)
                db.session.add(fake_concept)
                db.session.add(fake_description)
        db.session.commit()

        # Crea algunas puntuaciones para las cartas
        for user in users:
            for deck in user_decks[user.id]:
                deck_cards = [card.id for card in cards if deck.id in [deck.id for deck in card.decks]]
                for card_id in deck_cards:
                    score = Score_per_Card(user_id=user.id, card_id=card_id, score=random.randint(1, 4))
                    db.session.add(score)
        db.session.commit()

if __name__ == "__main__":
    create_initial_data()