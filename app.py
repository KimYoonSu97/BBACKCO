from flask import Flask, render_template, request, jsonify, Response
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://starta:test@cluster0.0ozcuu6.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta


@app.route('/')
def home():
    return render_template('index.html')

# 댓글을 DB에 보냅니다.
@app.route("/comments", methods=["POST"])
def comment_post():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    fire_receive = request.form['fire_give']
    
    doc = {
        'name':name_receive,
        'comment':comment_receive,
        'fire':fire_receive
    }
    db.comment.insert_one(doc)
    return jsonify({'msg':'응원해주셔서 감사합니다🥰'})

# 좋아요 숫자를 DB에 보냅니다.
@app.route('/like',methods=['POST'])
def like():
    like_receive = request.form['like-plus']

    doc = {
        'likeNum' : like_receive
    }

    db.like.update_one({"likeId" :"like"},{ "$set": doc})

    return jsonify({"msg":'POST check OK!'})


# DB에 저장된 댓글 정보를 불러옵니다.
@app.route("/comments", methods=["GET"])
def comment_get():

    all_comments = list(db.comment.find({},{'_id':False}))

    return jsonify({'result': all_comments})

# DB에 저장된 멤버들의 정보를 불러옵니다.
@app.route("/members", methods=["GET"])
def member_get():

    all_member = list(db.members.find({},{'_id':False}))

    return jsonify({'result': all_member})

# DB에 좋아요 수를 불러옵니다.
@app.route("/like", methods=["GET"])
def likeNum_get():

    all_likeNum = list(db.like.find({},{'_id':False}))

    return jsonify({'result': all_likeNum})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)