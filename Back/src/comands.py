from models import db, User, Card, Deck, Sponsor, Fake_concepts, Fake_descriptions, Score_per_Card
import random
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Deshabilita las notificaciones de cambios en la base de datos
db = SQLAlchemy(app)


def create_users():
    for i in range(20):
        id = i
        email = f"test_{i}@testemail.com"
        username = f"test_{i}"
        password = f"password_{i}"
    
        new_user = User(email=email, password=password, username=username)
        db.session.add(new_user)

    db.session.commit()


def create_cards():
    for i in range (10):
        area = f"TestArea_{i}" #Hace falta??
        for j in range(10):
            description = f"TestDesc_{i}-{j}"
            concept = f"TestConc_{i}-{j}"

            new_card = Card(description=description, concept=concept, area=area)
            db.session.add(new_card)
    
    db.session.commit()


def create_decks():
    for i in range (10):
        area = f"TestArea_{i}"
        for j in range(2):
            theme = f"TestTheme_{i}-{j}"
            specialize = f"TestSpecialize_{i}-{j}"

            new_deck = Deck(theme=theme, specialize=specialize, area=area)
            db.session.add(new_deck)
    
    db.session.commit()


def create_fake_concepts():
    for i in range (100):
        card_id = i
        for j in range (3):
            fake_concept = f"FakeConcept_{i}-{j}"

            new_fake_concept = Fake_concepts(card_id=card_id, fake_concept=fake_concept)
            db.session.add(new_fake_concept)
    
    db.session.commit()


def create_fake_descriptions():
    for i in range (100):
        card_id = i
        for j in range (3):
            fake_description = f"FakeDescription_{i}-{j}"

            new_fake_description = Fake_descriptions(card_id=card_id, fake_concept=fake_concept)
            db.session.add(new_fake_description)
    
    db.session.commit()


def create_scores_per_card():
    def random_int(min, max):
        random_num = random.randint(min, max)
        return random_num
    
    for i in range (300):
        card_id = i
        score = random_int(0, 4)

        new_scores_per_card = Score_per_Card(card_id=card_id, score=score)
        db.session.add(new_scores_per_card)

    db.session.commit()


def create_sponsors():
    for i in range(10):
        name = f"SponsorTest_{i}"
        logo = f"SponsorLogo_{i}"
    
        new_sponsor = Sponsor(name=name, logo=logo)
        db.session.add(new_sponsor)

    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        try:
            create_users()
            create_cards()
            create_decks()
            create_fake_concepts()
            create_fake_descriptions()
            create_scores_per_card()
            create_sponsors()
        except Exception as err:
            print(f"No se ha podido actualizar correctamente la base de datos: {err}")