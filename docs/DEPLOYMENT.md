# Deployment Process

## Overview

Each push to the github repo triggers the deployment process. When pushing the dev branch, the deployment to the AWS development environment is triggered, when pushing the main/master branch, the deployment to the prod environment is done.

## Deplyoment Process

### Client Deployment Steps

The client deployment process consists of the following main steps:

| Step                 | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| node/install         | Installs Node.js using the CircleCI Node.js Orb                                 |
| checkout             | Checks out the code from the version control system into the CircleCI workspace |
| Install Angular CLI  | Installs the Angular CLI globally using npm                                     |
| Install Dependencies | Runs npm install to install all the project dependencies                        |
| Build client         | Executes the npm run build command to build the Angular application             |
| aws-cli/setup        | Sets up the AWS CLI using the CircleCI AWS CLI Orb                              |
| Deploy client        | Deploys the built application to an AWS S3 bucket using the aws s3 cp command   |

### API Deployment Steps

The client deployment process consists of the following main steps:

| Step                                | Description                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| executor: node/default              | Standard Node.js-Umgebung                                                                                     |
| environment: ENV: dev\|prod         | Setzt `ENV` auf dev oder prod                                                                                 |
| checkout                            | Kopiert Code aus Git-Repo                                                                                     |
| node/install-packages               | Installiert Node.js-Pakete mit npm                                                                            |
| Install pip                         | Installiert pip für Python                                                                                    |
| Install virtualenv                  | Installiert virtualenv für Python                                                                             |
| Install Elastic Beanstalk CLI       | Installiert AWS EB CLI                                                                                        |
| Run Elastic Beanstalk CLI Installer | Führt Python-Skript für EB CLI Installation aus                                                               |
| Run deploy                          | Führt `npm run deploy` für AWS EB aus. Inkludiert `bin/deploy.sh` mit `npm run test:env` und `eb deploy env`. |

## Relevant Files

| File                         | Purpose                                                               |
| ---------------------------- | --------------------------------------------------------------------- |
| .circleci/config.yml         | Configuration file to orchestrate the deployment process in CircleCI  |
| .elasticbeanstalk/config.yml | Specifies the configuration of the the AWS Elastic beanstalk setup    |
| bin/deploy.sh                | File triggered during the deployment process to aws elastic beanstalk |
| package.json                 | Includes misc. test and deployment scripts                            |

## Deplyoment Process

## Deployment Evidence

![Deploy API](img/deploy_api.png)

![Deploy Client](img/deploy_cli.png)
