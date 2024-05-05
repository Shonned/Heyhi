import firebase_admin
from firebase_admin import credentials, db, firestore

cred = credentials.Certificate("./heyhi-ai-firebase-adminsdk-eztb2-eae73c83e4.json")
firebase_admin.initialize_app(cred)

db = firestore.client()