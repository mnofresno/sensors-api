# Sensors API

JSON API for reading/parsing lm-sensors command output via http protocol

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

V8 Javascript engine node.js https://nodejs.org
lm-sensors https://github.com/groeck/lm-sensors

in debian derivative systems, issue the following command:

sudo apt-get install nodejs lm-sensors

### Installing

Clone this repository

cd into the cloned repository

Intall the dependencies:

npm install

### Running:

run the application server with the following command

node main.js

to keep up the server running in background, you can install 'nohup' (sudo apt-get install nohup), then you can run:

nohup node main.js &

So you can permanently monitor your server's physical parameters (temperature, CPU usage, RPM, etc...) remotely via the HTTP server API.

## Authors

Mariano M. Fresno mnofresno@gmail.com

http://www.catalisis.com.ar

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Inspirated by https://github.com/BeryJu/sensors.js BeryJu's excelent javascript library
