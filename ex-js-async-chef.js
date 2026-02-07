async function fetchJson(url) { //funzione di supporto per evitare di dover fare 2 await e ci ritorna l`oggetto trasformato in Json
    const res = await fetch(url);
    const obj = await res.json();
    return obj
}

async function getChefbirthday(id) {
    let recipe;

    try {
        recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`); //try/catch per controllare l`id
    } catch (error) {
        throw new Error(`ERROR: can't catch recipe with id ${id} `)
    }

    if (recipe.message) {
        throw new Error(recipe.message)
    }
    const userId = recipe.userId;

    const infoChef = await fetchJson(`https://dummyjson.com/users/${userId}`)
    return infoChef.birthDate
}

(async () => {
    try {
        const birthday = await getChefbirthday(1324234342);
        console.log("Data di nascita dello chef:", birthday)
    } catch (error) {
        console.error(error);

    }

})();