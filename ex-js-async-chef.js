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

    let infoChef
    try {
        infoChef = await fetchJson(`https://dummyjson.com/users/${recipe.userId}`);
    } catch (error) {
        throw new Error(`ERROR: can't catch Chef birthday with id ${recipe.userId} `)
    }
    if (infoChef.message) {
        throw new Error(infoChef.message)
    }


    return infoChef.birthDate
}

(async () => {
    try {
        const birthday = await getChefbirthday(1);
        console.log("Data di nascita dello chef:", dayjs(birthday).format('DD/MM/YYYY'))
    } catch (error) {
        console.error(error);

    }

})();