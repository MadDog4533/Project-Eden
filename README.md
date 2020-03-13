# Project-Eden

Project Eden, is an all in one, Church Managment Platform. The goal of this project is to easily deploy all web services and manage church data, in a powerful but easy to use
maner. 

## Version Control

Versioning is controlled by NPM and updated through its package.json

Prerelease Community Version
[Major|Minor|Patch|Build]
```
NPM version prerelease 0.0.0-1
NPM version prepatch   0.0.1-0
NPM version preminor   0.1.0-0
NPM version prebuild   1.0.0-0
```

## Features

Implemented featues:
- Express middleware vhost technology
- Modular Engine
- REPL Server at runtime for enviroment manupulation and console debbugging (F12 Console)
- Class and Method Decorators
- Modified Console Logging and Debugging for 
- Plugin Loader and Manager fo
- Open Source

Planned Features:
- Livestream Endpoint
- Template Engine
- CMS Front End for Data Management
- SQL Deployment and Backend
- App Store and Integration with Server Stack (Apps no longer need hosted by 3rd Parties)
- Report Builder
- Authorization Engine and OAuth2
- REST API - json
- REST API wrappers (Node, Ruby, PHP, C/C#, Python)
- Donation Endpoint
- Resource Store (Service Countdowns, intros, AE templates, Logos)
- CRON Jobs


### Deployment, Compiling from Source, and contributing
Clone this repo using .zip, github desktop,

Install NPM 12.6.1 or Later https://nodejs.org/en/download/
Install Typescript compiler 3.4 or later https://www.typescriptlang.org/#download-links

```
npm install -g typescript
```

Downloading Project Dependencies:
```
npm install
```

Compiling Source:
```
npm run tsc
```
Will compile to the 'lib' folder

Deploying:
```
npm test
```
