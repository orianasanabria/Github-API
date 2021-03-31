const button = document.getElementById('button');
const inputName = document.getElementById('nombre');
const inputPages = document.getElementById('pagina');
const inputRepos = document.getElementById('repoPagina');

const username = document.getElementById('username')
const photo = document.getElementById('photo')
const twitter = document.getElementById('twitter')
const nRepos = document.getElementById('nRepos')
const localidad = document.getElementById('localidad')

button.addEventListener('click', (e) => {
  e.preventDefault();

  const baseUrl = 'https://api.github.com/users/';

  const request = async (url) => {
    try {
      const result = await fetch(url);
      const response = await result.json();
      return response;
    } catch(error){
      console.log("Ups! Ha ocurrido un error" ,error);
    }
  }

  const getUser = async (user) => {
    const url = `${baseUrl}${user}`
    return request(url);
  }

  const getRepo = async (nPages, nRepos) => {
    const url = `${baseUrl}${user}/repos?page=${nPages}&per_page=${nRepos}`
    return request(url)
  }

  const user = inputName.value;
  const nPages = inputPages.value;
  const nRepos = inputRepos.value;

  Promise.all([getUser(user), getRepo(nPages, nRepos)])
  .then(result => {
    console.log('Resultados: ', result);
    const user = result[0]
    const nombre = user.name;
    const location = user.location;
    const twitterAcc = user.twitter_username;
    const photoUrl = user.avatar_url;
    
    photo.setAttribute('src', photoUrl)
    username.textContent = nombre;
    localidad.textContent = location;
    twitter.textContent = twitterAcc;
  })

})