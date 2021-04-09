from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

import pandas as pd
import numpy as np
from sklearn import preprocessing as pre
from sklearn.metrics.pairwise import cosine_similarity as cs

full_data = pd.read_pickle('./full_data.pkl')

songset = full_data.copy()
songset = songset.drop(columns=['artists','name'])
songset = songset[['id','acousticness','danceability','duration_ms','energy','instrumentalness','liveness','loudness','mode','speechiness','tempo','valence']]
x = pre.MinMaxScaler().fit_transform(songset.iloc[:,1:])

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

cid = '1e112a2ea1a645fcba890f76298f0d2a'
secret = '9f264ec7484642a38f77ecb85d9bac36'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

def findSimilarSongs(songIDs):
  indices = []
  for ID in songIDs:
    indices.append(searchbyID(ID))

  sum = 0
  for index in indices:
    sum += x[index]

  meanvector = sum/len(indices)
  meanvector = np.array(meanvector).reshape(1,-1)


  similarity_vals = cs(x, meanvector)

  combined = []

  for i in range(len(similarity_vals)):
    if similarity_vals[i] > 0.9:
      combined.append((i,similarity_vals[i]))

  combined.sort(key=lambda x:x[1])

  if len(combined)>12:
    combined = combined[:12]
  
  sim = [i for i, s in combined]

  similar_songs_IDs = []
  for song_id in full_data.iloc[sim]['id']:
    similar_songs_IDs.append(song_id)
  return similar_songs_IDs 

songdict = songset.set_index('id').T.to_dict('list')

def searchbyID2(ID):
  try: 
    songdict[ID]
    return 1
  except:
    return -1

def searchInDatabase(search):
  output_raw = sp.search(search, limit=10)
  output = {'songs':[]}
  for i in range(len(output_raw['tracks']['items'])): 
    if searchbyID2(output_raw['tracks']['items'][i]['id']) != -1:
      output["songs"].append({'title': output_raw['tracks']['items'][i]['name'],
                              'artist':output_raw['tracks']['items'][i]['artists'][0]['name'],
                              'id': output_raw['tracks']['items'][i]['id'], 
                              'image':output_raw['tracks']['items'][i]['album']['images'][0]['url']})
  return output

def search(IDsarray):
    output_raw = sp.tracks(IDsarray)
    output = {'songs':[]}

    for i in range(len(output_raw['tracks'])):
      output["songs"].append({'title': output_raw['tracks'][i]['name'],
                              'artist': output_raw['tracks'][i]['artists'][0]['name'], 
                              'id': output_raw['tracks'][i]['id'], 
                              'image': output_raw['tracks'][i]['album']['images'][0]['url']})
    
    return output

def predict(songIDs):
  return search(findSimilarSongs(songIDs))


def searchbyID(ID):
  for i in range(len(full_data)):
    if full_data.iloc[i,5] == ID:
      return i
  return -1

app = Flask(__name__)
CORS(app)

@app.route('/getSearchResults/', methods=['POST'])
def print_request():
    return jsonify(searchInDatabase(request.json["title"]))

@app.route('/search/', methods=['POST'])
def search_request():
  print(request.json)
  return jsonify(search(request.json["songs"]))

@app.route('/predict/', methods=['POST'])
def predict_from_id():
  return jsonify(predict(request.json["songs"]))