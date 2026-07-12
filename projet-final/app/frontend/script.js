// Le frontend utilise une route relative /api/ vers Nginx,
// et Nginx proxy_pass le trafic vers le backend Kubernetes.
const backendUrl = "";

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('fetch-btn');
    const resultText = document.getElementById('result-text');
    const visitsCount = document.getElementById('visits-count');
    const resultBox = document.getElementById('result-box');

    // Fonction pour animer le compteur (effet "compteur qui tourne")
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end;
                // Petit effet de pop à la fin
                obj.style.transform = 'scale(1.3)';
                setTimeout(() => obj.style.transform = 'scale(1)', 150);
            }
        };
        window.requestAnimationFrame(step);
    };

    btn.addEventListener('click', async () => {
        try {
            // Indication de chargement visuel
            btn.innerHTML = "Chargement... <span style='font-size: 0.8em'>🔄</span>";
            btn.style.opacity = "0.8";
            btn.disabled = true;
            
            resultText.style.color = 'var(--text-muted)';
            resultText.textContent = "Communication avec l'API...";
            resultBox.style.borderColor = 'rgba(255,255,255,0.2)';

            // Appel HTTP via le proxy Nginx du frontend
            const response = await fetch(`/api/hello`);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Affichage du succès
            resultText.style.color = 'var(--success-color)';
            resultText.textContent = data.message;
            resultBox.style.borderColor = 'var(--success-color)';
            resultBox.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.2)';

            // Mise à jour du compteur avec animation
            if (data.visits && !isNaN(data.visits)) {
                const currentVal = parseInt(visitsCount.innerText) || 0;
                const newVal = parseInt(data.visits);
                animateValue(visitsCount, currentVal, newVal, 800);
            } else if (data.visits) {
                visitsCount.textContent = data.visits;
            }
        } catch (error) {
            console.error("Erreur:", error);
            // Affichage de l'erreur
            resultText.style.color = 'var(--error-color)';
            resultText.textContent = "Erreur de connexion au backend.";
            resultBox.style.borderColor = 'var(--error-color)';
            resultBox.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.2)';
        } finally {
            // Restauration du bouton
            setTimeout(() => {
                btn.innerHTML = "Interroger l'API K8s";
                btn.style.opacity = "1";
                btn.disabled = false;
            }, 500);
        }
    });
});
