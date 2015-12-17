# Octopus Trivia
> Working title

## Installatie

Zorg er eerst voor dat je [Git](https://git-scm.com/) en [Node.js](https://nodejs.org/) hebt geïnstalleerd op je systeem. Voer dan de volgende commando's uit:

```shell
> git clone git@github.com:Mesoptier/octopus-trivia.git # Maakt een nieuwe map 'octopus-trivia' aan met de project bestanden
> cd octopus-trivia # Open de nieuwe map
> npm install # Installeert de vereiste modules, dit kan een tijdje duren
> npm install webpack-dev-server -g # Installeert de webserver
```

Vervolgens start je een server die automatisch de broncode compileerd en deze toegankelijk maakt via `http://localhost:8080`. Je kan de webserver starten met het volgende commando:

```shell
> npm start
```
