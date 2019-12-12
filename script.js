const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxveXNiIiwiYSI6ImNrM3cyaTJ1djBzMWszbW8zNTVma3U3NmUifQ.GyO4d7eDbifBiwjwFaVOlg';
const menuButton = document.querySelector('#toggleNavbar');
const menu = document.querySelector('nav');

menuButton.addEventListener('click', toggleMenu);

function toggleMenu () {
  menu.classList.toggle('collapse');
}

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxveXNiIiwiYSI6ImNrM3cyaTJ1djBzMWszbW8zNTVma3U3NmUifQ.GyO4d7eDbifBiwjwFaVOlg';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9'
});