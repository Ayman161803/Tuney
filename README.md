# Tuney


[Tuney](https://your-tuney.herokuapp.com/) is a music recommendation system that takes songs that you like as input and gives recommendations using the spotipy API and content-based filtering algorithms. 

-----


## Prerequisites
The following need to installed before setting up Local Development Environment
```
python3
pip
npm
venv or virtualenv
```

## Local development

### Setup using shell scripts

Linux and macOS users can use shell scripts ``install.sh``, ``run-frontend.sh`` and ``run-backend.sh`` to perform respective functions. 

Step1: Provide excution permissions to shell scripts
```
chmod a+x install.sh run-backend.sh run-frontend.sh 
```

Step2: Run ``install.sh`` to install dependencies and set up virtual environment 

```
./install.sh
```

Step3: Run ``run-backend.sh`` to start the REST server at port 6001

```
./run-backend.sh
```

Step4: Open another terminal window and Run ``run-frontend.sh`` to start the react server at port 3000

```
./run-frontend.sh
```

#### Manual Setup Guide

Follow the below steps carefully to run the application locally.

Step1: Open terminal/cmd promt in local git repository

Step2: cd into ``Backend`` of your local git repository

Example

```
cd Backend
```
Step3: Install ``virtualenv`` package using pip

for Windows

```
pip install virtualenv
```

for macOS/Linux

```
pip install venv
```


Step4: Create a new virtual environment on that directory

for Linux and macOS
```
python3 -m venv venv 
```
for Windows
```
virtualenv .
```

Step5: Activate Your Virtual Environment

for Linux
```
source bin/activate
```
for Windows
```
cd Scripts
activate
cd ..
```

Step6: Install Flask dependencies Dependencies

```
pip install -r requirements.txt
```

Step7: Run the REST API server

for Windows
```
python app.py
```

for Linux or macOS
```
python3 app.py
```

Step8: Change directory into the ``Frontend`` folder
```
cd ../Frontend
```
Step9: Install npm modules

```
npm install
```

Step10: Run frontend code

```
npm start
```

You should be greeted with the following page at http://localhost:3000/

<img width="1280" alt="image" src="https://user-images.githubusercontent.com/76606666/170835715-e2cec5cc-6335-456f-b2ef-30bc142577b4.png">

Thank you for visiting the repository
