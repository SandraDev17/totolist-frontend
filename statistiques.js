const nbTache = document.getElementById('nbTache');
const nbTacheTerminee = document.getElementById('nbTerminee');
const nbTacheAFaire = document.getElementById('nbAFaire');
const inputListe = document.getElementById('listeAFaire');
const inputGraphique = document.getElementById('monGraphique');

const graphique =
    new Chart(inputGraphique, {
        type: 'doughnut',
        data: {
            labels: [
                'Tâches terminées',
                'Tâches à faire'
            ],
            datasets: [{
                data: [0, 0],
                backgroundColor: [
                    'green',
                    'orange'
                ],

            }]
        },
       });


function chargerStatistiques() {

    fetch("http://totolist-backend-five.vercel.app/todos")
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (todos) {
            console.log(todos);
            //récupère la liste des tâches
            const taches = todos[0].todolist;
            //affiche le nombre de tâches dans le paragraphe nbTache
            nbTache.textContent = taches.length;
            let nombreTerminee = 0;

            for (let i = 0; i < taches.length; i++) {
                if (taches[i].is_complete === true) {
                    nombreTerminee++;

                }

                else {

                }

            }
            const pourcentageTerminees = nombreTerminee * 100 / taches.length;
            //Cela garde un chiffre après la virgule
            console.log(pourcentageTerminees.toFixed(1));
            nbTache.textContent = "Nombre total de tâches : " + taches.length;
            nbTacheTerminee.textContent = "Tâches terminées : " + nombreTerminee;
            nbTacheAFaire.textContent = "Tâches à faire : " + (taches.length - nombreTerminee);

            graphique.data.datasets[0].data = [nombreTerminee, taches.length - nombreTerminee];
            graphique.update();

        });
}


chargerStatistiques();
// Actualiser les statistiques automatiquement toutes les 3 secondes
setInterval(chargerStatistiques, 3000);