from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


user_sponsor = db.Table('user_sponsor',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('sponsor_id', db.Integer, db.ForeignKey('sponsor.id'))
)
students = db.Table('students',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('student_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('academy_id', db.Integer, db.ForeignKey('sponsor.id'))
)


user_deck = db.Table('user_deck',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('deck_id', db.Integer, db.ForeignKey('deck.id'))
)

card_deck = db.Table('card_deck',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('card_id', db.Integer, db.ForeignKey('card.id')),
    db.Column('deck_id', db.Integer, db.ForeignKey('deck.id'))
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    avatar = db.Column(db.String(500), nullable = True)
    confirmed = db.Column(db.Boolean, default=False)
    user_decks= db.relationship('Deck', secondary='user_deck', lazy='subquery', backref= db.backref('users', lazy=True))
    user_sponsor= db.relationship('Sponsor', secondary='students', lazy='subquery', backref= db.backref('users', lazy=True))
    cards_score = db.relationship('Score_per_Card', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "avatar": self.avatar,
            "confirmed": self.confirmed 
        }
    
class Sponsor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)
    logo = db.Column(db.String(250), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False,)

    def __repr__(self):
            return '<Sponsor %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "logo": self.logo,
        }


class Deck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    theme = db.Column(db.String(120), unique=False, nullable=False)
    specialize = db.Column(db.String(120), unique=False, nullable=False)
    area = db.Column(db.String(120), unique=False, nullable=True)
    sponsor_id = db.Column(db.Integer, db.ForeignKey('sponsor.id'), nullable = True)
    cards= db.relationship('Card', secondary='card_deck', lazy='subquery', backref= db.backref('decks', lazy=True))
    deck_score = db.relationship('Score_per_Card', backref='deck', lazy=True)

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
    description = db.Column(db.String(250), unique=False, nullable=False)
    concept = db.Column(db.String(250), unique=False, nullable=False)
    area = db.Column(db.String(120), unique=False, nullable=False)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable = False)
    fake_concepts= db.relationship('Fake_concepts', backref= db.backref('cards', lazy=True))
    fake_descriptions= db.relationship('Fake_descriptions', backref= db.backref('cards', lazy=True))
    users_score = db.relationship('Score_per_Card', backref='card', lazy=True)

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
    

class Fake_concepts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fake_concept = db.Column(db.String(250), unique=False, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable = False)

    def __repr__(self):
            return '<Fake_concepts %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "fake_concept": self.fake_concept,
            "card_id": self.card_id
        }

class Fake_descriptions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fake_description = db.Column(db.String(250), unique=False, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable = False)

    def __repr__(self):
            return '<Deck %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "fake_description": self.fake_description,
            "card_id": self.card_id
        }

class Score_per_Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable=False)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False)
    score = db.Column(db.Integer, unique=False, nullable=False)



