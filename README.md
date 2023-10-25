# ThinkFlash_APP

To start the Frontend development, you must have npm installed (```$ npm install```) and run: ```$ npm run dev``` (All of this should be done from the corresponding folder: ThinkFlash-FrontEnd).

Also, make sure to install the ReactRouter library: ```$ npm install react-router-dom```

To start the Backend, follow these steps:

1. Install/update all packages specified in Pipfile: ```$ pipenv install```
2. Launch the backend: ```$ pipenv run start``` (Check Pipfile [scripts] for details).
4. To create the admin and manage the database:
    1. Install the VSCode extension: "Database Client"
    2. Open the extension, choose SQLite, and set the SQLite DB Path to: /workspaces/ThinkFlash_APP/ThinkFlash-BackEnd/src/instance/project.sqlite
7. Initialize the database: ```$ pipenv run flask db init``` (This creates the 'instance' folder inside 'src', where the 'project.sqlite' database file and 'migrations' folder are located).
8. Run migrations: ```$ pipenv run migrate``` (see Pipfile [scripts] for more details, you can add a message as a comment if needed, e.g., ```$ pipenv run flask migrate -m "message"```).
9. Apply migrations: ```$ pipenv run upgrade``` (This makes the modifications effective, see Pipfile [scripts] for more details).
10. To reset the database and to load the testing data: ```$ pipenv run reset_db```

VARIABLES DE ENTORNO: 
    FRONT_URL
    URL=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    EMAIL=
    PASSWORD=

PARA EL DEPLOY: pipenv install && pipenv run start && cd Front && npm install && npm run dev
