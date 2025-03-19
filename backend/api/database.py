import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('heyhi-ai-firebase-adminsdk-eztb2-6b8861fe93.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
