from flask import Blueprint, request, jsonify
from app.services.anomaly_service import detect_anomalies

anomaly_bp = Blueprint('anomaly', __name__)

@anomaly_bp.route('/detect', methods=['POST'])
def detect():
    data = request.json
    result = detect_anomalies(data)
    return jsonify(result), 200
