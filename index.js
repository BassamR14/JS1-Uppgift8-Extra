//1
productInput = document.querySelector("#product");
quantityInput = document.querySelector("#product-quantity");
productBtn = document.querySelector(".product-button");
productList = document.querySelector(".product-list");
//not working, why? because of display:flex.
productList.style.listStyleType = "disc";

productBtn.addEventListener("click", buyProduct);

function buyProduct() {
  //the values must be defined inside the function.
  productInputValue = productInput.value;
  quantityInputValue = quantityInput.value;

  let productListItem = document.createElement("li");
  productListItem.classList.add("product-list-item");
  productListItem.innerHTML = ` Product: ${productInputValue} -  Quantity: ${quantityInputValue} `;
  productList.append(productListItem);

  let spanBtns = document.createElement("span");
  spanBtns.classList.add("button-spans");
  productListItem.append(spanBtns);

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "X";
  spanBtns.append(deleteButton);

  function deleteThis() {
    productListItem.remove();
  }

  deleteButton.addEventListener("click", deleteThis);

  let boughtButton = document.createElement("button");
  boughtButton.classList.add("bought-button");
  boughtButton.innerText = "bought";
  spanBtns.append(boughtButton);

  function boughtItem() {
    productListItem.style.textDecorationLine = "line-through";
  }

  boughtButton.addEventListener("click", boughtItem);
}

//2

let movieTitleInput = document.querySelector("#movie-title");
let movieScoreInput = document.querySelector("#movie-score");
let addMovieBtn = document.querySelector(".add-movie");
let movieList = document.querySelector(".movie-list");

addMovieBtn.addEventListener("click", addMovie);

// Alt 1 - normal method + nodelist to array(didn't work for me)
function addMovie() {
  let movieTitleValue = movieTitleInput.value;
  let movieScoreValue = Number(movieScoreInput.value);

  if (movieScoreValue < 0 || movieScoreValue > 10) {
    alert("Score can only be between 0 and 10");
    // to stop function from adding it to the list
    return null;
  }

  if (movieList.childNodes.length < 5) {
    let movieListItem = document.createElement("li");
    movieListItem.classList.add("movie-item");
    movieListItem.innerHTML = ` Movie: ${movieTitleValue} - Score: <span>${movieScoreValue}</span>/10`;
    movieList.append(movieListItem);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "X";
    movieListItem.append(deleteButton);

    function deleteThis() {
      movieListItem.remove();
    }

    deleteButton.addEventListener("click", deleteThis);

    console.log(movieList);

    //sort using movie score
    let nodeList = movieList.querySelectorAll(".movie-item");

    //make an array from the nodelist
    let listArray = Array.from(nodeList);
    //this push would be needed if the movieListItem wasn't appended, since queryselectorall gets the information from DOM. So by pushing it, we are adding it into the array after-the-fact.
    // listArray.push(movieListItem);

    listArray.sort((elementA, elementB) => {
      //Jämför elementA's child spans innertext, med elementBs child spans innertext
      //we need to be able to reach the score value, easiest way is to put it in a span, and call the span innertext.
      return (
        +elementB.querySelector("span").innerText -
        +elementA.querySelector("span").innerText
      );
    });

    listArray.forEach((li) => {
      movieList.append(li);
    });
    console.log(listArray);
  } else {
    alert(
      "Max number of movies reached, delete a movie before adding another."
    );
  }
}

// Alt 2 - using maps
// create a map outside the function.

let movieMap = new Map();

// function addMovie() {
//   const movieTitleValue = movieTitleInput.value;
//   const movieScoreValue = Number(movieScoreInput.value);

//   if (movieScoreValue < 0 || movieScoreValue > 10) {
//     alert("Score can only be between 0 and 10");
//   }

//   if (movieMap.size < 5) {
//     //they key cannot be the same for multiple values, if the key is the same then overwrites the previous input.
//     movieMap.set(movieTitleValue, movieScoreValue);

//     //this sorts by keys, we want values
//     //   movieMap = new Map([...movieMap.entries()].sort((a, b) => a - b));

//     const movieArray = Array.from(movieMap).sort((a, b) => b[1] - a[1]);
//     console.log(movieArray);
//     movieMap = new Map(movieArray);

//     movieList.innerHTML = "";

//     movieMap.forEach((score, movie) => {
//       const movieListItem = document.createElement("li");
//       movieListItem.classList.add("movie-item");
//       movieListItem.innerHTML = `Movie: ${movie} - Score: ${score}/10`;
//       movieList.append(movieListItem);

//       let deleteButton = document.createElement("button");
//       deleteButton.classList.add("delete-button");
//       deleteButton.innerText = "X";
//       movieListItem.append(deleteButton);

//       function deleteThis() {
//         movieListItem.remove();
//         //need to delete the key from the map, or it will come back to haunt me again.
//         movieMap.delete(movie);
//       }

//       deleteButton.addEventListener("click", deleteThis);
//     });
//   } else {
//     alert("too many movies");
//   }
// }
