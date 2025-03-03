import json,pickle
import numpy as np

__data_columns = None

__locations=None

__model=None

def get_location_names():

    return __locations


def get_estimated_price(location,sqft,bath,bhk):

    try:

        loc_index=__data_columns.index(location.lower())

    except:

        loc_index=-1
    

    if loc_index == -1: 

        return 'No data available for this location' 

    else:

        x=np.zeros(len(__data_columns))

        x[235]=sqft

        x[236]=bath

        x[237]=bhk

        x[loc_index]=1


        return round(__model.predict([x])[0],2)


def load_artifacts():

    global __data_columns 


    global __locations


    global __model 


    print('Loading Saved Artifacts....')
    

    with open(r"server/artifacts/columns.json",'r') as f:

        __data_columns=json.load(f)['data_columns']

        __locations=__data_columns[:235]
    
    print('Locations Loaded.....!!')

    with open(r"server/artifacts/house_prices_prediction.pickle",'rb') as f :

        __model=pickle.load(f)

    print('Model Loaded , Done !!')


if __name__=="__main__":
    load_artifacts()

