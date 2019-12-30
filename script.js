const map = document.querySelector('#map');

//Sidebar toggle button 
const sidebarButton = document.querySelector('button');
const sidebarButtonImg = document.querySelector('img');
const sidebar = document.querySelector('.sidebar');

//Flag for knowing whether the navbar is collapsed or not.
let isCollapsed = false;

//Reposition navBar on load and resize
window.addEventListener('resize',positionNavBar,displayMap);
window.addEventListener('load',positionNavBar);
window.addEventListener('resize',displayMap);
window.addEventListener('load',displayMap);

function positionNavBar() {
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
    sidebarButton.style.transform = `translateY(-${sidebar.offsetHeight}px) rotate(180deg)`:
    sidebarButton.style.transform = `translateY(0px)`;

  isCollapsed = !isCollapsed;
}

//Mapbox API

function displayMap(){
  const mapContainer = document.querySelector('main');
  const mapHeight = mapContainer.offsetHeight;
  const mapWidth = mapContainer.offsetWidth;
  

  const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxveXNiIiwiYSI6ImNrM3cyaTJ1djBzMWszbW8zNTVma3U3NmUifQ.GyO4d7eDbifBiwjwFaVOlg';
  
  //MAP DATA

  const LONG = 152.9333;
  const LAT = -26.9000;
  const ZOOM = 11;

  function makeOverlayQuery(){
    return getMountainsData()
      .map((mount,idx) => `pin-s-${idx+1}(${mount.long},${mount.lat})`)
      .join(',')
  } 

  let overlay = makeOverlayQuery();

  fetch (`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${overlay}/${LONG},${LAT},${ZOOM}/${mapWidth}x${mapHeight}@2x?access_token=${MAPBOX_TOKEN}`)
    .then(res => map.src = res.url)
    .catch(err => console.log(err))
    .then(console.log(mapWidth,mapHeight))
}

function getMountainsData(){
      //MARKERS DATA
    let beerburrum = {};
      beerburrum.name = 'Beerburrum';
      beerburrum.lat = -26.9581;
      beerburrum.long = 152.9518;
    let beerwah = {};
      beerwah.name = 'Beerwah';
      beerwah.lat = -26.9000;
      beerwah.long = 152.8833;
    let tibrogargan = {};
      tibrogargan.name = 'Tibrogargan';
      tibrogargan.lat = -26.9333;
      tibrogargan.long = 152.9500;
    let coonowrin = {};
      coonowrin.name = 'Coonowrin';
      coonowrin.lat = -26.9000;
      coonowrin.long = 152.9167;
    let ngungun = {};
      ngungun.name = 'Ngungun';
      ngungun.lat = -26.9000;
      ngungun.long = 152.9333;

    let mountsArr = [beerburrum,beerwah,tibrogargan,coonowrin,ngungun];
    return mountsArr;
}

//FILTER ON SEARCH

const searchInput = document.querySelector('#searchbox');
const landmarks = document.querySelectorAll('li');
const list = document.querySelector('ul');

// Make the list

function makeMountainsList(){
  list.innerHTML = getMountainsData()
    .map((mount,idx) => `<li>${idx+1} - ${mount.name}</li>`)
    .join('')
  };

makeMountainsList();

// Make an array out of the landmarks list
const landmarksArr = [...landmarks]
                        .map(landmark => landmark.innerHTML)

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