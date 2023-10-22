from pymongo import MongoClient

uri = "mongodb+srv://faceauth_admin:faceauth_12345_admin@faceauth.piifyij.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri)
db = client.read_excel
products_collection = db.products