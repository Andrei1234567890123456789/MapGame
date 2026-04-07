//UI
let sideMenu = document.getElementById('side-menu');
let sideMenuOpen = false;
let container = document.getElementById('side-menu-container');

let bottomMenu = document.getElementById('bottom-menu');
let bottomContainer = document.getElementById('bottom-menu-container');
let bottomMenuClose = document.getElementById('bottom-menu-close');
let bottomMenuOpen = false;
let viewOffset = 0;

let isMobile = window.innerWidth <= 800;

function manageUi(){
    manageBottomMenu();
    manageSideMenu();
}

function manageBottomMenu(){
    bottomMenuClose.onclick = closeBottomMenu;
}
function closeBottomMenu(){
    bottomMenu.style.zIndex = 0;
    bottomContainer.innerHTML = '';
    bottomMenuOpen = false;
    viewOffset = 0;
    map.setView([currentLatitude-viewOffset, currentLongitude], 15);

}

async function openBottomMenu(child){
    if(bottomMenuOpen) {
        closeBottomMenu();
    }
    bottomMenuOpen = true;
    viewOffset = 0.005;

    map.setView([currentLatitude-viewOffset, currentLongitude], 15);
    bottomMenu.style.zIndex = 1000;
    bottomContainer.appendChild(child);

    let containerShift = 100;
    bottomMenu.style.top = (containerShift + 40) + '%';
    for(let i = 0; i < 100; i++){
        containerShift --;
        bottomMenu.style.top = (containerShift + 40) + '%';
        await delay(5);
    }

}

function manageSideMenu(){
    const closeBtn = document.getElementById('side-menu-close');
    closeBtn.onclick = closeSideMenu;

}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function openSideMenu(child){
    if(sideMenuOpen){
        closeSideMenu();
    }
    sideMenuOpen = true;
    let containerShift = -100;
    sideMenu.style.left = containerShift+'%';
    container.appendChild(child);
    sideMenu.style.zIndex = 1000;
    for(let i = 0; i < 100; i++){
        containerShift++;
        sideMenu.style.left = containerShift+'%';
        await delay(5);
    }
    sideMenu.style.left = '2.5%';
}

function closeSideMenu() {
    console.log("menu closed");
    sideMenu.style.zIndex = 0;
    container.innerHTML = "";
    sideMenuOpen = false;
}

async function showPopupMenu(landmark) {
    if(landmark.audio == null) await landmark.loadAudio();
    if(landmark.image == null) await landmark.loadImage();
    
    landmark.audio.play();

    const content = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = landmark.title;

    const status = document.createElement("p");
    status.textContent = "Status: " + landmark.status;

    const image = document.createElement("img");
    image.src = landmark.image;
    image.style.width = "80%";
    image.style.height = "auto";

    const description = document.createElement("p");
    description.textContent = landmark.description;

    content.appendChild(title);
    content.appendChild(status); 
    content.appendChild(image);
    content.appendChild(description);

    if(isMobile){
        openBottomMenu(content);
    }else{
        openSideMenu(content);
    }
}		