from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    response_data = {
        'content': 'Réponse du bot',
        'options': ['Option 1', 'Option 2', 'Option 3']
    }

    response = jsonify(response_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True)