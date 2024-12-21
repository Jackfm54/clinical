from flask import Blueprint, jsonify

default_bp = Blueprint('default', __name__)

@default_bp.route('/')
def home():
    return jsonify({"message": "Bienvenue sur la plateforme de surveillance de santé !"})

@default_bp.route('/favicon.ico')
def favicon():
    return '', 204  # Réponse vide pour éviter une erreur 404 sur le favicon
