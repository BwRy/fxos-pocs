#!/usr/bin/env python

import os
import time

from flask import Flask, request, jsonify
from werkzeug import secure_filename

UPLOAD_FOLDER = '/tmp'
EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/upload", methods=['POST'])
def upload():
    print "FILES", request.files
    file = request.files['file']
    if file:
        filename = "upload-" + str(int(time.time())) + "-" + secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return jsonify({"success":True})

if __name__ == "__main__":
    app.debug = True
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.run("0.0.0.0", 8080)
