import { useEffect, useState } from "react";

const Home = () => {
  // Créer une entrée nommée cocktails dans un objet "state"
  // avec en valeur par défaut un tableau vide
  // si le composant est rechargé et qu'une valeur existe déjà
  // cocktails récupérera cette valeur et non la valeur par défaut
  const [cocktails, setCocktails] = useState([]);

  // on créé une "fonction anonyme asynchrone auto invoquée"
  // qui va récupérer les cocktails sur l'api
  // quand on les a récupérés, on les stocke dans le state "cocktails"
  // grâce à la fonction "setCocktails"
  // cette fonction provoque le rechargement du composant

  // on appelle cette fonction avec useEffect, qui nous permet
  // de préciser quand cette fonction doit être executée
  // ici on demande à ce qu'elle soit executée qu'une seule fois
  // au premier chargement du composant (grâce au tableau vide en deuxième param)

  useEffect(() => {
    (async () => {
      const cocktailsResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s");
      const cocktailsData = await cocktailsResponse.json();

      setCocktails(cocktailsData.drinks);
    })();
  }, []);

  return (
    <main>
      <h1>Blog cocktails</h1>

      <section>
        {cocktails.length === 0 && <p>Loading...</p>}
        {cocktails.map((cocktail) => (
          <article key={cocktail.idDrink}>
            <h2>{cocktail.strDrink}</h2>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          </article>
        ))}
      </section>
      <button>Charge les cocktails</button>
    </main>
  );
};

export default Home;
