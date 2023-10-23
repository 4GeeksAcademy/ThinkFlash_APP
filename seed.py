from app import app, db
from Back.src.models import User, Sponsor, Deck, Card, Fake_concept, Fake_description, Score_per_Card, card_deck, user_deck
import random
from flask_bcrypt import Bcrypt 

def create_initial_data():
    with app.app_context():
        # Crea algunos usuarios
        bcrypt = Bcrypt()
        dummy_password = bcrypt.generate_password_hash("test").decode('utf-8')
        users = []
        user1 = User(email="user1@example.com", username="user1", password=dummy_password, confirmed=True)
        user2 = User(email="user2@example.com", username="user2", password=dummy_password, confirmed=True)
        user3 = User(email="user3@example.com", username="user3", password=dummy_password, confirmed=True)
        db.session.add_all([user1, user2, user3])
        users.extend([user1, user2, user3])
        db.session.commit()

        # Crea algunos patrocinadores
        sponsor1 = Sponsor(name="Sponsor 1", logo="sponsor1.png", user_id=user1.id)
        sponsor2 = Sponsor(name="Sponsor 2", logo="sponsor2.png", user_id=user2.id)
        db.session.add(sponsor1)
        db.session.add(sponsor2)
        db.session.commit()

        # Genera 20 mazos con áreas no únicas
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

        # Genera relaciones usuarios-mazos
        user_decks = {}
        for _ in range(1, 11):
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
            for i in range(1, 11):
                try:
                    description = f"Card Description {i} for Deck {deck.id}"
                    concept = f"Card Concept {i} for Deck {deck.id}"
                    area = deck.area
                    card = Card(description=description, concept=concept, area=area)
                    cards.append(card)
                    db.session.add(card)
                    db.session.commit()
                except Exception as e:
                    print("No se ha podido crear las cards", e)

                card_deck_association = card_deck.insert().values(card_id=card.id, deck_id=deck.id)
                db.session.execute(card_deck_association)

        db.session.commit()

        # Crea algunos conceptos y descripciones falsas para las cartas
        for card in cards:
            for i in range (1, 4):
                fake_concept = Fake_concept(concept=f"Fake Concept {i} for {card.id}", card_id=card.id)
                fake_description = Fake_description(description=f"Fake Description {i} for {card.id}", card_id=card.id)
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