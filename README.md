# ThinkFlash_APP

Para iniciar la parte del Front en desarrollo, debes tener instalado npm ($npm install) y lanzar : $npm run dev (Todo esto desde la carpeta correspondiente: ThinkFlash-FrontEnd).

· También hay que tener instalado la librería de ReactRouter -> 
$ npm install react-router-dom localforage match-sorter sort-by

Para iniciar la parte del Back, debes  lanzar:
· $ pipenv install (para actualizar todos los paquetes del Pipfile)
· $ pipenv install flask
. $ pipenv run start (para lanzar el backend, ver Pipfile scripts)
. Para crear el admin y gestionar la base:
    .Instalamos VSCODE extension: Database Client
    .Abrir la extension, elegir SQLite y en SQLite DB Path indicar: /workspaces/ThinkFlash_APP/ThinkFlash-BackEnd/src/instance/project.sqlite
. $ pipenv install flask-migrate
. $ cd /workspaces/ThinkFlash_APP/ThinkFlash-BackEnd/src (ir a la carpeta donde este contenido app.py)
. $ pipenv run flask db init (crea la carpeta instance dentro de src donde esta el archivo con la base de datos project.sqlite y la carpeta migrations)
. $ pipenv run migrate (para migrar, ver mas en Pipfile [scripts], tambien es posible $ pipenv run flask migrate -m "message, si es necesario añadir un comentario)
. $ pipenv run upgrade (para hacer las modificaciones efectivas, ver mas en Pipfile [scripts])
