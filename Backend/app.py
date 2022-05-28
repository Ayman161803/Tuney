from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


print("Importing data and model operation functions...")
import model

@app.route('/validate', methods=['POST'])
#define function
def validate():
    if model.get_song_data(request.get_json(), model.spotify_data) is not None:
        return jsonify({"isvalid":True})
    return jsonify({"isvalid":False})

@app.route('/prediction', methods=['POST'])
#define function
def predict():
    print(request.get_json())
    return jsonify({"data":model.recommend_songs(request.get_json()["song_list"],model.spotify_data)})




if __name__=="__main__":
    app.run(port=6001)