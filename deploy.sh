#!/bin/bash

# Stoppe das Skript bei Fehlern
set -e

# Deploye die Anwendung mit dem erstellten Archiv
aws s3 cp --recursive --acl public-read ./dist s3://shopping-cli-029828047956/
