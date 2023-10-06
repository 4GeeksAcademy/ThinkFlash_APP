# ThinkFlash_APP

To start the Frontend development, you must have npm installed (```$ npm install```) and run: ```$ npm run dev``` (All of this should be done from the corresponding folder: ThinkFlash-FrontEnd).

Also, make sure to install the ReactRouter library: ```$ npm install react-router-dom```

To start the Backend, follow these steps:

1. Install/update all packages specified in Pipfile: ```$ pipenv install```
2. Install Flask: ```$ pipenv install flask```
3. Launch the backend: ```$ pipenv run start``` (Check Pipfile [scripts] for details).
4. To create the admin and manage the database:
    1. Install the VSCode extension: "Database Client"
    2. Open the extension, choose SQLite, and set the SQLite DB Path to: /workspaces/ThinkFlash_APP/ThinkFlash-BackEnd/src/instance/project.sqlite
5. Install Flask-Migrate: ```$ pipenv install flask-migrate```
6. Navigate to the folder containing **app.py** : 
   ```$ cd /workspaces/ThinkFlash_APP/ThinkFlash-BackEnd/src```
7. Initialize the database: ```$ pipenv run flask db init``` (This creates the 'instance' folder inside 'src', where the 'project.sqlite' database file and 'migrations' folder are located).
8. Run migrations: ```$ pipenv run migrate``` (see Pipfile [scripts] for more details, you can add a message as a comment if needed, e.g., ```$ pipenv run flask migrate -m "message"```).
9. Apply migrations: ```$ pipenv run upgrade``` (This makes the modifications effective, see Pipfile [scripts] for more details).

