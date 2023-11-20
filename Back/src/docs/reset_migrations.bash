
# Eliminar directorios
rm -R -f ./migrations
rm -R -f ./instance

# Inicializar migraciones
pipenv run flask db init
# Operaciones relacionadas con la base de datos
{
  # Intentar eliminar y crear la base de datos
  dropdb -h dpg-cldr6mghgaic73bmjl9g-a.frankfurt-postgres.render.com -U thinkflash thinkflashdatabase || true
  createdb -h dpg-cldr6mghgaic73bmjl9g-a.frankfurt-postgres.render.com -U thinkflash thinkflashdatabase || true

  # Crear extensión unaccent si no existe
  psql -h dpg-cldr6mghgaic73bmjl9g-a.frankfurt-postgres.render.com thinkflashdatabase -U thinkflash -c 'CREATE EXTENSION IF NOT EXISTS unaccent;' || true
} || {
  echo "Error en las operaciones de la base de datos"
  exit 1
}

# Ejecutar migraciones y actualizar la base de datos
pipenv run flask db migrate
pipenv run flask db upgrade

# Ejecutar el script de semilla
pipenv run python seed.py




# rm -R -f ./migrations
# rm -R -f ./instance
# pipenv run flask db init
# dropdb -h dpg-cko3d9m1101c73dhabcg-a.frankfurt-postgres.render.com -U database_o5dp_user database_o5dp || true &&
# createdb -h dpg-cko3d9m1101c73dhabcg-a.frankfurt-postgres.render.com -U database_o5dp_user database_o5dp || true &&
# psql -h dpg-cko3d9m1101c73dhabcg-a.frankfurt-postgres.render.com database_o5dp -U database_o5dp_user -c 'CREATE EXTENSION unaccent;' || true &&
# pipenv run migrate 
# pipenv run upgrade
# pipenv run python seed.py
