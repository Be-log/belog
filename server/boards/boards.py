from flask import jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import json
from pymongo import MongoClient
from pymongo.collection import Collection
from bson import ObjectId
from datetime import datetime
import certifi
from . import boards_bp

# Config
with open('config.json', 'r', encoding='utf-8') as f:
  config = json.load(f)

# MongoDB
ca = certifi.where()
client = MongoClient(config['DB_URI'], tlsCAFile=ca)
db = client.belog
users_collection: Collection = db.users
boards_collection: Collection = db.boards
sequence_collection: Collection = db.sequence

jwt = JWTManager()

####################
# [board] create
####################
@boards_bp.route('', methods=['POST'])
@jwt_required()
def createBoard():
  try:
    receive_toekn = get_jwt_identity()
    token_obj_id = ObjectId(receive_toekn)
    get_params = request.get_json()
    receive_title = get_params['title']
    receive_thumbnail = get_params['thumbnail']
    receive_content = get_params['content']
    user_data = users_collection.find_one({ '_id': token_obj_id })


    if not all(key in get_params for key in ['title', 'thumbnail', 'content']):
      return jsonify({ 'msg': '필수 정보가 누락되었습니다.' }), 400

    if user_data is None:
      return jsonify({ 'msg': '사용자 정보를 찾을 수 없습니다.' }), 404

    # board sequence
    sequence_doc = sequence_collection.find_one_and_update(
      { '_id': 'board_seq' },
      { '$inc': { 'sequence_value': 1 }},
      upsert=True
    )
    board_seq = sequence_doc['sequence_value']

    current_datetime = str(datetime.now())[0:10]

    boards_collection.insert_one({
      'board_seq': board_seq, 'user_obj_id': user_data['_id'], 'user_id': user_data['user_id'], 'nickname': user_data['nickname'],
      'title': receive_title, 'thumbnail': receive_thumbnail, 'content': receive_content,
      'create_date': current_datetime, 'update_date': current_datetime,
    })

    return jsonify({ 'receiveData': board_seq, 'msg': '게시글이 등록되었습니다.' }), 201
  except KeyError:
    return jsonify({ 'msg': '필수 정보가 누락되었습니다.' }), 400
  except Exception as e:
    return jsonify({ 'msg': '게시글 등록 중 오류가 발생했습니다.', 'error': str(e) }), 500

####################
# [board] update
####################
@boards_bp.route('', methods=['PUT'])
@jwt_required()
def updateBoard():
  try:
    receive_toekn = get_jwt_identity()
    token_obj_id = ObjectId(receive_toekn)
    get_params = request.get_json()
    receive_title = get_params['title']
    receive_thumbnail = get_params['thumbnail']
    receive_content = get_params['content']
    receive_seq = get_params['postId']
    user_data = users_collection.find_one({ '_id': token_obj_id })


    if not all(key in get_params for key in ['title', 'thumbnail', 'content']):
      return jsonify({ 'msg': '필수 정보가 누락되었습니다.' }), 400

    if user_data is None:
      return jsonify({ 'msg': '사용자 정보를 찾을 수 없습니다.' }), 404
    
    current_datetime = str(datetime.now())[0:10]

    boards_collection.update_one({'board_seq': int(receive_seq)}, {'$set': {
      'title': receive_title, 'thumbnail': receive_thumbnail, 'content': receive_content, 'update_date': current_datetime,
    }})

    return jsonify({ 'receiveData': receive_seq, 'msg': '게시글이 수정되었습니다.' }), 201
  except KeyError:
    return jsonify({ 'msg': '필수 정보가 누락되었습니다.' }), 400
  except Exception as e:
    return jsonify({ 'msg': '게시글 등록 중 오류가 발생했습니다.', 'error': str(e) }), 500
  
####################
# [board] read_one
####################
@boards_bp.route('<string:id>', methods=['GET'])
def getBoard(id):
  try:
    receive_id = int(id)

    find_board = boards_collection.find_one({ 'board_seq': receive_id })
    if find_board is None:
      return jsonify({ 'msg': '해당 게시글이 존재하지 않습니다.' }), 404
    
    set_date_str = datetime.strptime(find_board['create_date'], '%Y-%m-%d').strftime('%Y년 %m월 %d일')

    give_board = {
      'boardId': find_board['board_seq'], 'writer': str(find_board['user_obj_id']),
      'userId': find_board['user_id'], 'nickname': find_board['nickname'], 'date': set_date_str,
      'title': find_board['title'], 'thumbnail': find_board['thumbnail'], 'content': find_board['content']
    }
    return jsonify({ 'receiveObj': give_board, 'msg': '게시글이 조회되었습니다.' }), 201
  except Exception as e:
    return jsonify({ 'msg': '게시글 조회 중 오류가 발생했습니다.', 'error': str(e) }), 500
  
####################
# [board] read_all
####################
@boards_bp.route('', methods=['GET'])
def getBoardList():
  try:
    find_boards = list(boards_collection.find({}, {'_id': False, 'user_obj_id': False, 'update_date': False}))
    return jsonify({ 'receiveObj': find_boards, 'msg': '게시글이 조회되었습니다.' }), 201
  except Exception as e:
    return jsonify({ 'msg': '게시글 조회 중 오류가 발생했습니다.', 'error': str(e) }), 500
  
####################
# [board] delete
####################
@boards_bp.route('<string:id>', methods=['DELETE'])
@jwt_required()
def deleteBoard(id):
  try:
    receive_token = get_jwt_identity()
    token_obj_id = ObjectId(receive_token)

    find_board = boards_collection.find_one({ 'board_seq': int(id) })
    print('111')

    if find_board is None:
      print('222')
      return jsonify({ 'msg': '해당 게시글을 찾을 수 없습니다.' }), 404
    elif find_board['user_obj_id'] != token_obj_id:
      print('333')
      return jsonify({ 'msg': '작성자의 정보가 일치하지 않습니다.' }), 403
    elif find_board['user_obj_id'] == token_obj_id:
      print('444')
      boards_collection.delete_one({'user_obj_id': token_obj_id, 'board_seq': int(id)})
    
    return jsonify({ 'msg': '게시글이 삭제되었습니다.' }), 201
  
  except KeyError:
    return jsonify({ 'msg': '필수 정보가 누락되었습니다.' }), 400
  except Exception as e:
    return jsonify({ 'msg': '게시글 삭제 중 오류가 발생했습니다.', 'error': str(e) }), 500