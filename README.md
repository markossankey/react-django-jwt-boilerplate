### Boilerplate code for a React / Django App requiring authentication

This is a boiler fullstack app using db.sqlite3, JWT authentication, Django, Django Cors Header, Django Rest Framework, React, and Axios.

## Prerequisites
Make sure you have the most current version of Python installed

## To Use
# Django Setup
1. Go to this repo in Github, click the green 'Code' button, copy the HTTPS URL
2. Open your terminal to the location that you want the code
3. `$ git clone [url]`
4. add your Django Secret Key to the .env file (.env_example provided)
5. create a new virtual environment `$ python -m venv .venv`
6. activate virtual environment `$ source .venv/bin/activate`
7. install python packages `$ pip install -r requirements.txt`
8. create database and tables `$ python manage.py migrate`
9. load test data `$ python manage.py loaddata backend_app/fixtures/data.json`
10. start server `$ python manage.py runserver`

# React Setup
10. Open new terminal window
11. cd into frontend folder
12. install javascript packages `$ npm install`
13. run frontend `$ npm start`
14. verify everything is working by typing "admin" into username and password fields and logging in
15. browser should be redirected and there should be a refresh_token stored in cookies
