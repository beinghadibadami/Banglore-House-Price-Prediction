from flask import jsonify,request,Flask
from flask_cors import CORS
import util

app=Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

@app.route('/get_location_names',methods=['GET'])
def get_location_names():

    print('Getting locations !!')

    util.load_artifacts()

    response= jsonify({
   
    'locations':util.get_location_names()
   
    })
   
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/predict_house_price', methods=['POST'])
def predict_house_price():
    data = request.get_json()

    total_sqft = float(data['sqft'])
    location = data['location']
    bhk = int(data['bedrooms'])
    bath = int(data['bathrooms'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bath, bhk)
    })
    
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/health')
def health():
    return "Flask server is running!"

@app.route('/')
def home():
    return "Backend Running !"

if __name__ == "__main__":

    print('Starting python flask server!')
    
    app.run(host='0.0.0.0', port=5000)
