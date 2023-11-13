#!/bin/bash

# Stoppe das Skript bei Fehlern
set -e

# Erstelle die nötigen Basiskomponenten --> nur beim ersten Mal notwendig
# -----------------------------------------------------------------------

# Initialisiere Elastic Beanstalk
# eb init -p node.js <my-app-name> --region eu-central-1 

# Erstelle eine neue Umgebung
# eb create product-api-1-env

# Umgebungsvariablen setzen
# eb setenv AWS_RDS_ENDPOINT=database-1.chhg8l37c6tv.eu-central-1.rds.amazonaws.com BCRYPT_PASSWORD='29(/%&\!Hkyiz1&' ENV=dev PORT=3000 POSTGRES_DB=postgres POSTGRES_DEV_DB=shopping_dev POSTGRES_PASSWORD=password123 POSTGRES_TEST_DB=shopping_test POSTGRES_USER=shopping_user SALT_ROUNDS=10 TOKEN_SECRET=KasparIstGross_test

# Regelmässiger Build und Deploy Prozess
# --------------------------------------

# Führe den Build-Prozess aus (dein Skript hier eintragen)
# npm run build

# echo "build completed now starting deployment..." 

# Erstelle ein ZIP-Archiv des dist-Verzeichnisses
# cd dist
# zip -r ../app.zip .
# cd ..

# echo "Deployment archive created, starting deployment..."

# Deploye die Anwendung mit dem erstellten Archiv
aws s3 cp --recursive --acl public-read ./build s3://shopping-cli-029828047956/

echo "deployment completed"

# Öffne die Anwendung im Browser
# eb open

#echo "Deployment abgeschlossen!"
