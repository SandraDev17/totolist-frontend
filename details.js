
// Lire les paramètres présents dans l’adresse de la page
const params = new URLSearchParams(window.location.search);
// Récupérer l’identifiant de la tâche dans l’adresse
const idTache = params.get('id');
// Récupérer le titre et le paragraphe de statut dans le HTML
const titreTache = document.getElementById('titreTache');
const statutElement = document.getElementById('statutElement');
const buttonTerminer = document.getElementById('buttonTerminer')
const buttonReouvrir = document.getElementById('reouvrirTache');
const buttonSupprimer = document.getElementById('supprimer');
const dateCreation = document.getElementById('dateCreation');
const tagsEtiquette = document.getElementById('tags');
const couleurStatut = document.querySelector('.tache-details');


// Demander au serveur les données de cette tâche
fetch('https://totolist-backend-five.vercel.app/todos/' + idTache)
    .then(function (reponse) {
        // Lire les données JSON de la réponse
        return reponse.json();
    })
    .then(function (tache) {
        // Voir les données de la tâche dans la console
        console.log(tache);
        // Afficher le nom de la tâche dans le titre
        titreTache.textContent = tache.text;
        //transforme le texte reçu du serveur en objet Date
const date = new Date(tache.created_at);
        // Afficher la date au format français : jour/mois/année + un texte
        dateCreation.textContent = "Tâche créée le " + date.toLocaleDateString("fr-FR");
        //Afficher les étiquettes seulement si elles existent
        if (tache.Tags) {
          // Afficher les étiquettes en les séparant par un tiret               
        tagsEtiquette.textContent = tache.Tags.join(' - ');
        
        }
        
        
        

        // Vérifier si la tâche est terminée
        if (tache.is_complete === true) {
            couleurStatut.classList.add('terminee');
            statutElement.textContent = 'Terminée'
            // Afficher le statut « À faire »
        } else {
            statutElement.textContent = 'À faire'
        }
    })

buttonTerminer.addEventListener('click', () => {
    fetch('https://totolist-backend-five.vercel.app/todos/' + idTache, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_complete: true })
    })
        .then(function (reponse) {
            return reponse.json();
            
        })
        .then(function (tache) {
            console.log(tache);
            statutElement.textContent = 'Tâche terminée'
            couleurStatut.classList.add('terminee');

        })
})

buttonReouvrir.addEventListener('click', () => {
    fetch('https://totolist-backend-five.vercel.app/todos/' + idTache, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_complete: false })
    })
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (tache) {
            statutElement.textContent = 'À faire'
            console.log(tache);
            couleurStatut.classList.remove('terminee');
        })
})

buttonSupprimer.addEventListener('click', () => {
    // Demander confirmation avant de supprimer
    const confirmDelete = confirm(
        'Supprimer la tâche « ' + titreTache.textContent + ' » ?'
    );

    // Envoyer la suppression seulement si on clique sur OK
    if (confirmDelete) {
        fetch('https://totolist-backend-five.vercel.app/todos/' + idTache, {
            method: 'DELETE'
        })
        .then(function (reponse) {
            // Revenir à la liste si la suppression a réussi
            if (reponse.ok) {
                window.location.href = 'taches.html';
            }
        });
    }
});

