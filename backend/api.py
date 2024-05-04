from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("heyhi-ai-firebase-adminsdk-eztb2-eae73c83e4.json")
firebase_admin.initialize_app(cred)

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    response_data = {
        'content': 'Réponse du bot',
        'options': ['Option 1', 'Option 2', 'Option 3']
    }

    response = jsonify(response_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/users/login', methods=['POST'])
def login():

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    response_data = {
        'email': email,
        'password': password
    }

    response = jsonify(response_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/users/register', methods=['POST'])
def register():

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    response_data = {
        'username': username,
        'email': email,
        'password': password
    }

    response = jsonify(response_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True)