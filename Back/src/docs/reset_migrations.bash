rm -R -f ./migrations
rm -R -f ./instance
pipenv run flask db init
pipenv run migrate 
pipenv run upgrade
pipenv run python seed.py
