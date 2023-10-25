from flask import Blueprint
from Back.src.routes.users import users
from Back.src.routes.decks import decks
from Back.src.routes.cards import cards
from Back.src.routes.sponsors import sponsors

api = Blueprint('api', __name__)
api.register_blueprint(users)
api.register_blueprint(decks)
api.register_blueprint(cards)
api.register_blueprint(sponsors)

