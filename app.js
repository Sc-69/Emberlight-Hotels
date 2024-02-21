
    let navbar = document.querySelector("#nav-wrapper");
    let burgermenu = document.querySelector(".menu-icon");
    let dropdown = document.querySelector("#secondary-menu")
    let hotels = document.querySelector("#hotels")

    const burgerMenuToggle = () => {    
            navbar.classList.toggle("on");
    }

        const hotelToggle = () =>{
            if (window.innerWidth < 768){
            dropdown.classList.toggle("on");
            }else {
                dropdown.classList.toggle("desktop-on")
            }
        }


    burgermenu.addEventListener("click", burgerMenuToggle)
    hotels.addEventListener("click", hotelToggle)
    if(window.innerWidth >= 768){
        dropdown.classList.remove("on");
    }
