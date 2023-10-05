from flask import Flask
from routes.users import users
from flask_migrate import Migrate
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.sqlite'

with app.app_context():
    db.create_all()

app.config['SQLALCHEMY_TRACK_MODIFICATIONS']
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

app.register_blueprint(users)



@app.route('/')
def index():
    return "Hola Guapeton!"



if __name__ == '__main__':
    app.run(debug=True, port=6969)
