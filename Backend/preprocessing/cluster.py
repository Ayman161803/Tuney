from array import array
import numpy as np
import pandas as pd
import spotipy
import os

spotify_data = pd.read_csv('./data.csv.zip')
genre_data = pd.read_csv('./data_by_genres.csv')
data_by_year = pd.read_csv('./data_by_year.csv')

sound_features = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'valence']

print("Clustering genre data.....")
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import warnings
from sklearn.exceptions import DataConversionWarning
warnings.filterwarnings(action='ignore', category=DataConversionWarning)
cluster_pipeline = Pipeline([('scaler', StandardScaler()), ('kmeans', KMeans(n_clusters=10))])
X = genre_data.select_dtypes(np.number)
cluster_pipeline.fit(X.values)
genre_data['cluster'] = cluster_pipeline.predict(X.values)

print("Applying dimensionality reduction....")
from sklearn.manifold import TSNE
tsne_pipeline = Pipeline([('scaler', StandardScaler()), ('tsne', TSNE(n_components=2, verbose=0))])
genre_embedding = tsne_pipeline.fit_transform(X.values)
projection = pd.DataFrame(columns=['x', 'y'], data=genre_embedding)
projection['genres'] = genre_data['genres']
projection['cluster'] = genre_data['cluster']


song_cluster_pipeline = Pipeline([('scaler', StandardScaler()), 
                                  ('kmeans', KMeans(n_clusters=20, 
                                   verbose=0))],verbose=False)
X = spotify_data.select_dtypes(np.number)
number_cols = list(X.columns)
song_cluster_pipeline.fit(X.values)
song_cluster_labels = song_cluster_pipeline.predict(X.values)


from sklearn.decomposition import PCA
pca_pipeline = Pipeline([('scaler', StandardScaler()), ('PCA', PCA(n_components=2))])
song_embedding = pca_pipeline.fit_transform(X)
projection = pd.DataFrame(columns=['x', 'y'], data=song_embedding)
projection['title'] = spotify_data['name']


spotify_data.to_csv("../data/spotify_data_clustered.csv.zip", 
           index=False, 
           compression="zip")