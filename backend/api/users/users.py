from flask import Blueprint, request, jsonify
from firebase import db

users = Blueprint('users', __name__)


@users.route('/get', methods=['GET'])
def get_users():
    users_ref = db.collection('users')
    users = users_ref.stream()
    users_data = [user.to_dict() for user in users]
    response_data = jsonify(users_data)
    response_data.headers.add('Access-Control-Allow-Origin', '*')
    return response_data


@users.route('/login', methods=['POST'])
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


@users.route('/register', methods=['POST'])
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
