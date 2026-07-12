from flask import Flask, jsonify
from flask_cors import CORS
import os
import redis

app = Flask(__name__)
# Enable CORS for the frontend to communicate with the API
CORS(app)

# Connexion à Redis (via le nom du service K8S)
redis_client = redis.Redis(host='redis-service', port=6379, db=0, decode_responses=True)

@app.route('/api/hello', methods=['GET'])
def hello():
    """Endpoint principal pour le frontend"""
    try:
        # Incrémenter le compteur dans Redis
        count = redis_client.incr('visits')
        return jsonify({
            "message": "Bonjour Kubernetes",
            "visits": count
        })
    except redis.exceptions.ConnectionError:
        # Fallback si Redis n'est pas joignable
        return jsonify({
            "message": "Bonjour Kubernetes",
            "visits": "Indisponible"
        })

@app.route('/api/health', methods=['GET'])
def health():
    """Endpoint utilisé par les sondes Kubernetes (liveness/readiness)"""
    return jsonify({"status": "OK"})

if __name__ == '__main__':
    # Écoute sur toutes les interfaces pour que le conteneur soit accessible
    app.run(host='0.0.0.0', port=5000)
