from flask import Flask
from routes.users import users
from flask_migrate import Migrate
from models import db
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.sqlite'
db.init_app(app)

with app.app_context():
    db.create_all()

app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET')  # Change this!
jwt = JWTManager(app)

migrate = Migrate(app, db)

app.register_blueprint(users)



@app.route('/')
def index():
    return "Hola Guapeton!"



if __name__ == '__main__':
    app.run(debug=True, port=6969)
