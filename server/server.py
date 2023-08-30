# config
import json
with open('config.json', 'r', encoding='utf-8') as f:
  config = json.load(f)

# flask, cors, bcypt, jwt
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
app.config['SECRET_KEY'] = config['BCRYPT_KEY']
app.config['BCRYPT_LEVEL'] = 10
app.config['JWT_SECRET_KEY'] = config['JWT_KEY']
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# pymongo
from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient(config['DB_URI'], tlsCAFile=ca)
db = client.belog

#################
# [user] SignUp
#################
@app.route('/api/users/signup', methods=['POST'])
def postSignUp():
  try:
    get_params = request.get_json()
    receive_id = get_params['id']
    receive_pwd = bcrypt.generate_password_hash(get_params['pwd'])
    receive_nickname = get_params['nickname']

    # id 중복 확인
    find_id = db.users.find_one({ 'user_id': receive_id })
    if find_id is not None:
      return jsonify({ 'msg': '이미 존재하는 아이디입니다.' }), 422
    else:
      db.users.insert_one({ 'user_id': receive_id, 'user_pwd': receive_pwd, 'nickname': receive_nickname })
      return jsonify({ 'msg': '회원가입이 완료되었습니다.' }), 201
  except Exception as e:
    return jsonify({ 'error': str(e) })
  
#################
# [user] SignIn
#################
@app.route('/api/users/signin', methods=['POST'])
def postSignIn():
  try:
    get_params = request.get_json()
    receive_id = get_params['id']
    receive_pwd = get_params['pwd']

    user_data = db.users.find_one({ 'user_id': receive_id })

    if user_data is not None:
      is_pwd_same = bcrypt.check_password_hash(user_data['user_pwd'], receive_pwd)
      if is_pwd_same:
        access_token = create_access_token(identity=str(user_data['_id']), additional_claims={'user_id': user_data['user_id']})
        return jsonify({ 'accessToken': access_token, 'userId': user_data['user_id'], 'nickname': user_data['nickname'],
                        'msg': '로그인이 완료되었습니다.' }), 201
      else:
        return jsonify({ 'falseData': 'loginPwd', 'msg': '비밀번호가 일치하지 않습니다.' }), 422
    else:
      return jsonify({ 'falseData': 'loginId', 'msg': '일치하는 아이디가 없습니다.' }), 422
  except Exception as e:
    return jsonify({ 'error': str(e) })


if __name__ == '__main__':
    app.run(debug=True)
