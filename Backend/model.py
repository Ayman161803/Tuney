from array import array
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, scale
import spotipy
import os

spotify_data = pd.read_csv('./data/spotify_data.csv.zip')

print("Fitting standard scaler...")
scaler = StandardScaler()
scaler.fit(spotify_data.select_dtypes(np.number).values)


from spotipy.oauth2 import SpotifyClientCredentials
from collections import defaultdict

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id="d06bf168d6b74b9e80a6a8f9a823486e",
                                                           client_secret="6fb8ee523d8847099ba7589250988968"))


def find_song(name, year):
  

    
    song_data = defaultdict()
    results = sp.search(q= 'track: {} year: {}'.format(name, year), type="track", limit=1)
    if results['tracks']['items'] == []:
        return None

    results = results['tracks']['items'][0]

    track_id = results['id']
    audio_features = sp.audio_features(track_id)[0]
    
    song_data['name'] = [name]
    song_data['year'] = [year]
    song_data['explicit'] = [int(results['explicit'])]
    song_data['duration_ms'] = [results['duration_ms']]
    song_data['popularity'] = [results['popularity']]
    
    for key, value in audio_features.items():
        song_data[key] = value
    
    return pd.DataFrame(song_data)


from collections import defaultdict
from scipy.spatial.distance import cdist
import difflib

number_cols = ['valence', 'year', 'acousticness', 'danceability', 'duration_ms', 'energy', 'explicit',
 'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'popularity', 'speechiness', 'tempo']

def get_song_data(song, spotify_data):

    
    try:
        song_data = spotify_data[(spotify_data['name'] == song['name']) 
                                & (spotify_data['year'] == song['year'])].iloc[0]
        return song_data
    
    except IndexError:
        return find_song(song['name'], song['year'])


def get_mean_vector(song_list, spotify_data):

    
    song_vectors = []
    
    for song in song_list:
        song_data = get_song_data(song, spotify_data)
        if song_data is None:
            print('Warning: {} does not exist in Spotify or in database'.format(song['name']))
            continue
        song_vector = song_data[number_cols].values
        song_vectors.append(song_vector)  
    
    song_matrix = np.array(list(song_vectors), dtype= object)
    return np.mean(song_matrix, axis=0)

def flatten_dict_list(dict_list):
   
  
    
    flattened_dict = defaultdict()
    if len(dict_list)<=0: 
        return None
    for key in dict_list[0].keys():
        flattened_dict[key] = []
    
    for dictionary in dict_list:
        for key, value in dictionary.items():
            flattened_dict[key].append(value)
    return flattened_dict


def recommend_songs(song_list, spotify_data, n_songs=10):

    
    metadata_cols = ['name', 'year', 'artists']
    song_dict = flatten_dict_list(song_list)

    if song_dict is None:
        return []
    
    song_center = get_mean_vector(song_list, spotify_data)
    scaled_data = scaler.transform(spotify_data[number_cols].values)
    scaled_song_center = scaler.transform(song_center.reshape(1, -1))
    distances = cdist(scaled_song_center, scaled_data, 'cosine')
    index = list(np.argsort(distances)[:, :n_songs][0])
    
    rec_songs = spotify_data.iloc[index]
    rec_songs = rec_songs[~rec_songs['name'].isin(song_dict['name'])]
    return rec_songs[metadata_cols].to_dict(orient='records')


print("Model completely imported...")

