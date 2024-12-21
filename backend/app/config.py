from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/sante_db"
client = MongoClient(MONGO_URI)
db = client['sante_db']


# Collections
users_collection = db['users']
health_data_collection = db['health_data']
anomalies_collection = db['anomalies']
