const url = 'https://random-user-by-api-ninjas.p.rapidapi.com/v1/randomuser';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '34f54b7ca9mshae462c74aeccbc2p12b2d4jsncf73428f9321',
		'X-RapidAPI-Host': 'random-user-by-api-ninjas.p.rapidapi.com'
	}
};
async function getRandomUsername() {
    // Questa funzione invia una richiesta all'API e restituisce un nome utente casuale
    const response = await fetch(url, options);
    const data = await response.json();
    const username = data.username;
    console.log(username);
    return username;
  }
  
export { getRandomUsername };