from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    avatar = db.Column(db.String(250), nullable = True)
    sponsor_id = db.Integer(db.String(250), db.ForeignKey('Sponsor.id'), nullable = True)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "avatar": self.avatar,
            "sponsor_id": self.sponsor_id  #si pongo sponsor_id.name obtendria esta info?
            # do not serialize the password, its a security breach
        }
    
class Deck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    theme = db.Column(db.String(120), unique=True, nullable=False)
    specialize = db.Column(db.String(120), unique=True, nullable=False)
    area = db.Column(db.String(120), unique=True, nullable=False)
    sponsor_id = db.Column(db.Integer(250), db.ForeignKey('Sponsor.id'), nullable = True)

    def __repr__(self):
            return '<Deck %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "theme": self.theme,
            "specialize": self.specialize,
            "area": self.area,
            "sponsor_id": self.sponsor_id
        }

class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(250), unique=True, nullable=False)
    concept = db.Column(db.String(250), unique=True, nullable=False)
    area = db.Column(db.String(120), unique=True, nullable=False)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable = False)

    def __repr__(self):
            return '<Deck %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "concept": self.concept,
            "area": self.area,
            "deck_id": self.deck_id
        }
    
class Fake_content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fake_description = db.Column(db.String(250), unique=False, nullable=False)
    fake_concept = db.Column(db.String(250), unique=False, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable = False)

    def __repr__(self):
            return '<Deck %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "fake_description": self.fake_description,
            "fake_concept": self.fake_concept,
            "card_id": self.card_id
        }


