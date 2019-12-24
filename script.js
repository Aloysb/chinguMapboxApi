//Sidebar toggle button 
const sidebarButton = document.querySelector('.button-toggle');
const sidebarButtonImg = document.querySelector('img');
const sidebar = document.querySelector('.sidebar');

//Flag for knowing whether the navbar is collapsed or not.
let isCollapsed = false;

//reposition on load
window.addEventListener('load',repositionSidebar);

//reposition on resize
window.addEventListener('resize', repositionSidebar);

function repositionSidebar () {
  //Allow to position the button properly.
  const sidebarHeight = sidebar.offsetHeight;
  const buttonHeight = sidebarButton.offsetHeight;
  sidebarButton.style.top = `${sidebarHeight}px`;
  sidebarButton.addEventListener('click', toggleMenu);
}

function toggleMenu () {
  sidebar.classList.toggle('collapse');
  // sidebarButton.classList.toggle('collapse');

  //'Collapse' of the button
  (!isCollapsed) ?
    sidebarButton.style.transform = `translateY(-${sidebar.offsetHeight}px)`:
    sidebarButton.style.transform = `translateY(0px)`;

  // Rotation of the button img
  (!isCollapsed)?
    sidebarButtonImg.style.transform = `rotate(0deg)`:
    sidebarButtonImg.style.transform = `rotate(-180deg)`;

  
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


//FILTER ON SEARCH

const searchInput = document.querySelector('#searchbox');
const landmarks = document.querySelectorAll('li');
const list = document.querySelector('ul');

// Make an array out of the landmarks list
const landmarksArr = [...landmarks]
                        .map(landmark => landmark.innerHTML)

//
searchInput.addEventListener('input', updateList)

function updateList(e){
  const query = e.target.value.toUpperCase();

  //Filter the landmarks array, use upper case to make it case insensitive.
  //Regexp might be a cleaner option.
  const landmarksArrFiltered = landmarksArr
                                .filter(landmark => landmark.toUpperCase().includes(query));

  // Update list with filtered results
  list.innerHTML = `${landmarksArrFiltered
                        .map(landmark => `<li>${landmark}</li>`)
                        .join('')
                      }`;
}