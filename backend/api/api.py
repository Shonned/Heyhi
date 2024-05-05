from flask import Flask
from flask_cors import CORS
from chatbot.chatbot import chatbot
from users.users import users

app = Flask(__name__)
CORS(app)

app.register_blueprint(users, url_prefix='/api/users')
app.register_blueprint(chatbot, url_prefix='/api/chatbot')

if __name__ == '__main__':
    app.run(debug=True)
