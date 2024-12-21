from flask import Blueprint, request, jsonify
from app.models.health_model import health_data_collection
from datetime import datetime

health_bp = Blueprint('health', __name__)

@health_bp.route('/add', methods=['POST'])
def add_health_data():
    data = request.json
    health_record = {
        "user_id": data['user_id'],
        "heart_rate": data['heart_rate'],
        "blood_pressure": data['blood_pressure'],
        "oxygen_level": data['oxygen_level'],
        "timestamp": datetime.utcnow()
    }
    health_data_collection.insert_one(health_record)
    return jsonify({"message": "Health data added successfully!"}), 201
