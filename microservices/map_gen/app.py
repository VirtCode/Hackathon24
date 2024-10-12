from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
import maps

MENSA_MAPPING = {
    "Polysnack" : "62a02795-65cc-4b01-9172-7321362cbef4",
    "Archimedes" : "63adc875-938c-41f0-acd2-31903e90b3d2",
    "Polymensa" : "6d930285-affe-47a3-af8f-2e04df87af38",
    "Clausiusbar" : "c33ab862-640a-4364-9c01-fffb40d67ae0",
    "UZH Zentrum" : "987fca43-1288-41c8-b8cd-34d5624ee0c3"
}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/render', methods=['POST'])
def getRender():
    data = request.get_json()
    #file_path = f'resources/{data["id"]}.json'
    file_path = f'resources/polaymensa.json'
    mensaMap = maps.Map(file_path)
    return maps.addTables(mensaMap, data).svgMap.as_str()

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 4444)))
