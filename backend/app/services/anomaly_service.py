def detect_anomalies(data):
    heart_rate = data.get('heart_rate')
    blood_pressure = data.get('blood_pressure')

    anomalies = []
    if heart_rate > 100 or heart_rate < 60:
        anomalies.append("Abnormal heart rate detected.")
    if blood_pressure['systolic'] > 140 or blood_pressure['diastolic'] > 90:
        anomalies.append("High blood pressure detected.")

    return {
        "anomalies": anomalies,
        "message": "Anomalies detection complete."
    }
