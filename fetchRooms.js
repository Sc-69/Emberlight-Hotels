const fetchRooms = async () => {

    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    if(response.status === 200){
        const data = await response.json();
        return data;
    } else {
        throw new Error("Could not fetch data");
    }
}


let roomsdiv = document.querySelector(".rooms");

fetchRooms()
    .then((data)=>{
        console.log(data);
        for(i=0; i <5; i++){
            let li = document.createElement("li")
            roomsdiv.appendChild(li);
            li.innerHTML += `<img src=${data[i].thumbnailUrl}>`;
        }
    }).catch(err =>{
        console.log(err);
    })



