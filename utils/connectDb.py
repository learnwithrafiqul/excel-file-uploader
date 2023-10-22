# from pymongo import MongoClient


# client = MongoClient('localhost', 27017)

# db = client.flask_db
# todos = db.todos



from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://faceauth_admin:faceauth_12345_admin@faceauth.piifyij.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)



# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    db = client.read_excel
    collection = db.products

    insert_one = collection.insert_one({
        "name": "Product 1",
        "price": 1000
    })
    print(insert_one.inserted_id)


    data = list(collection.find({}))
    print(data)
except Exception as e:
    print(e)