//UI
let sideMenu = document.getElementById('side-menu');
let sideMenuOpen = false;
let container = document.getElementById('side-menu-container');

function manageSideManu(){
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
    sideMenuOpen = true;
    for(let i = 0; i < 100; i++){
        containerShift++;
        sideMenu.style.left = containerShift+'%';
        await delay(10);
    }
    sideMenu.style.left = '2.5%';
}

function closeSideMenu() {
    console.log("menu closed");
    sideMenu.style.zIndex = 0;
    container.innerHTML = "";
    sideMenuOpen = false;
}

function showPopupMenu(landmark) {
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

    openSideMenu(content);
}		