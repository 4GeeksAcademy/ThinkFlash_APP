from flask import Flask
from routes.users import users
from flask_migrate import Migrate
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.sqlite'
db.init_app(app)

with app.app_context():
    db.create_all()

migrate = Migrate(app, db)

app.register_blueprint(users)



@app.route('/')
def index():
    return "Hola Guapeton!"



if __name__ == '__main__':
    app.run(debug=True, port=6969)
