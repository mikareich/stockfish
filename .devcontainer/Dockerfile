# Verwenden eines offiziellen Node.js-Basisimages
FROM node:16

# Setzen des Arbeitsverzeichnisses
WORKDIR /usr/src/app

# Kopieren der package.json und package-lock.json
COPY package*.json ./

# Installieren der Abhängigkeiten
RUN npm install

# Kopieren des App-Codes in den Container
COPY . .

# Die App wird auf Port 3000 bereitgestellt, also legen wir diesen Port frei.
EXPOSE 3000
