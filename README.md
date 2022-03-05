#### Authors: [Shivam Parikh](http://www.sparikh.me) and [Curran Bhatia](http://www.curranbhatia.me)
Project: March 4th, 2022
# Minting NFTs for Physical Artifacts on Solana

### Installing the project
`sh init.sh`
to enter the virtual environment: `source venv/bin/activate`
to exit the virtual environment: `deactivate`

`python manage.py makemigrations mint`
`python manage.py migrate`

### Start API
`python manage.py runserver`

see api at:
http://127.0.0.1:8000/mint/uploads/

### Setup front end
`npm install`

### Running the front end:
`cd creation-ui`
`npm start`


Access Django Admin:
http://127.0.0.1:8000/admin/

References:
https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
