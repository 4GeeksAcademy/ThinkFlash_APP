from app import app, db
from Back.src.models import User, Sponsor, Deck, Card, Fake_concept, Fake_description, Score_per_Card, card_deck, user_deck, user_sponsor
import random
from flask_bcrypt import Bcrypt

def recreate_database():
    with app.app_context():
        db.drop_all()
        db.create_all()

def create_initial_data():
    recreate_database()

    with app.app_context():
        # Crea algunos usuarios
        bcrypt = Bcrypt()
        dummy_password = bcrypt.generate_password_hash("password123").decode('utf-8')

        users = [
            User(email="alice.jones@example.com", username="alicej", password=dummy_password, confirmed=True),
            User(email="bob.smith@datasciencelab.com", username="dataguru", password=dummy_password, confirmed=True),
            User(email="carol.white@mathworld.org", username="mathwiz", password=dummy_password, confirmed=True),
        ]
        db.session.add_all(users)
        db.session.commit()

        # Crea algunos patrocinadores
        sponsors = [
            Sponsor(name="CodeAcademy", logo="sponsor1.png", user_id=users[0].id),
            Sponsor(name="HistoryChannel", logo="sponsor1.png", user_id=users[1].id),
            Sponsor(name="BiologyHub", logo="sponsor1.png", user_id=users[2].id),
        ]
        db.session.add_all(sponsors)
        db.session.commit()

        # Define la estructura educativa
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

        # Crea mazos para cada tema dentro de cada especialización y área
        decks = []
        for area, specializations in educational_structure.items():
            for specialization, themes in specializations.items():
                for theme in themes:
                    sponsor = random.choice(sponsors)
                    deck = Deck(theme=theme, specialize=specialization, area=area, sponsor_id=sponsor.id)
                    decks.append(deck)

        # Agrega los mazos a la sesión
        db.session.add_all(decks)
        db.session.commit()

        # Genera relaciones usuarios-mazos
        user_decks = {}
        for _ in range(10):  # Ajusta el rango si deseas más o menos asociaciones
            user = random.choice(users)
            deck = random.choice(decks)
            
            user_deck_association = user_deck.insert().values(user_id=user.id, deck_id=deck.id)
            db.session.execute(user_deck_association)

            if user.id not in user_decks:
                user_decks[user.id] = []
            user_decks[user.id].append(deck)

        db.session.commit()

        deck_toshow = Deck(theme='Loops', specialize='Javascript', area='Coding', sponsor_id=1)
        db.session.add(deck_toshow)
        db.session.commit()
        # Genera 200 cartas (10 para cada uno de los 20 mazos)
        cards = []
        for deck in decks:
            for i in range(1, 11):  # Crea 10 cartas por mazo
                try:
                    description = f"Study {deck.theme}: Lesson {i}"
                    concept = f"{deck.theme} Concept {i}"
                    card = Card(description=description, concept=concept, area=deck.area)
                    cards.append(card)
                    db.session.add(card)
                    db.session.commit()
                except Exception as e:
                    print("No se ha podido crear las cards", e)

                # Asocia la carta con el mazo
                card_deck_association = card_deck.insert().values(card_id=card.id, deck_id=deck.id)
                db.session.execute(card_deck_association)

        db.session.commit()

        #Crear cards para deck_toshow
        cards_to_show = []
        card_toshow1 = Card(description='Iterates with a counter, ideal for known iteration counts.', concept='for Loop', area=deck_toshow.area)
        card_toshow2 = Card(description='Runs while a condition is true, used for unknown iteration counts.', concept='while Loop', area=deck_toshow.area)
        card_toshow3 = Card(description='Executes once, then repeats while true, ensuring at least one iteration.', concept='do-while Loop', area=deck_toshow.area)
        card_toshow4 = Card(description='Iterates over array elements, simplifying array looping.', concept='forEach', area=deck_toshow.area)
        
        db.session.add_all([card_toshow1, card_toshow2, card_toshow3, card_toshow4])
        db.session.commit()

                # Crea algunos conceptos y descripciones falsas para las cartas
        for card in cards:
            for i in range (1, 4):
                fake_concept = Fake_concept(concept=f"Fake Concept {i} for {card.id}", card_id=card.id)
                fake_description = Fake_description(description=f"Fake Description {i} for {card.id}", card_id=card.id)
                db.session.add(fake_concept)
                db.session.add(fake_description)
        db.session.commit()

        #card_toshow1
        fake_concept1_card1 = Fake_concept(concept=f"while Loop", card_id=card_toshow1.id)
        fake_description1_card1 = Fake_description(description=f"Runs while a condition is true, used for unknown iteration counts.", card_id=card_toshow1.id)
        fake_concept2_card1 = Fake_concept(concept=f"do-while Loop", card_id=card_toshow1.id)
        fake_description2_card1 = Fake_description(description=f"Executes once, then repeats while true, ensuring at least one iteration.", card_id=card_toshow1.id)
        fake_concept3_card1 = Fake_concept(concept=f"forEach", card_id=card_toshow1.id)
        fake_description3_card1 = Fake_description(description=f"Iterates over array elements, simplifying array looping.", card_id=card_toshow1.id)

        db.session.add_all([fake_concept1_card1, fake_description1_card1, fake_concept2_card1, fake_description2_card1, fake_concept3_card1, fake_description3_card1])
        db.session.commit()

        #card_show2
        fake_concept1_card2 = Fake_concept(concept=f"for Loop", card_id=card_toshow2.id)
        fake_description1_card2 = Fake_description(description=f"Iterates with a counter, ideal for known iteration counts.", card_id=card_toshow2.id)
        fake_concept2_card2 = Fake_concept(concept=f"do-while Loop", card_id=card_toshow2.id)
        fake_description2_card2 = Fake_description(description=f"Executes once, then repeats while true, ensuring at least one iteration.", card_id=card_toshow2.id)
        fake_concept3_card2 = Fake_concept(concept=f"forEach", card_id=card_toshow2.id)
        fake_description3_card2 = Fake_description(description=f"Iterates over array elements, simplifying array looping.", card_id=card_toshow2.id)

        db.session.add_all([fake_concept1_card2, fake_description1_card2, fake_concept2_card2, fake_description2_card2, fake_concept3_card2, fake_description3_card2])
        db.session.commit()

        #card_show3
        fake_concept1_card3 = Fake_concept(concept=f"for Loop", card_id=card_toshow3.id)
        fake_description1_card3 = Fake_description(description=f"Iterates with a counter, ideal for known iteration counts.", card_id=card_toshow3.id)
        fake_concept2_card3 = Fake_concept(concept=f"while Loop", card_id=card_toshow3.id)
        fake_description2_card3 = Fake_description(description=f"Runs while a condition is true, used for unknown iteration counts.", card_id=card_toshow3.id)
        fake_concept3_card3 = Fake_concept(concept=f"forEach", card_id=card_toshow3.id)
        fake_description3_card3 = Fake_description(description=f"Iterates over array elements, simplifying array looping.", card_id=card_toshow3.id)

        db.session.add_all([fake_concept1_card3, fake_description1_card3, fake_concept2_card3, fake_description2_card3, fake_concept3_card3, fake_description3_card3])
        db.session.commit()

        #card_show4
        fake_concept1_card4 = Fake_concept(concept=f"for Loop", card_id=card_toshow4.id)
        fake_description1_card4 = Fake_description(description=f"Iterates with a counter, ideal for known iteration counts.", card_id=card_toshow4.id)
        fake_concept2_card4 = Fake_concept(concept=f"while Loop", card_id=card_toshow4.id)
        fake_description2_card4 = Fake_description(description=f"Runs while a condition is true, used for unknown iteration counts.", card_id=card_toshow4.id)
        fake_concept3_card4 = Fake_concept(concept=f"do-while Loop", card_id=card_toshow4.id)
        fake_description3_card4 = Fake_description(description=f"Executes once, then repeats while true, ensuring at least one iteration.", card_id=card_toshow4.id)
        
        db.session.add_all([fake_concept1_card4, fake_description1_card4, fake_concept2_card4, fake_description2_card4, fake_concept3_card4, fake_description3_card4])
        db.session.commit()

        card_deck_association1 = card_deck.insert().values(card_id=card_toshow1.id, deck_id=deck_toshow.id)
        card_deck_association2 = card_deck.insert().values(card_id=card_toshow2.id, deck_id=deck_toshow.id)
        card_deck_association3 = card_deck.insert().values(card_id=card_toshow3.id, deck_id=deck_toshow.id)
        card_deck_association4 = card_deck.insert().values(card_id=card_toshow4.id, deck_id=deck_toshow.id)

        db.session.execute(card_deck_association1)
        db.session.execute(card_deck_association2)
        db.session.execute(card_deck_association3)
        db.session.execute(card_deck_association4)
        db.session.commit()
        #card_toshow2
        # Crea algunas puntuaciones para las cartas
        # for user in users:
        #     for deck in user_decks[user.id]:
        #         deck_cards = Card.query.join(card_deck).filter(card_deck.c.deck_id == deck.id).all()
        #         for card in deck_cards:
        #             score = Score_per_Card(user_id=user.id, card_id=card.id, score=random.randint(1, 4))
        #             db.session.add(score)

        # db.session.commit()

        for user in users:
            for deck in user_decks[user.id]:
                deck_cards = [card.id for card in cards if deck.id in [deck.id for deck in card.decks]]
                for card_id in deck_cards:
                    score = Score_per_Card(user_id=user.id, card_id=card_id, score=random.randint(1, 4))
                    db.session.add(score)
        db.session.commit()


        for user in users:
            for deck in user_decks[user.id]:
                # Asocia usuarios con patrocinadores
                user_sponsor_association = user_sponsor.insert().values(user_id=user.id, sponsor_id=deck.sponsor_id)
                db.session.execute(user_sponsor_association)

                # Asocia usuarios con mazos
                user_deck_association = user_deck.insert().values(user_id=user.id, deck_id=deck.id)
                db.session.execute(user_deck_association)

                deck_cards = Card.query.join(card_deck).filter(card_deck.c.deck_id == deck.id).all()
                for card in deck_cards:
                    # Asocia cartas con mazos
                    card_deck_association = card_deck.insert().values(card_id=card.id, deck_id=deck.id)
                    db.session.execute(card_deck_association)

                    # Crea puntuaciones para las cartas
                    score = Score_per_Card(user_id=user.id, card_id=card.id, score=random.randint(1, 4))
                    db.session.add(score)
        db.session.commit()

if __name__ == "__main__":
    create_initial_data()
