from flask import Flask, request, jsonify
import pandas as pd
from utils.xlsxToListData import read_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/upload", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # print(request.files['file'])
        f = request.files['file']
        data = read_data(f)
        return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
