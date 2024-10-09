from flask import *
from sys import argv

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/settopscore",methods=["POST"])
def settopscore():
    with open("topscore.txt","w") as f:
        f.write(f"{request.json["uname"]};{request.json["score"]}")
        return f"{request.json["uname"]};{request.json["score"]}"

@app.route("/api/gettopscore")
def gettopscore():
    with open("topscore.txt","r") as f:
        return f.read()

app.run(host="0.0.0.0",port=80)