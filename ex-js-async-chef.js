async function fetchJson(url) { //funzione di supporto per evitare di dover fare 2 await e ci ritorna l`oggetto trasformato in Json
    const res = await fetch(url);
    const obj = await res.json();
    return obj
}

async function getChefbirthday(id) {
    const recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`);
    const userId = recipe.userId;

    const infoChef = await fetchJson(`https://dummyjson.com/users/${userId}`)
    return infoChef.birthDate
}

(async () => {
    try {
        const birthday = await getChefbirthday(1);
        console.log("Data di nascita dello chef:", birthday)
    }
    catch (error) {
        console.error(error);

    }

})();