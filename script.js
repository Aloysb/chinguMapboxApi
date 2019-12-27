//Sidebar toggle button 
const sidebarButton = document.querySelector('#toggleNavbar');
const sidebar = document.querySelector('.sidebar');

//Flag for knowing whether the navbar is collapsed or not.
let isCollapsed = false;

//Reposition navBar on load and resize
window.addEventListener('resize',positionNavBar);
window.addEventListener('load',positionNavBar);

function positionNavBar() {
  //Allow to position the button properly.
  const sidebarHeight = sidebar.offsetHeight;
  const buttonHeight = sidebarButton.offsetHeight;
  sidebarButton.style.top = `${sidebarHeight}px`;
  sidebarButton.addEventListener('click', toggleMenu);
}

function toggleMenu () {
  sidebar.classList.toggle('collapse');

  //'Collapse' of the button
  (!isCollapsed) ?
    sidebarButton.style.transform = `translateY(-${sidebar.offsetHeight}px) rotate(180deg)`:
    sidebarButton.style.transform = `translateY(0px)`;
  isCollapsed = !isCollapsed;
}


//Mapbox GL 
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxveXNiIiwiYSI6ImNrM3cyaTJ1djBzMWszbW8zNTVma3U3NmUifQ.GyO4d7eDbifBiwjwFaVOlg';

mapboxgl.accessToken = MAPBOX_TOKEN

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  //Méribel lont/lag
  center:  [6.5666,45.3968],
  zoom: 15,
});