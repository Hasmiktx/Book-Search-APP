const input = document.getElementById("input");
const button = document.getElementById("button");
const page = document.getElementById("page");
const bookZone = document.getElementById("bookZone");
const BASE_URL = "http://openlibrary.org/search.json?q=";
const titleDiv = document.createElement("div");
//const inputBook = input.value.split(" ").join("+");
button.addEventListener("click", pagination);
async function pagination() {
  page.innerHTML = "";
  const inputBook = input.value.split(" ").join("+");
  const response = await fetch(`${BASE_URL}${inputBook}`);
  const object = await response.json();
  console.log(object.numFound);
  if (object.numFound > 1000) {
    object.numFound = 1000;
  }
  for (let i = 1, pageNum = 1; i < object.numFound; i += 100, pageNum++) {
    const pageDiv = document.createElement("div");
    pageDiv.innerHTML = pageNum;
    pageDiv.addEventListener("click", function () {
      getBookName(pageNum);
    });
    page.append(pageDiv);
  }
}

async function getBookName(num) {
  bookZone.innerHTML = "";
  const inputBook = input.value.split(" ").join("+");
  //console.log(inputBook);
  const response = await fetch(`${BASE_URL}${inputBook}&page=${num}`);
  const objBook = await response.json();
  //console.log(objBook);

  drawBook(objBook.docs);
}
function drawBook(data) {
  const titleDiv = document.createElement("div");
  const authorDiv = document.createElement("div");

  data.forEach((element) => {
    const title = element.title;
    const li = document.createElement("li");
    li.innerHTML = title;
    titleDiv.appendChild(li);

    const bookAuthor = element["author_name"];
    const p = document.createElement("p");
    if (bookAuthor) {
      p.innerHTML = bookAuthor[0];
    }
    authorDiv.appendChild(p);
  });
  bookZone.innerHTML = "";
  bookZone.append(titleDiv);
  bookZone.append(authorDiv);
}
