// start by creating data so we don't have to type it in each time
let bookArray = [];

// define a constructor to create movie objects
let bookObject = function (pName, pAuthor, pSnb,pYear) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.Name = pName;
    this.Author = pAuthor;
    this.Snb = pSnb;  // action  comedy  drama  horrow scifi  musical  western
    this.Year = pYear;
}


bookArray.push(new bookObject ("Moonstruck", 1981, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
bookArray.push(new bookObject ("Wild At Heart", 1982, "Drama", "Nicholas Cage", "Laura VanDern", "https://www.youtube.com/watch?v=7uRJartX79Q"));
bookArray.push(new bookObject ("Raising Arizona", 1983, "Comedy", "Nicholas Cage", "Holly Hunter", "https://www.youtube.com/watch?v=NoXJKArYi1g"));
// bookArray.push(new bookObject ("USS Indianapolis: Men of Courage", 2016, "Drama", "Nicholas Cage", "Emily Tennant", "https://youtu.be/ZDPE-NronKk"));
// bookArray.push(new bookObject ("Venusstruck", 1983, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
// bookArray.push(new bookObject ("Marsstruck", 1984, "Comedy", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
// bookArray.push(new bookObject ("Jupiterstruck", 1985, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
// bookArray.push(new bookObject ("Saturnstruck", 1986, "Comedy", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));



let selectedGenre = "not selected";

document.addEventListener("DOMContentLoaded", function () {

    createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        bookArray.push(new bookObject (document.getElementById("name").value, document.getElementById("author").value,
            selectedGenre, document.getElementById("snb").value, document.getElementById("year").value));
        document.location.href = "index.html#ListAll";
        // also add the URL value
    });
    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("name").value = "";
        document.getElementById("author").value = "";
        document.getElementById("snb").value = "";
        document.getElementById("year").value = "";
        // document.getElementById("URL").value = "";
    });

    $(document).bind("change", "#select-genre", function (event, ui) {
        selectedGenre = $('#select-genre').val();
    });

    document.getElementById("delete").addEventListener("click", function () {
        deleteMovie(document.getElementById("IDparmHere").innerHTML);
        createList();  // recreate li list after removing one
        document.location.href = "index.html#ListAll";  // go back to movie list 
    });

// 2 sort button event methods
    document.getElementById("buttonSortName").addEventListener("click", function () {
        bookArray.sort(dynamicSort("Name"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonSortSnb").addEventListener("click", function () {
        bookArray.sort(dynamicSort("Snb"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    // button on details page to view the youtube video
    document.getElementById("trailer").addEventListener("click", function () {
        window.open(document.getElementById("oneURL").innerHTML);
    });

    document.getElementById("buttonSubsetComedy").addEventListener("click", function () {
       
        createListSubset("Comedy");  // recreate li list after removing one
        //document.location.href = "index.html#ListSome";  // go back to movie list 
    });

    document.getElementById("buttonSubsetDrama").addEventListener("click", function () {
       
        createListSubset("Drama");  // recreate li list after removing one
        //document.location.href = "index.html#ListSome";  // go back to movie list 
    });
// end of add button events ************************************************************************

  
  
// page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });

    $(document).on("pagebeforeshow", "#ListSome", function (event) {   // have to use jQuery 
        // clear prior data
        var divMovieList = document.getElementById("divMovieListSubset");
        while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
            divMovieList.removeChild(divMovieList.firstChild);
        };
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   // have to use jQuery 
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetArrayPointer(localID);
        document.getElementById("oneName").innerHTML = "The title is: " + movieArray[arrayPointer].Title;
        document.getElementById("oneAuthor").innerHTML = "Year released: " + movieArray[arrayPointer].Year;
        document.getElementById("oneSnb").innerHTML = "Genre: " + movieArray[arrayPointer].Genre;
       
        document.getElementById("oneYear").innerHTML = movieArray[arrayPointer].URL;
    });
 
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************

// next 2 functions could be combined into 1 with a little work
// such as I could pass in a variable which said which divMovieList div it should draw
// to, and if no value is passed in to subset too, I could just include all.

function createList() {
    // clear prior data
    var divMovieList = document.getElementById("divMovieList");
    while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
        divMovieList.removeChild(divMovieList.firstChild);
    };

    var ul= document.createElement('ul');

    bookArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneBook'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = element.ID + ":  " + element.Title + "  " + element.Genre;
        ul.appendChild(li);
    });
    divMovieList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneBook");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and write THIS ID value there
        document.getElementById("IDparmHere").innerHTML = parm;
        // now jump to our page that will use that one item
        console.log(parm);
        document.location.href = "index.html#details";
        });
    });

};



// cycles thru the array to find the array element with a matching ID
function GetArrayPointer(localID) {
    for (let i = 0; i < bookArray.length; i++) {
        if (localID === bookArray[i].ID) {
            return i;
        }
    }
}
  

function createListSubset(whichType) {
    // clear prior data
    var divMovieList = document.getElementById("divMovieListSubset");
    while (divMovieList.firstChild) {    // remove any old data so don't get duplicates
        divMovieList.removeChild(divMovieList.firstChild);
    };

    var ul = document.createElement('ul');

    movieArray.forEach(function (element,) {
        
        if (element.Genre === whichType) {
            // use handy array forEach method
            var li = document.createElement('li');
            // adding a class name to each one as a way of creating a collection
            li.classList.add('oneBook');
            // use the html5 "data-parm" to encode the ID of this particular data object
            // that we are building an li from
            li.setAttribute("data-parm", element.ID);
            li.innerHTML = element.ID + ":  " + element.Name + "  " + element.Snb;
            ul.appendChild(li);
        }
    });
    divMovieList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneBook");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });

};

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}
