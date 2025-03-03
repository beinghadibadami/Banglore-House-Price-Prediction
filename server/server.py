from flask import jsonify,request,Flask
import util

app=Flask(__name__)


@app.route('/get_location_names',methods=['GET'])

def get_location_names():

    print('Getting locations !!')

    util.load_artifacts()

    response= jsonify({
   
    'locations':util.get_location_names()
   
    })
   
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_house_price',methods=['POST'])

def predict_house_price():
    
    total_sqft=float(request.form['total_sqft'])
    
    location=request.form['location']
    
    bhk=int(request.form['bhk'])
    
    bath=int(request.form['bath'])

    response=jsonify({
        'estimated_price' : util.get_estimated_price(location,total_sqft,bath,bhk)
    })    

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__=="__main__":
    print('Starting python flask server !')
    app.run()