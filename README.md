## LaRuche connector example to Mintrawa Toolbox API

Exemple en Typescript/NodeJS de connexion à Mintrawa Toolbox API via socketIO


#### Installation

- Clonez le repository
- Installez Typescript (si pas déjà fait) https://www.typescriptlang.org/download
- installez les modules via `npm install`

#### Préparation

Dupliquez le fichier `/src/config/default.config.json` en `/src/config/config.json`
Editez le fichier `/src/config/config.json` pour y mettre votre `ACCOUNT` (sans le @) et votre `POSTING KEY`

#### Explications

Des qu'au mininum une des valeurs est trouvée sur un POST (tag, communauté ou langue) le serveur envoi un msg au socket

##### Config.json

- TAGS: liste des tags à surveiller (tableau de string)
- COMMUNITIES: liste des comptes de communauté à surveiller (tableau de string)
- LANGS: liste des code langue à surveiller (tableau de code **iso639-1**)

##### Handshake Authentication

L'authentification SocketIO se fait via la vérification d'un message signé (dans cet exemple la signature est effectuée via ***@hiveio/dhive***) ceci permettant de ne pas avoir besoin d'envoyer la clé privé au serveur (la vérification de la signature s'effectuant avec la clé publique)

#### Run

lancez via `npm start` pour build & executer

#### LANGS: version expérimentale

La détection de langue s'effectue via des tests sur différentes parties du post (afin de dectecté le multilangue), une langue est valide si elle est détecté au minimum 2 fois lors des tests. Si aucun test n'est concluant alors une tentative est effectué sur le post complet (si celui-ci dispose d'un minimum de mots requis). 
