# config
import json
with open('config.json', 'r', encoding='utf-8') as f:
  config = json.load(f)

# flask, cors, bcypt
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
app.config['SECRET_KEY'] = config['BCRYPT_KEY']
app.config['BCRYPT_LEVEL'] = 10
bcrypt = Bcrypt(app)

# pymongo
from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient(config['DB_URI'], tlsCAFile=ca)
db = client.belog

# [user] SignUp
@app.route('/api/users/signup', methods=['POST'])
def postUser():
  try:
    get_params = request.get_json()
    user_id = get_params['id']
    user_pwd = bcrypt.generate_password_hash(get_params['pwd'])
    nickname = get_params['nickname']

    # id 중복 확인
    find_id = db.users.find_one({ 'user_id': user_id })
    if find_id is not None:
      return jsonify({ 'result': False, 'msg': '이미 존재하는 아이디입니다.' })
    else:
      db.users.insert_one({ 'user_id': user_id, 'user_pwd': user_pwd, 'nickname': nickname })
      return jsonify({ 'result': True, 'msg': '회원가입이 완료되었습니다.' })
  except Exception as e:
    return jsonify({ 'error': str(e) })


if __name__ == '__main__':
    app.run(debug=True)
