/**
 * @jest-environment jsdom
 */

// Décrit le comportement que l'on souhaite vérifier.
test('Afficher une erreur si le champ prénom est vide', function () {
    // Crée le formulaire dans le document simulé par jsdom.
    // Le champ prénom est vide puisqu'on ne lui donne aucune valeur.
    document.body.innerHTML = `<form id="prenom-form">
                    <label for="prenom">Votre prénom</label>

                    <input
                        type="text"
                        id="prenom"
                        name="prenom"
                    >                        
                    

                    <p id="erreur"></p>

                    <button type="submit">
                        Voir la liste des tâches
                    </button>
                </form>`

    // Charge le script du site, qui écoute l'envoi du formulaire.
    require('../script.js');

    const formulaire = document.getElementById('prenom-form');

    // Simule l'envoi du formulaire.
    // bubbles : permet à l'événement de remonter vers les éléments parents.
    // cancelable : permet au script d'appeler preventDefault().
    formulaire.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    // Récupère l'élément dans lequel le script affiche l'erreur.
    const erreur = document.getElementById('erreur');

    // Vérifie que le message affiché correspond exactement au texte attendu.
    expect(erreur.textContent).toBe("Veuillez remplir le champ prénom.");
})

test('Enregistrer le prénom et effacer l’erreur quand le champ est rempli', function () {
    document.body.innerHTML =
    `<form id="prenom-form">
                    <label for="prenom">Votre prénom</label>

                    <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value="Alice"
                    >                        
                    

                    <p id="erreur">Veuillez remplir le champ prénom.</p>

                    <button type="submit">
                        Voir la liste des tâches
                    </button>
                </form>`
// Vide le stockage pour commencer le test sans prénom enregistré.
localStorage.clear();

// Recharge le script pour qu'il écoute le nouveau formulaire.
jest.resetModules();
require('../script.js');
// Récupère le formulaire.
const formulaire = document.getElementById('prenom-form');

// Simule son envoi avec le prénom Alice.
formulaire.dispatchEvent(new Event('submit', {
    bubbles: true,
    cancelable: true
}));

// Vérifie que le prénom a été enregistré dans le stockage.
expect(localStorage.getItem('prenom')).toBe('Alice');
// Récupère l'élément qui affiche le message d'erreur.
const erreur = document.getElementById('erreur');

// Vérifie que l'ancien message d'erreur a été effacé.
expect(erreur.textContent).toBe('');
});