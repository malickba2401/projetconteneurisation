# Nginx alpine pour une empreinte très légère
FROM nginx:alpine

# Copie stricte des fichiers HTML/CSS/JS nécessaires (pas de superflu)
COPY index.html style.css script.js default.conf /usr/share/nginx/html/

# Ajout du script d'injection pour traiter la ConfigMap dynamiquement
COPY replace_url.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/replace_url.sh

# Le port 80 est utilisé par défaut par Nginx
EXPOSE 80
