
const search = document.querySelector(".searchbox");
const submit = document.querySelector(".submit");
const contentbox = document.querySelector(".contentbox");
const sortbtn = document.querySelector(".sortbtn")
const layoutbtn = document.querySelector(".layout")

let books = [];

let visiblebooks = 12;

console.log("working 1 ");

async function fetchbookdetail() // fetch book detail function
{
    try {
        const bookinfo = await fetch("https://api.freeapi.app/api/v1/public/books");
        const data = await bookinfo.json();
        books = data.data.data;
        console.log(books);
        bookdisplay();
        const contentitem = document.querySelectorAll(".content-items");
        console.log(contentitem);
        //add function onclick where more detail display
        contentitem.forEach((item)=>{
            item.addEventListener("click",detailinfo.bind(null,item));
        })
    } catch (error) {
        
    }

    
}

fetchbookdetail(); // fetch book detail function calls 
// display book function
function bookdisplay(){
    
    

    console.log(books.length);
    
    for(i=0;i<books.length;i++){
        console.log("working 2");
        
        let contentitem = document.createElement("div");
        contentitem.classList.add("content-items","flex" ,"flex-col" ,"p-2" , "shadow-[0_35px_35px_rgba(0,0,0,0.25)]", "rounded-2xl");
        contentitem.setAttribute("data-info",books[i].volumeInfo.infoLink)
        contentitem.innerHTML = ` <img class="rounded-2xl" src="${books[i].volumeInfo.imageLinks.thumbnail}" alt="">
           <div class="mt-2">
            <label class="font-bold">Title -  </label>
            <span class="break-words">${books[i].volumeInfo.title}</span> 
            <br>
            <label class="font-bold">Author - </label>
            <span class="break-words">${books[i].volumeInfo.authors}</span>
            <br>
            <label class="font-bold">Publisher - </label>
            <span class="break-words">${books[i].volumeInfo.publisher}</span>
            <br>
            <label class="font-bold">Public Date - </label>
            <span class="break-words">${books[i].volumeInfo.publishedDate}</span>
           </div>`

           contentbox.append(contentitem);

           

    }

    

  
        
    
 
    


}
// more info getting function and also redirect
function detailinfo(item){
    console.log(item);
              window.open(item.getAttribute("data-info"));

}
// function for removing all child 
function removechild(){
    while(contentbox.firstChild){
        contentbox.removeChild(contentbox.firstChild);

    }
}

// function run on when sumit buttion click searching function
submit.addEventListener("click",()=>{
    removechild();
    if(search.value === ""){
        bookdisplay();
        console.log("empty");
        return;
    } 

    
    const result = books.filter((book)=> book.volumeInfo.title === search.value);

    result.forEach((res)=>{
        let contentitem = document.createElement("div");
                contentitem.classList.add("content-items","flex" ,"flex-col" ,"p-2" , "shadow-[0_35px_35px_rgba(0,0,0,0.25)]", "rounded-2xl");
                contentitem.innerHTML = ` <img class="rounded-2xl" src="${res.volumeInfo.imageLinks.thumbnail}" alt="">
                   <div class="mt-2">
                    <label class="font-bold">Title -  </label>
                    <span class="break-words">${res.volumeInfo.title}</span> 
                    <br>
                    <label class="font-bold">Author - </label>
                    <span class="break-words">${res.volumeInfo.authors}</span>
                    <br>
                    <label class="font-bold">Publisher - </label>
                    <span class="break-words">${res.volumeInfo.publisher}</span>
                    <br>
                    <label class="font-bold">Public Date - </label>
                    <span class="break-words">${res.volumeInfo.publishedDate}</span>
                   </div>`
    
                   contentbox.append(contentitem);

    }) 
})


layoutbtn.addEventListener("click", () => {
    const contentitem = document.querySelectorAll(".content-items");

    if (layoutbtn.innerText === "List") {
        // Switch to Grid
        contentbox.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "m-2.5");
        contentbox.classList.remove("flex", "flex-col");

        contentitem.forEach((item) => {
            item.classList.remove("flex", "gap-10","flex-row","border-2");
            item.classList.add("flex-col" ,"p-2","shadow-[0_35px_35px_rgba(0,0,0,0.25)]" )
        });

        layoutbtn.innerText = "Grid";
    } else {
        // Switch to List
        contentbox.classList.remove("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "m-2.5");
        contentbox.classList.add("flex", "flex-col");

        contentitem.forEach((item) => {
            item.classList.remove("flex-col" ,"p-2","shadow-[0_35px_35px_rgba(0,0,0,0.25)]")
            item.classList.add("gap-10","flex","border-2");
            
        });

        layoutbtn.innerText = "List";
    }
});


// sorting by tittle like display by a to z title
sortbtn.addEventListener("click",()=>{
    removechild()
    books.sort((a,b)=>a.volumeInfo.title.localeCompare(b.volumeInfo.title));
    console.log(books);
    bookdisplay();
})

bookdisplay();

console.log(books.length);
console.log(layoutbtn);





