from bson import ObjectId
from flask import Flask, request, jsonify,render_template
from utils.xlsxToListData import read_data
from flask_cors import CORS
from utils.connectDb import db, products_collection
import json


app = Flask(__name__,template_folder='reactui/build',static_folder='reactui/build/static')
CORS(app)


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/upload", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # print(request.files)
        f = request.files['file']
        data = read_data(f)
        # print(data)
        return jsonify(data)


@app.route("/save-excel-data", methods=['POST'])
def save_excel_data():
    if request.method == 'POST':
        json_data = request.get_json()
        # print(json_data)
        products_collection.insert_many(json_data)
        saved_data = list(products_collection.find({}))
        if len(saved_data) > 0:
            return JSONEncoder().encode(saved_data)
        return JSONEncoder().encode([])



@app.route("/get-excel-data", methods=['GET'])
def get_excel_data():
    if request.method == 'GET':
        data = list(products_collection.find({}))
        # print(data)
        return JSONEncoder().encode(data)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
