from flask import Flask
from app.routes.user_routes import user_bp
from app.routes.health_routes import health_bp
from app.routes.anomaly_routes import anomaly_bp
from app.routes.default_routes import default_bp

def create_app():
    app = Flask(__name__)

    # Enregistrez les blueprints
    app.register_blueprint(default_bp) 
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(health_bp, url_prefix="/api/health")
    app.register_blueprint(anomaly_bp, url_prefix="/api/anomalies")

    return app
