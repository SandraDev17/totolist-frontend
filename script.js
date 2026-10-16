const formulaire = document.querySelector('form');
const prenom = document.getElementById('prenom');
const erreur = document.getElementById('erreur');

formulaire.addEventListener('submit', function(event) {
    event.preventDefault();
    if (prenom.value !== "") {
    // Le champ n'est pas vide 
    erreur.textContent = "";
    //efface le message si c’est rempli.
    localStorage.setItem('prenom', prenom.value);
    window.location.href = "taches.html";
}

    else {
        // Le champ est vide
        erreur.textContent = "Veuillez remplir le champ prénom.";
        //affiche le message si c’est vide
    }

});

