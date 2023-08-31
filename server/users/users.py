from flask import jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
import json
from pymongo import MongoClient
from pymongo.collection import Collection
import certifi
from . import users_bp

# Config
with open('config.json', 'r', encoding='utf-8') as f:
  config = json.load(f)

# MongoDB
ca = certifi.where()
client = MongoClient(config['DB_URI'], tlsCAFile=ca)
db = client.belog
users_collection: Collection = db.users

bcrypt = Bcrypt()
jwt = JWTManager()

####################
# [user] SignUp
####################
@users_bp.route('/signup', methods=['POST'])
def postSignUp():
  try:
    get_params = request.get_json()
    receive_id = get_params['id']
    receive_pwd = bcrypt.generate_password_hash(get_params['pwd'])
    receive_nickname = get_params['nickname']

    # id 중복 확인
    find_id = users_collection.find_one({ 'user_id': receive_id })
    if find_id is not None:
      return jsonify({ 'msg': '이미 존재하는 아이디입니다.' }), 422
    else:
      users_collection.insert_one({ 'user_id': receive_id, 'user_pwd': receive_pwd, 'nickname': receive_nickname })
      return jsonify({ 'msg': '회원가입이 완료되었습니다.' }), 201
  except Exception as e:
    return jsonify({ 'error': str(e) })

####################
# [user] SignIn
####################
@users_bp.route('/signin', methods=['POST'])
def postSignIn():
  try:
    get_params = request.get_json()
    receive_id = get_params['id']
    receive_pwd = get_params['pwd']

    user_data = users_collection.find_one({ 'user_id': receive_id })

    if user_data is not None:
      is_pwd_same = bcrypt.check_password_hash(user_data['user_pwd'], receive_pwd)
      if is_pwd_same:
        access_token = create_access_token(
          identity = str(user_data['_id']),
          additional_claims = {'user_id': user_data['user_id']},
        )
        return jsonify({ 'accessToken': access_token, 'userId': user_data['user_id'], 'nickname': user_data['nickname'],
                        'msg': '로그인이 완료되었습니다.' }), 201
      else:
        return jsonify({ 'receiveData': 'loginPwd', 'msg': '비밀번호가 일치하지 않습니다.' }), 422
    else:
      return jsonify({ 'receiveData': 'loginId', 'msg': '일치하는 아이디가 없습니다.' }), 422
  except Exception as e:
    return jsonify({ 'error': str(e) })

####################
# [user] SignOut
####################
@users_bp.route('/signout', methods=['DELETE'])
@jwt_required()
def deleteSignOut():
  try:
    response = jsonify({ 'msg': '로그아웃되었습니다.' })
    unset_jwt_cookies(response)
    return response, 200
  except Exception as e:
    return jsonify({ 'error': str(e) })