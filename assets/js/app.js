const app = {
    baseUri : "https://www.omdbapi.com/?apikey=a93b767b&",
    fetchOptions: {
        // --- Toujours défini :
      
        // La méthode HTTP (GET, POST, etc.)
        method: 'GET',
      
        // --- Bonus (exemples) :
      
        // On utilisera souvent Cross Origin Resource Sharing qui apporte
        // une sécurité pour les requêtes HTTP effectuée avec XHR entre 2
        // domaines différents.
        mode: 'cors',
        // Veut-on que la réponse puisse être mise en cache par le navigateur ?
        // Non durant le développement, oui en production.
        cache: 'no-cache'
        
        // Si on veut envoyer des données avec la requête
        // généralement dans le cadre de POST, PUT, PATCH
        // => décommenter et remplacer data par le tableau de données
        // , body : JSON.stringify(data)
        /*
        data = {
            key1 : value1,
            key2 : value2
        }
        */
      },
    /**
     * Méthode d'initialisation
     */
    init: function(){
        // je récupère mon bouton, pour lui mettre un écouteur sur le click
        const button = document.getElementById('apiButton');
        button.addEventListener('click', app.handleApiButton);
    },
    /**
     * Methode de gestion du click sur le bouton
     * @param {Event} evt informations de l'évènement
     */
    handleApiButton : function(evt){
        console.log("handle button");
        // pour utiliser OmdbApi, il faut fournir un clé API
        // qui est limité à 1000 requetes par jour (gratuite)
        // a l"exécution de fetch() la requete HTTP est partie !
        fetch(app.baseUri + 't=totoro', app.fetchOptions)
            // quand fetch à finit alors ...
            .then(function(response){
                // on ne passe ici que quand on a reçut la réponse, pas avant
                // c'est du différé //debby
                // on a reçut la réponse de la requete
                console.log("premier then : ");
                console.log(response);
                return response.json();
                // le return me permet d'enchainer un autre .then()
                // qui prend en paramètre le return du premier then()
            })
            // Ici je reçoit la version json de la réponse
            // qui a été construite dans le premier then()
            .then(function(responseJson){
                console.log("deuxième then : ");
                console.log(responseJson);
                // l'objet responseJson a des propriétés que l'on peut utiliser de suite
                document.querySelector('#content').innerText = responseJson.Actors;
                
                // je récupère un UL
                const ulRatings = document.querySelector('#ratings')
                // je parcours un tableau d'objet (responseJson.Ratings)
                for (const rating of responseJson.Ratings) {
                    // je crée un nouvel LI
                    const li = document.createElement('li');
                    li.innerText = rating.Source + " : " + rating.Value;
                    // je le rajoute à mon UL
                    ulRatings.appendChild(li);
                }
                // j'ajoute l'image
                document.querySelector('#poster').setAttribute('src', responseJson.Poster);

            });

        console.log("tagada");
    }
}

document.addEventListener('DOMContentLoaded', app.init);