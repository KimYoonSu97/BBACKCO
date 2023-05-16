from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

# 김윤수의 몽고디비에 연결되어있읍니다.
client = MongoClient('mongodb+srv://starta:test@cluster0.0ozcuu6.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

# 저장 - 예시
# doc = {'name':'bobby','age':21}
# db.users.insert_one(doc)

# 한 개 찾기 - 예시
# user = db.users.find_one({'name':'bobby'})

# 여러개 찾기 - 예시 ( _id 값은 제외하고 출력)
# all_users = list(db.users.find({},{'_id':False}))

# 바꾸기 - 예시
# db.users.update_one({'name':'bobby'},{'$set':{'age':19}})

# 지우기 - 예시
# db.users.delete_one({'name':'bobby'})

# 여기서부터 설명하고 코드를 작성해 주세요!!!

@app.route('/')
def home():
    return render_template('index.html')




if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)
    