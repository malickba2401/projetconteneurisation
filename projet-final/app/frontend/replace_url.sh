#!/bin/sh
# Ce script s'exécute automatiquement via Nginx (/docker-entrypoint.d/)
# Il va chercher la variable d'environnement BACKEND_URL et la placer dans la conf Nginx.
if [ -n "$BACKEND_URL" ]; then
    sed "s|__BACKEND_URL__|${BACKEND_URL}|g" /usr/share/nginx/html/default.conf > /etc/nginx/conf.d/default.conf
    echo "URL Backend configurée : $BACKEND_URL"
else
    echo "Attention : BACKEND_URL non définie. Utilisation de la configuration par défaut."
    cp /usr/share/nginx/html/default.conf /etc/nginx/conf.d/default.conf
fi
