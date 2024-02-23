/* FETCH DATA */
const fetchRooms = async () => {

    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    if(response.status === 200){
        const data = await response.json();
        return data;
    } else {
        throw new Error("Could not fetch data");
    }
}

/*VARIABLE DECLARATIONS*/ 
let roomsDiv = document.querySelector(".rooms");
let pagesDiv = document.querySelector(".page-container");
let roomAmount = 28;
let currentPage = 1;               
let itemsPerPage = 5;
let imageArray = []; //empty array to store items from API call


/*GENERATING ROOM IMAGES*/ 
const showPage = (rooms, roomsPerPage, div, pageNumber) => {
    div.innerHTML = "";                         //empty HTML so that each time a button is pressed, the previous results are gone
    pageNumber--;                               //reduce page number by one to so that 1st page gets results 0-4 indeces; 2nd page gets 5 to 9th indeces and so on
                                                // rooms.slice(startPos, endPos) is for the first oage slice(0,5); but second value of slice method is not inclusive.

    let startPos = roomsPerPage * pageNumber;
    let endPos = startPos + roomsPerPage;
    let shownItems = rooms.slice(startPos, endPos)

    for (let i = 0; i < shownItems.length; i++) {

        let item = shownItems[i];                   //create different variables for each of the items iterated through the slice;
        let itemDiv = document.createElement("div"); //create as many elements as there are itmes on the page, these will contain the items
        itemDiv.classList.add("room");              //assign a class to stylise them later
        itemDiv.innerHTML = `<img src=${item}>`;    //add the items to the element
        div.appendChild(itemDiv);                   //append the newly created elements to the declared div 
    }
}

//generate buttons
const pageButton = (page) => {                     //the reason i pass the page as an argument is because when i make a for loop for all the pages
                                                    // there will be as many buttons generated as there are pages

    let button = document.createElement("button"); //generate a button and give it the value of the page it is on
    button.innerText = page;

    if (currentPage === page) {                     //a way to stylsie the active page. 
        button.classList.add("active");
    }

    button.addEventListener("click", function(){    //clicking a button will change the current page to itself.
    currentPage = page;
    let active_button = document.querySelector(".active");  //when a button is clicked, the active button is found

    if(!button.classList.contains("active")){   //to prevent user from being able to click button agian
        showPage(imageArray, itemsPerPage, roomsDiv, currentPage);
        active_button.classList.remove("active");           //the active button is no longer active
        button.classList.add("active");                     //and the one that is clicked, is.
    }
    })

    return button;                                          
}


const pagination = (wrapper, itemsPerPage) => {

    let pageCount = Math.ceil(roomAmount/itemsPerPage); //ceil the number up to avoid any problems with floating numbers
    for (let i = 1; i < pageCount + 1; i++){            //start the page number with 1 and create as many as needed;
        let buttons = pageButton(i);                    //which creates as many buttons as needed
        wrapper.appendChild(buttons);                   //which are then appended to the pagination wrapper
    }
}


/*Promises*/ 
fetchRooms()
    .then((data)=>{

        for(i=0; i < roomAmount; i++){
            imageArray.push(data[i].thumbnailUrl);  //here I get the thumbnailUrl from jsonplaceholder, and push them into an empty array
        }
        
    }).then(() =>{

        showPage(imageArray, itemsPerPage, roomsDiv, currentPage);

    }).then(()=>{

        pagination(pagesDiv, itemsPerPage)

    }).catch(err =>{
        console.log(err);
        let errorMessage = document.createElement("h1");
        errorMessage.innerText = "There was a problem with the server, cannot load rooms";
        roomsDiv.appendChild(errorMessage);
    })

