from models import db, User
import random
import string

def create_random_string(length=10):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def createUsers():
    with app.app_context():
        db.create_all()
        
        for _ in range(10):
            username = create_random_string()
            password = create_random_string()
            
            new_user = User(username=username, password=password)
            db.session.add(new_user)
        
        db.session.commit()

if __name__ == '__main__':
    createUsers(num_users)
    print(f'{num_users} usuarios han sido creados en la base de datos.')