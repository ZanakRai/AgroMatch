import pickle
import numpy as np
import json
import os
from django.apps import apps

# Get app directory path
app_dir = apps.get_app_config('AgroMatch').path 

model_path = os.path.join(app_dir, 'model_1.pkl')
scaling_path=os.path.join(app_dir,'scaling_1.pkl')

with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

with open(scaling_path,'rb') as scaling_file:
    scaling=pickle.load(scaling_file)

pred_dict = {
        1: 'rice',
        2: 'maize',
        3: 'chickpea',
        4: 'kidneybeans',
        5: 'pigeonpeas',
        6: 'mothbeans',
        7: 'mungbean',
        8: 'blackgram',
        9: 'lentil',
        10: 'pomegranate',
        11: 'banana',
        12: 'mango',
        13: 'grapes',
        14: 'watermelon',
        15: 'muskmelon',
        16: 'apple',
        17: 'orange',
        18: 'papaya',
        19: 'coconut',
        20: 'cotton',
        21: 'jute',
        22: 'coffee'
    }

def crop_prediction(data):
    N = data.get("nitrogen")
    P = data.get("phosphorous")
    K = data.get("potassium")
    temp = data.get("temperature")
    hum = data.get("humidity")
    ph = data.get("soilPh")

    feature = [N, P, K, temp, hum, ph]
    feature1 = np.array(feature).reshape(1, -1)
    t_feature = scaling.transform(feature1)

    crop_predict=model.predict(t_feature)

    if crop_predict[0] in pred_dict:
        crop=pred_dict[crop_predict[0]]
        result={"crop":crop}
    else:
        result={"message":"No suitable crop found"}

    return result