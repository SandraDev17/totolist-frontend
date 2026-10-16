const prenom = localStorage.getItem("prenom");
const bonjour = document.getElementById("bonjour");
const listeTaches = document.getElementById("liste-taches");
const champTache = document.getElementById("nouvelle-tache");
const buttonAjout = document.getElementById("buton-ajout");
const formulaire = document.getElementById("tache-form");
const titreAjout = document.getElementById("titre-ajout");


let idTacheModifier = null;

bonjour.textContent = "Bonjour " + prenom + "!";

// Récupérer les tâches du serveur et les afficher dans la page
function chargerTaches() { 

    fetch("https://totolist-backend-five.vercel.app/todos/")
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (todos) {
            const taches = todos[0].todolist;
            // Vider la liste avant de la recharger
            listeTaches.innerHTML = ''; 
            // Construire une carte pour chaque tâche : titre, statut et bouton
            for (let i = 0; i < taches.length; i++) { 
                const tacheItem = document.createElement("div");
                const titre = document.createElement('h3');
                tacheItem.appendChild(titre);
                titre.textContent = taches[i].text;
                tacheItem.classList.add('tache');                

                const tacheComplete = document.createElement("div");
                tacheComplete.classList.add('statut');


                if (taches[i].is_complete === true) {
                    
                    tacheComplete.textContent = "Terminée";
                    tacheComplete.classList.add('terminee');
                    tacheItem.classList.add('terminee');
                } else {
                    tacheComplete.textContent = "À faire";
                }
                tacheItem.appendChild(tacheComplete);
                listeTaches.appendChild(tacheItem);


                const buttonModifier = document.createElement('button');
                buttonModifier.textContent = 'Modifier';
                tacheItem.appendChild(buttonModifier);
                 // Remplir le formulaire avec la tâche choisie pour la modifier
                buttonModifier.addEventListener('click', function () {
                    champTache.value = taches[i].text;
                    buttonAjout.textContent = 'Modifier';
                    idTacheModifier = taches[i].id;                    
                    titreAjout.textContent = "Modifier la tâche";

                
                })

                const buttonDetails = document.createElement('button');
                buttonDetails.textContent = 'Détails'; 
                tacheItem.appendChild(buttonDetails);
                buttonDetails.addEventListener('click', function() {
                    window.location.href = 'details.html?id=' + taches[i].id;
                })

            }
        })
    }

    // Afficher les tâches à l'ouverture de la page
    chargerTaches(); 

    //Quand le formulaire est envoyé : ajouter ou modifier une tâche sur le serveur
    formulaire.addEventListener('submit', function (event) { 
        event.preventDefault();
        //récupère le texte saisi au moment de l'envoi du formulaire
        const texteTache = champTache.value;
       





        fetch("https://totolist-backend-five.vercel.app/todos/" + (idTacheModifier ? '/' + idTacheModifier : ''), {
            method: idTacheModifier ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: texteTache })
        })
            .then(data => data.json())
            .then(task => {
                console.log(task);
                // Actualiser les cartes après l'enregistrement
                chargerTaches(); 
                //vider le champ de saisie après l'ajout
                champTache.value = ''; 
                //réinitialiser l'id de la tâche à modifier
                idTacheModifier = ''; 
                buttonAjout.textContent = 'Ajouter';
                titreAjout.textContent = "Ajouter une tâche";
            })
    })
            