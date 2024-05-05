from flask import Blueprint, jsonify

chatbot = Blueprint('chatbot', __name__)

@chatbot.route('/', methods=['POST'])
def chatbot_route():
    response_data = {
        'content': 'Réponse du bot',
        'options': ['Option 1', 'Option 2', 'Option 3']
    }

    response = jsonify(response_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response