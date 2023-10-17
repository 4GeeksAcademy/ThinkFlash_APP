import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from Back.src.routes.users import users
from Back.src.routes.decks import decks
from Back.src.routes.cards import cards
from Back.src.routes.sponsors import sponsors
from flask_migrate import Migrate
from Back.src.models import db, User, Deck, Card
from flask_cors import CORS 
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv() 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.sqlite'

db.init_app(app)
with app.app_context():
    db.create_all()

# app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET')
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS']
MIGRATE = Migrate(app, db, compare_type=True)

CORS(app)

app.register_blueprint(users)
app.register_blueprint(decks)
app.register_blueprint(cards)
app.register_blueprint(sponsors)



@app.route('/')
def index():
    return "Hola Guapeton!"

if __name__ == '__main__':
    app.run(debug=True, port=6969)
