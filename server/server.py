from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import json
from users.users import users_bp
from boards.boards import boards_bp

app = Flask(__name__)

# Config
with open('config.json', 'r', encoding='utf-8') as f:
  config = json.load(f)

# CORS
CORS(app, origins=['http://localhost:3000'])

# Bcrypt
app.config['SECRET_KEY'] = config['BCRYPT_KEY']
app.config['BCRYPT_LEVEL'] = 10
bcrypt = Bcrypt(app)

# JWT
app.config['JWT_SECRET_KEY'] = config['JWT_KEY']
jwt = JWTManager(app)

# Blueprint
app.register_blueprint(users_bp, url_prefix='/api/users')
app.register_blueprint(boards_bp, url_prefix='/api/boards')

if __name__ == '__main__':
  app.run(debug=True)
