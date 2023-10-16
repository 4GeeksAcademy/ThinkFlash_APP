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
    decks= db.relationship('Deck', secondary='user_deck', lazy='subquery', backref= db.backref('users', lazy=True))
    academies = db.relationship('Sponsor', secondary='students', lazy='subquery', backref= db.backref('students', lazy=True))
    cards_score = db.relationship('Score_per_Card', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "avatar": self.avatar,
        
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
    # score = db.relationship('Score_per_Card', backref='deck', lazy=True)

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
    fake_concepts= db.relationship('Fake_concept', backref= db.backref('cards', lazy=True))
    fake_descriptions= db.relationship('Fake_description', backref= db.backref('cards', lazy=True))
    score = db.relationship('Score_per_Card', backref='card', lazy=True)

    def __repr__(self):
            return '<Deck %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "concept": self.concept,
            "area": self.area
        }
    

class Fake_concept(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    concept = db.Column(db.String(250), unique=False, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable = False)

    def __repr__(self):
            return '<Fake_concept %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "concept": self.concept,
            "card_id": self.card_id
        }

class Fake_description(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(250), unique=False, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable = False)

    def __repr__(self):
            return '<Fake_description %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "card_id": self.card_id
        }

class Score_per_Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable=False)
    # deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False)
    score = db.Column(db.Integer, unique=False, nullable=False)



