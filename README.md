# Exo "Ajax avec des API"

## Objectifs

- apprivoiser les requêtes HTTP effectuées avec JavaScript (XmlHttpRequest)
- comprendre le concept « Ajax »
- pratiquer dans un cas concret les requêtes XHR

## Concepts

### Pour le rendu _initial_

#### Actuellement (sans Ajax)

1. **Client :** demande une page
2. _requête HTTP_
3. **Serveur HTTP :** réceptionne la requête HTTP
4. **Code applicatif :** script(s) PHP calcule le HTML de réponse
6. _réponse HTTP_
7. **Client :** affiche un rendu

![](content/client-serveur.png)

#### Avec Ajax

1. **Client :** demande une page
2. _requête HTTP_
3. **Serveur HTTP :** réceptionne la requête HTTP
4. **Code applicatif :** script(s) PHP calcule le HTML de réponse
6. _réponse HTTP_
7. **Client :** récupère la réponse & affiche un rendu

![](content/client-serveur.png)

=> **aucune différence pour le chargement initial de la page !**

### Pour les rendus _ultérieurs_

#### Actuellement (sans Ajax)

Ben, la page ne change pas, en fait 🙈

#### Avec Ajax

:thinking: **SANS RECHARGER la page** :thinking:

1. **Sur la page :** action utilisateur (event JS) => objet XHR modélisant la requête HTTP
3. _envoi de la requête HTTP_
4. **Serveur HTTP :** réceptionne la requête HTTP
5. **Code applicatif :** script(s) PHP (ou autre) calcul le JSON/XML de réponse
6. _réponse HTTP_
7. **Sur la page :** JS récupère la réponse & modifie le DOM => impact sur le rendu HTML :tada:

![](content/ajax_request.png)

## Exemple de code JS pour une requête Ajax avec `fetch()`

- [[MDN] Doc de `fetch`](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
- [[MDN] Guide d'utilisation de `fetch`](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)

`fetch` est une fonction native des navigateurs récents, qui permet de faire des requêtes Ajax sans avoir à écrire du code compliqué avec `XMLHttpRequest`.

En pratique, tout appel Ajax / requête HTTP / requête XHR aura le même code de base. Le code utilisant `fetch` est un peu plus léger et lisible.

On changera essentiellement, selon les besoins :

- la méthode HTTP
- l'URL de la requête HTTP
- le traitement à faire une fois les données reçues au format JSON

```js
/**
 * Options de la future requête HTTP
 */
let fetchOptions = {
  // --- Toujours défini :

  // La méthode HTTP (GET, POST, etc.)
  method: 'GET',

  // --- Bonus (exemples) :

  // On utilisera souvent Cross Origin Resource Sharing qui apporte
  // une sécurité pour les requêtes HTTP effectuée avec XHR entre 2
  // domaines différents.
  mode: 'cors',
  // Veut-on que la réponse puisse être mise en cache par le navigateur ?
  // Non durant le développement, oui en production.
  cache: 'no-cache'
  
  // Si on veut envoyer des données avec la requête => décommenter et remplacer data par le tableau de données
  // , body : JSON.stringify(data)
};


/**
 * La fonction native fetch() permet de lancer une requête HTTP depuis JS.
 *
 * Dans DevTools > onglet "Network", on pourra voir cette requête avec le
 * filtre "XHR".
 *
 * Arguments de fetch() :
 * 1. l'URL à laquelle on veut accéder
 * 2. les options de cette requête HTTP
 */
request = fetch('http://www.domaine.tld/endpoint', fetchOptions);
// La requête vient d'être envoyée !

// On n'a pas encore la réponse, mais on se prépare déjà à la recevoir.
// Une fois la réponse reçue, la fonction de callback précisée en argument
// sera automatiquement appelée.
request.then(
  // Cette fonction de callback est définie directement "à la volée" => fonction anonyme.
  // Elle recevra en argument la réponse brute provenant du serveur.
  function(response) {
    // On sait que la réponse est au format JSON (JavaScript Object Notation),
    // donc on transforme la réponse : conversion texte => objet JS
    return response.json();
  }
)

// On peut enchaîner les fonctions de traitement de la réponse.
.then(
  // Celle-ci étant chaînée à la précédente, elle recevra en argument la réponse
  // précédemment convertie en objet JS.
  function(jsonResponse) {
    // Désormais, on a accès aux données facilement et on peut travailler avec :
    console.log(jsonResponse);

    // TODO, utiliser ces données pour modifier la page, afficher les données, etc.
  }
);
```

## Exo

On va **consommer** une API parmi la liste suivante :

- https://swapi.dev/ : énormément de données sur l'univers Star Wars
- https://anapioficeandfire.com/ : énormément de données sur l'univers Ice and Fire (Game of Thrones)
- https://api.chucknorris.io/ : des centaines de faits (réels ou non ?) à propos de Chuck Norris

Chacune de ces APIs fournit une documentation permettant de connaître les _Endpoints_ disponibles, et leurs contenus/actions.

### Analyse

Choisissez une API, et analysez les ressources disponibles afin de répondre à ces questions.

---

<details><summary>Star Wars API</summary>

<details><summary>Quelle est l'URL de base de cette API ? (hors <em>endpoints</em>)</summary>

`https://swapi.dev/api`

:warning: attention lors des requêtes à l'API, il faudra bien utiliser http**s**:// même si la doc ne le précise pas forcément (sinon, réponses 301 _Moved Permanently_)

</details>

<details><summary>Quel <em>endpoint</em> permet d'avoir la liste de tous les personnages ?</summary>

`/people/`

Source : https://swapi.dev/documentation#people

:warning: attention à ne pas oublier / de fin :warning:

</details>
<details><summary>Quel <em>endpoint</em> permet d'avoir le véhicule "Sand Crawler" ?</summary>

`/vehicles/4/`

Source : https://swapi.dev/documentation#vehicles

On peut imaginer que ce véhicule possède l'id 4 dans une table `vehicles`. Mais en fait, on n'en sait rien, car on n'a pas accès à la base de données qui se cache derrière l'API qu'on consomme.

</details>

</details>

---

<details><summary>Ice and Fire API</summary>

<details><summary>Quelle est l'URL de base de cette API ? (hors <em>endpoints</em>)</summary>

`https://anapioficeandfire.com/api`

:warning: attention lors des requêtes à l'API, il faudra bien utiliser http**s**:// même si la doc ne le précise pas forcément (sinon, réponses 301 _Moved Permanently_)

</details>

<details><summary>Quel <em>endpoint</em> permet d'avoir la liste de tous les personnages ?</summary>

`/characters`

Source : https://anapioficeandfire.com/Documentation#characters

:warning: attention à ne pas mettre de / de fin :warning:

</details>
<details><summary>Quel <em>endpoint</em> permet d'avoir la maison "House Allyrion of Godsgrace" ?</summary>

`/houses/2`

Source : https://anapioficeandfire.com/Documentation#houses

On peut imaginer que cette maison possède l'id 2 dans une table `houses`. Mais en fait, on n'en sait rien, car on n'a pas accès à la base de données qui se cache derrière l'API qu'on consomme.

</details>

</details>

---

<details><summary>Chuck Norris API</summary>

<details><summary>Quelle est l'URL de base de cette API ? (hors <em>endpoints</em>)</summary>

`https://api.chucknorris.io/`

</details>

<details><summary>Quel <em>endpoint</em> permet d'avoir la liste de toutes les catégories de "Chuck Norris facts" ?</summary>

`/jokes/categories`

Source : https://api.chucknorris.io/

</details>
<details><summary>Quel <em>endpoint</em> permet d'avoir un "Chuck Norris fact" au hasard de la catégorie <em>dev</em> ?</summary>

`/jokes/random?category=dev`

Source : https://api.chucknorris.io/

</details>

</details>

---

### Instructions

---

<details><summary>Star Wars API</summary>

- récupérer le nom du personnage ayant l'id 10
- afficher ce nom dans la console
- récupérer le nom des 10 premiers vaisseaux
- afficher ces noms dans la console

</details>

---

<details><summary>Ice and Fire API</summary>

- récupérer le nom du personnage ayant l'id 271
- afficher ce nom dans la console
- récupérer le nom des 10 premières maisons
- afficher ces noms dans la console

</details>

---

<details><summary>Chuck Norris API</summary>

- récupérer un "Chuck Norris fact" contenant le mot _"optimizes"_
- afficher ce "Chuck Norris fact" dans la console
- récupérer la liste des catégories de "Chuck Norris facts"
- afficher ces catégories dans la console

</details>

---

## Bonus

<details><summary>Sûr(e) ?</summary>

- modifier le DOM pour afficher ces noms dans la `div#content`
- :sunglasses:

</details>

## Mega Bonus

<details><summary>Non, mais il ne faudrait pas abuser non plus...</summary>

- s'amuser à récupérer les informations des 3 APIs fournies
- s'amuser à récupérer les informations d'autres API
  - sur [les jeux vidéos](https://www.giantbomb.com/api/) (il faudra s'inscrire et utiliser une clé d'API)
  - sur [les Pokémons](https://pokeapi.co/)
  - sur [la NBA](https://www.balldontlie.io)
  - sur [le football](https://www.football-data.org/documentation/quickstart)
  - et même une avec des [données fictives](https://jsonplaceholder.typicode.com/) pour s'entraîner
- tu l'auras compris, il y a _beaucoup_ d'API. Sans parler de celles qu'on va créer ^^
- il y a de quoi nous rendre... heureux :joy:

</details>
