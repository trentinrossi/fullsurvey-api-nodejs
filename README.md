https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Executar o projeto
cross-env NODE_ENV=dev npm run dev

# Build the image
docker build . -t rodrigotrentinrossi/respondent-service:latest


// TODO