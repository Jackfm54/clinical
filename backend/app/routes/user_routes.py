from flask import Blueprint, request, jsonify
from app.config import db
from werkzeug.security import generate_password_hash

# Accès direct à la collection MongoDB
users_collection = db['users']

user_bp = Blueprint('user', __name__)

@user_bp.route('/register', methods=['POST'])
def register_user():
    data = request.json
    user = {
        "name": data['name'],
        "email": data['email'],
        "password": generate_password_hash(data['password']),
        "role": data.get("role", "patient")
    }
    users_collection.insert_one(user)
    return jsonify({"message": "User registered successfully!"}), 201
