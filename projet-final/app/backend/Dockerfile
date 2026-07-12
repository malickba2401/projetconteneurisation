# Utilisation de l'image officielle Python allégée
FROM python:3.12-slim

# Création d'un utilisateur non-root pour plus de sécurité (bonne pratique)
RUN useradd -m appuser

# Définition du répertoire de travail
WORKDIR /app

# Copie des dépendances en premier pour bénéficier du cache Docker
COPY requirements.txt .

# Installation sans utiliser de cache pour réduire la taille de l'image finale
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code de l'application
COPY app.py .

# Changement d'utilisateur (bonne pratique de sécurité)
USER appuser

# Exposition du port utilisé par l'application
EXPOSE 5000

# Commande de démarrage du backend
CMD ["python", "app.py"]
