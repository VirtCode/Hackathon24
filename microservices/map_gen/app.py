from flask import Flask, request
from flask_cors import CORS, cross_origin
import os

import maps

#import svgutils.transform as st

myMap = maps.Map("resources/polysnack.json")
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/render', methods=['POST'])
def getRender():
    data = request.get_json()
    print(f'MensaID: {data["id"]}')
    #myMap = maps.addTables(maps.MAPS['polysnack'], data)
    return maps.addTables(maps.MAPS['polysnack'], data).svgMap.as_str()

if __name__ == '__main__':

    maps.MAPS['polysnack'] = maps.Map("resources/polysnack.json")
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 4444)))


    """ 
    ## TODO: json will be passed via flask
    with open('data.json', 'r') as file:
        data = json.load(file)

    print(f'MensaID: {data["id"]}')
    ## TODO: Check for Mensa Map
    ## TODO: myMap = maps[data['id']]

    maps.addTables(maps.MAPS['polysnack'], data)

    my_svg2 = st.fromstring(myMap.svgMap.as_str())
    my_svg2.save('resources/my_svg.svg')
    """


