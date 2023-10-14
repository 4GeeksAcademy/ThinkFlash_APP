from app import app, db  # Import your SQLAlchemy instance
import random
from Back.src.models import User, Sponsor, Deck, Card, Fake_concepts, Fake_descriptions, Score_per_Card


def create_initial_data():

    #Creo estas listas porque al declararlos con bucles, no puedo acceder a ellos. Con estas listas lo arreglamos.
    users = [] 
    decks = []

    # Create some users
    with app.app_context():
        # Create some users
        try:
                for i in range(1, 11):
                        email = f"user{i}@example.com"
                        username = f"user{i}"
                        password = f"password{i}"
                        avatar = "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/36243334/36243334-1672676117894-fb369f088856b.jpg"
                        user = User(email=email, username=username, password=password, avatar=avatar)
                        
                        db.session.add(user)
                        users.append(user)
                        db.session.commit()
        except Exception as e:
                print("No se ha podido crear los usuarios", e)


        # Create some sponsors
        try:
            sponsor1 = Sponsor(name="Sponsor 1", logo="sponsor1.png", user_id=users[0].id)
            sponsor2 = Sponsor(name="Sponsor 2", logo="sponsor2.png", user_id=users[1].id)
            db.session.add(sponsor1)
            db.session.add(sponsor2)
            db.session.commit()
        except Exception as e:
                print("No se ha podido crear los sponsors", e)

        # Create some decks
        
        for i in range(3, 10):
            theme = f"Theme {i}"
            specialize = f"Specialize {i}",
            area = f"Area {random.randint(1, 5)}",
            deck = Deck(theme=theme, specialize=specialize, area=area)
        db.session.add(deck)
        db.session.commit()

        # Create some decks with sponsors
        deck1 = Deck(theme="Theme 1", specialize="Specialize 1",
                     area=f"Area {random.randint(1, 5)}", sponsor_id=sponsor1.id)
        deck2 = Deck(theme="Theme 2", specialize="Specialize 2",
                     area=f"Area {random.randint(1, 5)}", sponsor_id=sponsor2.id)

        # Add and commit the decks first to obtain their IDs
        db.session.add(deck1)
        db.session.add(deck2)
        db.session.commit()

        # Create some cards associated with the decks
        card1 = Card(description="Card 1 Description",
                     concept="Card 1 Concept", area="Area 1", deck_id=deck1.id)
        card2 = Card(description="Card 2 Description",
                     concept="Card 2 Concept", area="Area 2", deck_id=deck2.id)
        db.session.add(card1)
        db.session.add(card2)
        db.session.commit()

        # Create some fake concepts and descriptions for cards
        fake_concept1 = Fake_concepts(
            fake_concept="Fake Concept 1", card_id=card1.id)
        fake_concept2 = Fake_concepts(
            fake_concept="Fake Concept 2", card_id=card2.id)
        db.session.add(fake_concept1)
        db.session.add(fake_concept2)

        fake_description1 = Fake_descriptions(
            fake_description="Fake Description 1", card_id=card1.id)
        fake_description2 = Fake_descriptions(
            fake_description="Fake Description 2", card_id=card2.id)
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
