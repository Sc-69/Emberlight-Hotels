window.onload = () => {

    let unselected = document.getElementById("hotels");
    let dropdown = document.getElementById("dropdown-1");
    let overlay = document.getElementById("menu-overlay")
    let navbar = document.getElementById("nav-wrapper");

    unselected.onclick = () => {
        if(unselected.id === "hotels")
        {
            unselected.id = "hotels-selected";
            dropdown.style.display = "flex";
            overlay.id = "menu-overlay-on";
            navbar.style.zIndex=3;

        } else {
            unselected.id="hotels";
            dropdown.style.display = "none";
            overlay.id = "";
            navbar.style.zIndex=0;
        }
    }
    overlay.onclick = () => {
    overlay.id = "";
    unselected.id="hotels";
    dropdown.style.display = "none";
    }   
};