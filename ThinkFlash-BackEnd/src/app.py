from flask import Flask
from routes.users import users
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.register_blueprint(users)



@app.route('/')
def index():
    return "Hola Guapeton!"



if __name__ == '__main__':
    app.run(debug=True, port=6969)
