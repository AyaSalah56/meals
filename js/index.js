// open icon
$(".open").click(function () {
  $(".navaya").animate({ left: `0px` }, 500);
  $(".open").fadeOut(1);
  $(".close").fadeIn(1);
  $(".navaya li").addClass("animate__fadeInUpBig");
  $(".navaya li").removeClass("animate__fadeOutDownBig");
})

/*****************************************************************************************************/
// close icon
let navWidth = $(".lista").outerWidth(true);
$(".close").click(function () {
  $(".navaya").animate({ left: `-${navWidth}` }, 500);
  $(".close").fadeOut(1);
  $(".open").fadeIn(1);
  $(".navaya li").removeClass("animate__fadeInUpBig");
  $(".navaya li").addClass("animate__fadeOutDownBig");
})

/***************************************     to move between pages   **********/
$("#Search").click(function () {
  $(".loadingDiv").fadeIn(300);
  $("#main , #category , #area , #ingrediant , #contact-us").css("display", "none");
  $("#search").css("display", "block");
  $(".navaya").animate({ left: `-${navWidth}` }, 500);
  $(".close").fadeOut(1);
  $(".open").fadeIn(1);
  $(".loadingDiv").fadeOut(300);
});


$("#Categories").click(function () {
  $(".loadingDiv").fadeIn(300);
  $("#main , #search, #area , #ingrediant , #contact-us").css("display", "none");
  $("#category").css("display", "block");
  $(".navaya").animate({ left: `-${navWidth}` }, 500);
  $(".close").fadeOut(1);
  $(".open").fadeIn(1);
  $(".loadingDiv").fadeOut(300);
});

$("#Area").click(function () {
  $(".loadingDiv").fadeIn(300);
  $("#main , #search, #category , #ingrediant , #contact-us").css("display", "none");
  $("#area").css("display", "block");
  $(".navaya").animate({ left: `-${navWidth}` }, 500);
  $(".close").fadeOut(1);
  $(".open").fadeIn(1);
  $(".loadingDiv").fadeOut(300);
});

$("#Ingredients").click(function () {
  $(".loadingDiv").fadeIn(300);
  $("#main , #search, #category , #area , #contact-us").css("display", "none");
  $("#ingrediant").css("display", "block");
  $(".navaya").animate({ left: `-${navWidth}` }, 500);
  $(".close").fadeOut(1);
  $(".open").fadeIn(1);
  $(".loadingDiv").fadeOut(300);
});


$("#Contact-Us").click(function () {
  $(".loadingDiv").fadeIn(300);
  $("#main , #search, #category , #area , #ingrediant").css("display", "none");
  $("#contact-us").css("display", "flex");
  $(".navaya").animate({ left: `-${navWidth}` }, 500);
  $(".close").fadeOut(1);
  $(".open").fadeIn(1);
  $(".loadingDiv").fadeOut(300);
});

/****************************************     loading screen         ************************************************/
$(document).ready(function () {
  $(".loadingDiv").fadeOut(300);
  $("body").css("overflow", "auto");
});
/****************************************     main           ************************************************/
// main api 
let finalmainFoodResponse
async function getMainFood() {
  // $(".loadingDiv").css({display:"flex"});
  // $("body").css("overflow" , "hidden");
  $(".loadingDiv").fadeIn(300);
  let mainFoodResponse = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s");
  finalmainFoodResponse = await mainFoodResponse.json();
  displayMainFood();
  $(".loadingDiv").fadeOut(300);
}
getMainFood()

// display main food
function displayMainFood() {
  let cartona = "";
  for (let i = 0; i < finalmainFoodResponse.meals.length; i++) {
    cartona += `
    <div class="col-md-3 ">
    <div class="img-container position-relative overflow-hidden cursor-pointer" onclick="getMainDetails(`+ i + `)">
        <img src="${finalmainFoodResponse.meals[i].strMealThumb}" alt="food" class="rounded-2">
        <div class=" meal-layer position-absolute d-flex align-items-center rounded-2">
            <h3 class="ms-3 fw-bold">${finalmainFoodResponse.meals[i].strMeal}</h3>
        </div>
    </div>
</div> 
    `
  }
  document.getElementById("mainmeals").innerHTML = cartona;
}
// get details
function getMainDetails(indx) {
  let maindetails = finalmainFoodResponse.meals[indx].idMeal;
  async function getMainDetails() {
    $(".loadingDiv").fadeIn(300);
    let mainDetailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${maindetails}`);
    finalmainDetailsResponse = await mainDetailsResponse.json();
    console.log(finalmainDetailsResponse);
    displayMainDetails();
    $(".loadingDiv").fadeOut(300);
  }
  getMainDetails();
}

function displayMainDetails() {
  document.querySelector(".main .row").innerHTML = "";
  let mainCartona = "";
  for (let i = 0; i < finalmainDetailsResponse.meals.length; i++) {
    mainCartona += `
    <div class="col-md-4">
    <div class="instraction text-white">
        <img src=${finalmainDetailsResponse.meals[i].strMealThumb} alt="food" class="rounded rounded-3 img-fluid">
        <h3 class="pt-2 fs-2">${finalmainDetailsResponse.meals[i].strMeal} </h3>
    </div>
</div>
<div class="col-md-8">
    <div class="text-white">
        <h2>Instructions</h2>
        <p>${finalmainDetailsResponse.meals[i].strInstructions}</p>
        <h3>
            <span class="fw-bolder">Area : </span>
            ${finalmainDetailsResponse.meals[i].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category : </span>
            ${finalmainDetailsResponse.meals[i].strCategory}
        </h3>
        <h3>Recipes : </h3>
        <ul class="d-flex flex-wrap list-unstyled g-3">
            <li class="alert alert-info p-1 m-2">${finalmainDetailsResponse.meals[i].strMeasure1}${finalmainDetailsResponse.meals[i].strIngredient1} </li>
            <li class="alert alert-info p-1 m-2">${finalmainDetailsResponse.meals[i].strMeasure2}${finalmainDetailsResponse.meals[i].strIngredient2}</li>
            <li class="alert alert-info p-1 m-2">${finalmainDetailsResponse.meals[i].strMeasure3}${finalmainDetailsResponse.meals[i].strIngredient3}</li>
            <li class="alert alert-info p-1 m-2">${finalmainDetailsResponse.meals[i].strMeasure4}${finalmainDetailsResponse.meals[i].strIngredient4}</li>
            <li class="alert alert-info p-1 m-2">${finalmainDetailsResponse.meals[i].strMeasure5}${finalmainDetailsResponse.meals[i].strIngredient5}</li>
            <li class="alert alert-info p-1 m-2">${finalmainDetailsResponse.meals[i].strMeasure6}${finalmainDetailsResponse.meals[i].strIngredient6}</li>
            <li class="alert alert-info p-1 m-2">${finalmainDetailsResponse.meals[i].strMeasure7}${finalmainDetailsResponse.meals[i].strIngredient7}</li>
        </ul>
        <h3 class="py-3">Tags : </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-danger m-2 p-1">${finalmainDetailsResponse.meals[i].strTags}</li>
      </ul>
        <a href="${finalmainDetailsResponse.meals[i].strSource}" target="_blank" class="btn btn-success">Source</a>
        <a href="${finalmainDetailsResponse.meals[i].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
</div>
    `
  }
  document.querySelector(".main .mainrow").innerHTML = mainCartona;
}

/**************************************      search name     *************************************************************/
// search Name
let finalsearchResponse;
async function SearchMealByName(name) {
  $(".loadingDiv").fadeIn(300);
  let searchResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  finalsearchResponse = await searchResponse.json();
  displaySearch()
  $(".loadingDiv").fadeOut(300);
}

function displaySearch() {
  let cartona = "";
  for (let i = 0; i < finalsearchResponse.meals.length; i++) {
    cartona += `
    <div class="col-md-3 ">
    <div class="img-container position-relative overflow-hidden cursor-pointer onclick="getSearchDetails(`+ i + `)" ">
        <img src="${finalsearchResponse.meals[i].strMealThumb}" alt="food" class="rounded-2">
        <div class=" meal-layer position-absolute d-flex align-items-center rounded-2">
            <h3 class="ms-3 fw-bold">${finalsearchResponse.meals[i].strMeal}</h3>
        </div>
    </div>
</div> 
    `
  }
  document.querySelector(".row2").innerHTML = cartona;
}

// function getSearchDetails(in)
// {

// }

// 
$("#searchName").keyup(function (e) {

  let searchMealName = e.target.value;
  console.log(searchMealName);
  SearchMealByName(searchMealName);
});

/**************************************      search letter     *************************************************************/
let finalsearchLetterResponse;
async function SearchMealByLetter(name) {
  $(".loadingDiv").fadeIn(300);
  let searchLetterResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);
  finalsearchLetterResponse = await searchLetterResponse.json();
  displayLetterSearch();
  $(".loadingDiv").fadeOut(300);
}

function displayLetterSearch() {
  let cartona = "";
  for (let i = 0; i < finalsearchLetterResponse.meals.length; i++) {
    cartona += `
    <div class="col-md-3 ">
    <div class="img-container position-relative overflow-hidden cursor-pointer">
        <img src="${finalsearchLetterResponse.meals[i].strMealThumb}" alt="food" class="rounded-2">
        <div class=" meal-layer position-absolute d-flex align-items-center rounded-2">
            <h3 class="ms-3 fw-bold">${finalsearchLetterResponse.meals[i].strMeal}</h3>
        </div>
    </div>
</div> 
    `
  }
  document.querySelector(".row2").innerHTML = cartona;
}

$("#searchLetter").keyup(function (e) {

  let searchMealLetter = e.target.value;
  console.log(searchMealLetter);
  SearchMealByLetter(searchMealLetter);
});

/**************************************       category           *********************************************/
let finalgetCategoryResponse;
let cartona;
async function getCategory() {
  $(".loadingDiv").fadeIn(300);
  let getCategoryResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  finalgetCategoryResponse = await getCategoryResponse.json();
  displayCategory(finalgetCategoryResponse.categories.slice(0, 20));
  $(".loadingDiv").fadeOut(300);
}

getCategory();

function displayCategory() {
  {
    cartona = "";
    for (let i = 0; i < finalgetCategoryResponse.categories.length; i++) {
      cartona += `
      <div class="col-md-3 ">
      <div class="img-container position-relative overflow-hidden cursor-pointer" onclick="getCatDetailsOne(`+ i + `)">
          <img src="${finalgetCategoryResponse.categories[i].strCategoryThumb}" alt="food" class="rounded-2">
          <div class=" meal-layer position-absolute rounded-2">
              <h3 class="fw-bold text-center">${finalgetCategoryResponse.categories[i].strCategory}</h3>
              <p class="ps-2">
              ${finalgetCategoryResponse.categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}
              </p>
          </div>
      </div>
  </div>
      `
    }
    document.querySelector(".category .row").innerHTML = cartona;
  }
}

// get cat details one 
let finalfilterCategoryResponse;
function getCatDetailsOne(index1) {
  let catName = finalgetCategoryResponse.categories[index1].strCategory;

  async function FilterCategoryDetailsOne() {
    $(".loadingDiv").fadeIn(300);
    let filterCategoryResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
    finalfilterCategoryResponse = await filterCategoryResponse.json();
    displayFilterCatDetailsOne();
    $(".loadingDiv").fadeOut(300);
  }
  FilterCategoryDetailsOne();
}

function displayFilterCatDetailsOne() {
  document.querySelector(".category .row").innerHTML = "";
  document.querySelector(".category .catDetails-row2").innerHTML = "";
  let shanta = "";
  for (let i = 0; i < finalfilterCategoryResponse.meals.length; i++) {
    shanta += `
     
     <div class="col-md-3 ">
     <div class="img-container position-relative overflow-hidden cursor-pointer"  onclick="getCatDetailsTWO(`+ i + `)">
         <img src="${finalfilterCategoryResponse.meals[i].strMealThumb}" alt="food" class="rounded-2">
         <div class=" meal-layer position-absolute d-flex align-items-center rounded-2">
             <h3 class="ms-3 fw-bold">${finalfilterCategoryResponse.meals[i].strMeal}</h3>
         </div>
     </div>
 </div>  
     `
  }
  document.querySelector(".category .cat-row2").innerHTML = shanta;

  $("#Categories").click(function () {
    document.querySelector(".category .cat-row2").innerHTML = "";
    document.querySelector(".category .row").innerHTML = cartona;
    document.querySelector(".category .catDetails-row2").innerHTML = "";
  });
}

// get cat details two
function getCatDetailsTWO(ind1) {
  let catdetailstwo = finalfilterCategoryResponse.meals[ind1].idMeal;
  async function getCatDetails2() {
    $(".loadingDiv").fadeIn(300);
    let catDetailsTwoResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${catdetailstwo}`);
    finalcatDetailsTwoResponse = await catDetailsTwoResponse.json();
    console.log(finalcatDetailsTwoResponse);
    displayCatDetailsTwo();
    $(".loadingDiv").fadeOut(300);
  }
  getCatDetails2();
}

function displayCatDetailsTwo() {
  document.querySelector(".category .row").innerHTML = "";
  document.querySelector(".category .cat-row2").innerHTML = "";
  let catCartona = "";
  for (let i = 0; i < finalcatDetailsTwoResponse.meals.length; i++) {
    catCartona += `
    <div class="col-md-4">
    <div class="instraction text-white">
        <img src=${finalcatDetailsTwoResponse.meals[i].strMealThumb} alt="food" class="rounded rounded-3 img-fluid">
        <h3 class="pt-2 fs-2">${finalcatDetailsTwoResponse.meals[i].strMeal} </h3>
    </div>
</div>
<div class="col-md-8">
    <div class="text-white">
        <h2>Instructions</h2>
        <p>${finalcatDetailsTwoResponse.meals[i].strInstructions}</p>
        <h3>
            <span class="fw-bolder">Area : </span>
            ${finalcatDetailsTwoResponse.meals[i].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category : </span>
            ${finalcatDetailsTwoResponse.meals[i].strCategory}
        </h3>
        <h3>Recipes : </h3>
        <ul class="d-flex flex-wrap list-unstyled g-3">
            <li class="alert alert-info p-1 m-2">${finalcatDetailsTwoResponse.meals[i].strMeasure1}  ${finalcatDetailsTwoResponse.meals[i].strIngredient1} </li>
            <li class="alert alert-info p-1 m-2">${finalcatDetailsTwoResponse.meals[i].strMeasure2}  ${finalcatDetailsTwoResponse.meals[i].strIngredient2}</li>
            <li class="alert alert-info p-1 m-2">${finalcatDetailsTwoResponse.meals[i].strMeasure3}  ${finalcatDetailsTwoResponse.meals[i].strIngredient3}</li>
            <li class="alert alert-info p-1 m-2">${finalcatDetailsTwoResponse.meals[i].strMeasure4}  ${finalcatDetailsTwoResponse.meals[i].strIngredient4}</li>
            <li class="alert alert-info p-1 m-2">${finalcatDetailsTwoResponse.meals[i].strMeasure5}  ${finalcatDetailsTwoResponse.meals[i].strIngredient5}</li>
            <li class="alert alert-info p-1 m-2">${finalcatDetailsTwoResponse.meals[i].strMeasure6}  ${finalcatDetailsTwoResponse.meals[i].strIngredient6}</li>
            <li class="alert alert-info p-1 m-2">${finalcatDetailsTwoResponse.meals[i].strMeasure7}  ${finalcatDetailsTwoResponse.meals[i].strIngredient7}</li>
        </ul>
        <h3 class="py-3">Tags : </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-danger m-2 p-1">${finalcatDetailsTwoResponse.meals[i].strTags}</li>
      </ul>
        <a href="${finalcatDetailsTwoResponse.meals[i].strSource}" target="_blank" class="btn btn-success">Source</a>
        <a href="${finalcatDetailsTwoResponse.meals[i].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
</div>
    `
  }
  document.querySelector(".category .catDetails-row2").innerHTML = catCartona;
}

/**************************************       area         *********************************************/

let finalgetAreaResponse;
let carton;
async function getArea() {
  $(".loadingDiv").fadeIn(300);
  let getAreaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  finalgetAreaResponse = await getAreaResponse.json();
  displayArea();
  $(".loadingDiv").fadeOut(300);
}

getArea();

function displayArea() {
  {
    carton = "";
    for (let i = 0; i < finalgetAreaResponse.meals.length; i++) {
      carton += `
      <div class="col-md-3 ">
      <div class="icon-container position-relative  text-center text-white cursor-pointer" onclick="getAreaDetailsOne(`+ i + `)">
          <i class="fa-solid fa-house-laptop  "></i>
          <h3 class="fw-bold  ">${finalgetAreaResponse.meals[i].strArea}</h3>
      </div>
  </div>
      `
    }
    document.querySelector(".area .row").innerHTML = carton;
  }
}

// get area details one 
let finalfilterAreaResponse;
function getAreaDetailsOne(index2) {
  let areaname = finalgetAreaResponse.meals[index2].strArea;
  async function FilterAreaDetailsOne() {
    $(".loadingDiv").fadeIn(300);
    let filterAreaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaname}`);
    finalfilterAreaResponse = await filterAreaResponse.json();
    console.log(finalfilterAreaResponse);
    displayFilterAreaDetailsOne();
    $(".loadingDiv").fadeOut(300);
  }
  FilterAreaDetailsOne();
}


function displayFilterAreaDetailsOne() {
  document.querySelector(".area .row").innerHTML = "";
  document.querySelector(".area .area-row3").innerHTML = "";
  let shant = "";
  for (let i = 0; i < finalfilterAreaResponse.meals.length; i++) {
    shant += `
     
     <div class="col-md-3 ">
     <div class="img-container position-relative overflow-hidden cursor-pointer" onclick="getAreaDetailsTwo(`+ i + `)">
         <img src="${finalfilterAreaResponse.meals[i].strMealThumb}" alt="food" class="rounded-2">
         <div class=" meal-layer position-absolute d-flex align-items-center rounded-2">
             <h3 class="ms-3 fw-bold">${finalfilterAreaResponse.meals[i].strMeal}</h3>
         </div>
     </div>
 </div>  
     `
  }
  document.querySelector(".area .area-row2").innerHTML = shant;

  $("#Area").click(function () {
    document.querySelector(".area .area-row2").innerHTML = "";
    document.querySelector(".area .row").innerHTML = carton;
    document.querySelector(".area .area-row3").innerHTML = "";
  });
}

// get area details two
function getAreaDetailsTwo(inde) {

  let areadetailstwo = finalfilterAreaResponse.meals[inde].idMeal;
  async function getAreaDetails2() {
    $(".loadingDiv").fadeIn(300);
    let areaDetailsTwoResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${areadetailstwo}`);
    finalareaDetailsTwoResponse = await areaDetailsTwoResponse.json();
    console.log(finalareaDetailsTwoResponse);
    displayAreaDetailsTwo();
    $(".loadingDiv").fadeOut(300);
  }
  getAreaDetails2();
}

function displayAreaDetailsTwo() {
  document.querySelector(".area .row").innerHTML = "";
  document.querySelector(".area .area-row2").innerHTML = "";
  let arCartona = "";
  for (let i = 0; i < finalareaDetailsTwoResponse.meals.length; i++) {
    arCartona += `
    <div class="col-md-4">
    <div class="instraction text-white">
        <img src=${finalareaDetailsTwoResponse.meals[i].strMealThumb} alt="food" class="rounded rounded-3 img-fluid">
        <h3 class="pt-2 fs-2">${finalareaDetailsTwoResponse.meals[i].strMeal} </h3>
    </div>
</div>
<div class="col-md-8">
    <div class="text-white">
        <h2>Instructions</h2>
        <p>${finalareaDetailsTwoResponse.meals[i].strInstructions}</p>
        <h3>
            <span class="fw-bolder">Area : </span>
            ${finalareaDetailsTwoResponse.meals[i].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category : </span>
            ${finalareaDetailsTwoResponse.meals[i].strCategory}
        </h3>
        <h3>Recipes : </h3>
        <ul class="d-flex flex-wrap list-unstyled g-3">
            <li class="alert alert-info p-1 m-2">${finalareaDetailsTwoResponse.meals[i].strMeasure1}  ${finalareaDetailsTwoResponse.meals[i].strIngredient1} </li>
            <li class="alert alert-info p-1 m-2">${finalareaDetailsTwoResponse.meals[i].strMeasure2}  ${finalareaDetailsTwoResponse.meals[i].strIngredient2}</li>
            <li class="alert alert-info p-1 m-2">${finalareaDetailsTwoResponse.meals[i].strMeasure3}  ${finalareaDetailsTwoResponse.meals[i].strIngredient3}</li>
            <li class="alert alert-info p-1 m-2">${finalareaDetailsTwoResponse.meals[i].strMeasure4}  ${finalareaDetailsTwoResponse.meals[i].strIngredient4}</li>
            <li class="alert alert-info p-1 m-2">${finalareaDetailsTwoResponse.meals[i].strMeasure5}  ${finalareaDetailsTwoResponse.meals[i].strIngredient5}</li>
            <li class="alert alert-info p-1 m-2">${finalareaDetailsTwoResponse.meals[i].strMeasure6}  ${finalareaDetailsTwoResponse.meals[i].strIngredient6}</li>
            <li class="alert alert-info p-1 m-2">${finalareaDetailsTwoResponse.meals[i].strMeasure7}  ${finalareaDetailsTwoResponse.meals[i].strIngredient7}</li>
        </ul>
        <h3 class="py-3">Tags : </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-danger m-2 p-1">${finalareaDetailsTwoResponse.meals[i].strTags}</li>
      </ul>
        <a href="${finalareaDetailsTwoResponse.meals[i].strSource}" target="_blank" class="btn btn-success">Source</a>
        <a href="${finalareaDetailsTwoResponse.meals[i].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
</div>
    `
  }
  document.querySelector(".area .area-row3").innerHTML = arCartona;
}

/**************************************       ingrediants       *********************************************/
let finalgetIngrediantResponse;
let carto;
async function getIngrediant() {
  $(".loadingDiv").fadeIn(300);
  let getIngrediantResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  finalgetIngrediantResponse = await getIngrediantResponse.json();
  displayIngrediant(finalgetIngrediantResponse.meals.slice(0, 20));
  $(".loadingDiv").fadeOut(300);
}
getIngrediant();

function displayIngrediant() {
  {
    carto = "";
    for (let i = 0; i < 20; i++) {
      carto += `
      <div class="col-md-3 ">
      <div class="icon-container position-relative  text-center text-white cursor-pointer" onclick="getIngrDetailsOne(`+ i + `)">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3 class="fw-bold">${finalgetIngrediantResponse.meals[i].strIngredient}</h3>
          <p>${finalgetIngrediantResponse.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
      </div>
  </div>
      `
    }
    document.querySelector(".ingrediant .row").innerHTML = carto;
  }
}

// get ingrediant details one 
let finalfilterIngrResponse;
function getIngrDetailsOne(ind) {
  let ingrname = finalgetIngrediantResponse.meals[ind].strIngredient;

  async function FilterIngrDetailsOne() {
    $(".loadingDiv").fadeIn(300);
    let filterIngrResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrname}`);
    finalfilterIngrResponse = await filterIngrResponse.json();
    displayFilterIngrDetailsOne();
    console.log(finalfilterIngrResponse);
    $(".loadingDiv").fadeOut(300);
  }
  FilterIngrDetailsOne();
}

function displayFilterIngrDetailsOne() {
  document.querySelector(".ingrediant .row").innerHTML = "";
  document.querySelector(".ingrediant .ingr-row3").innerHTML = "";
  let ingshanta1 = "";
  for (let i = 0; i < finalfilterIngrResponse.meals.length; i++) {
    ingshanta1 += `
     
     <div class="col-md-3 ">
     <div class="img-container position-relative overflow-hidden cursor-pointer" onclick="getIngrDetailsTwo(`+i+`)">
         <img src="${finalfilterIngrResponse.meals[i].strMealThumb}" alt="food" class="rounded-2">
         <div class=" meal-layer position-absolute d-flex align-items-center rounded-2">
             <h3 class="ms-3 fw-bold">${finalfilterIngrResponse.meals[i].strMeal}</h3>
         </div>
     </div>
 </div>  
     `
  }
  document.querySelector(".ingrediant .ingr-row2").innerHTML = ingshanta1;

  $("#Ingredients").click(function () {
    document.querySelector(".ingrediant .ingr-row2").innerHTML = "";
    document.querySelector(".ingrediant .row").innerHTML = carto;
    document.querySelector(".ingrediant .ingr-row3").innerHTML = "";
  });
}

// get ingrediant details two
function getIngrDetailsTwo(indx8)
{
  let ingrdetailstwo = finalfilterIngrResponse.meals[indx8].idMeal;
  async function getIngrDetails2() {
    $(".loadingDiv").fadeIn(300);
    let ingrDetailsTwoResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ingrdetailstwo}`);
    finalingrDetailsTwoResponse = await ingrDetailsTwoResponse.json();
    console.log(finalingrDetailsTwoResponse);
    displayIngrDetailsTwo();
    $(".loadingDiv").fadeOut(300);
  }
  getIngrDetails2();
}

function displayIngrDetailsTwo() {
  document.querySelector(".ingrediant  .row").innerHTML = "";
  document.querySelector(".ingrediant  .ingr-row2").innerHTML = "";
  let inCartona = "";
  for (let i = 0; i < finalingrDetailsTwoResponse.meals.length; i++) {
    inCartona += `
    <div class="col-md-4">
    <div class="instraction text-white">
        <img src=${finalingrDetailsTwoResponse.meals[i].strMealThumb} alt="food" class="rounded rounded-3 img-fluid">
        <h3 class="pt-2 fs-2">${finalingrDetailsTwoResponse.meals[i].strMeal} </h3>
    </div>
</div>
<div class="col-md-8">
    <div class="text-white">
        <h2>Instructions</h2>
        <p>${finalingrDetailsTwoResponse.meals[i].strInstructions}</p>
        <h3>
            <span class="fw-bolder">Area : </span>
            ${finalingrDetailsTwoResponse.meals[i].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category : </span>
            ${finalingrDetailsTwoResponse.meals[i].strCategory}
        </h3>
        <h3>Recipes : </h3>
        <ul class="d-flex flex-wrap list-unstyled g-3">
            <li class="alert alert-info p-1 m-2">${finalingrDetailsTwoResponse.meals[i].strMeasure1}  ${finalingrDetailsTwoResponse.meals[i].strIngredient1} </li>
            <li class="alert alert-info p-1 m-2">${finalingrDetailsTwoResponse.meals[i].strMeasure2}  ${finalingrDetailsTwoResponse.meals[i].strIngredient2}</li>
            <li class="alert alert-info p-1 m-2">${finalingrDetailsTwoResponse.meals[i].strMeasure3}  ${finalingrDetailsTwoResponse.meals[i].strIngredient3}</li>
            <li class="alert alert-info p-1 m-2">${finalingrDetailsTwoResponse.meals[i].strMeasure4}  ${finalingrDetailsTwoResponse.meals[i].strIngredient4}</li>
            <li class="alert alert-info p-1 m-2">${finalingrDetailsTwoResponse.meals[i].strMeasure5}  ${finalingrDetailsTwoResponse.meals[i].strIngredient5}</li>
            <li class="alert alert-info p-1 m-2">${finalingrDetailsTwoResponse.meals[i].strMeasure6}  ${finalingrDetailsTwoResponse.meals[i].strIngredient6}</li>
            <li class="alert alert-info p-1 m-2">${finalingrDetailsTwoResponse.meals[i].strMeasure7}  ${finalingrDetailsTwoResponse.meals[i].strIngredient7}</li>
        </ul>
        <h3 class="py-3">Tags : </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-danger m-2 p-1">${finalingrDetailsTwoResponse.meals[i].strTags}</li>
      </ul>
        <a href="${finalingrDetailsTwoResponse.meals[i].strSource}" target="_blank" class="btn btn-success">Source</a>
        <a href="${finalingrDetailsTwoResponse.meals[i].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
</div>
    `
  }
  document.querySelector(".ingrediant .ingr-row3").innerHTML = inCartona;
}

/**************************************       contact us       *********************************************/
let regexName = /^[a-z A-Z]{1,}$/;
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let regexPhone = /^(01)[0125][0-9]{8}$/;
let regexAge = /^\S[0-9]{0,1}$/;
let regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let ageInput = document.getElementById("ageInput");
let passwordInput = document.getElementById("passwordInput");
let rePasswordInput = document.getElementById("rePasswordInput");
let subBtn = document.getElementById("subBtn");

let nameAlert = document.getElementById("nameAlert");
let emailAlert = document.getElementById("emailAlert");
let phoneAlert = document.getElementById("phoneAlert");
let ageAlert = document.getElementById("ageAlert");
let passAlert = document.getElementById("passAlert");
let rePassAlert = document.getElementById("rePassAlert");

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function validationName() {
  return (regexName.test(nameInput.value));
}

function validationEmail() {
  return (regexEmail.test(emailInput.value));
}

function validationPhone() {
  return (regexPhone.test(phoneInput.value));
}

function validationAge() {
  return (regexAge.test(ageInput.value));
}

function validationPass() {
  return (regexPass.test(passwordInput.value));
}

function validationRePass() {
  if (rePasswordInput.value == passwordInput.value) {
    return true;
  }
  else {
    return false;
  }
}

nameInput.addEventListener("focus", function () {
  nameInputTouched = true;
})

emailInput.addEventListener("focus", function () {

  emailInputTouched = true;
})

phoneInput.addEventListener("focus", function () {

  phoneInputTouched = true;
})

ageInput.addEventListener("focus", function () {

  ageInputTouched = true;
})

passwordInput.addEventListener("focus", function () {

  passwordInputTouched = true;
})

rePasswordInput.addEventListener("focus", function () {

  repasswordInputTouched = true;
})

function validation() {
  if (nameInputTouched) {
    if (validationName()) {
      nameAlert.classList.replace("d-block", "d-none")
    }
    else {
      nameAlert.classList.replace("d-none", "d-block")
    }
  }

  if (emailInputTouched) {
    if (validationEmail()) {
      emailAlert.classList.replace("d-block", "d-none")
    }
    else {
      emailAlert.classList.replace("d-none", "d-block")
    }
  }


  if (phoneInputTouched) {
    if (validationPhone()) {
      phoneAlert.classList.replace("d-block", "d-none")
    }
    else {
      phoneAlert.classList.replace("d-none", "d-block")
    }
  }


  if (ageInputTouched) {
    if (validationAge()) {
      ageAlert.classList.replace("d-block", "d-none")
    }
    else {
      ageAlert.classList.replace("d-none", "d-block")
    }
  }


  if (passwordInputTouched) {
    if (validationPass()) {
      passAlert.classList.replace("d-block", "d-none")
    }
    else {
      passAlert.classList.replace("d-none", "d-block")
    }
  }

  if (repasswordInputTouched) {
    if (validationRePass()) {
      rePassAlert.classList.replace("d-block", "d-none")
    }
    else {
      rePassAlert.classList.replace("d-none", "d-block")

    }
  }

  if (validationName() && validationEmail() && validationPhone() && validationAge() && validationPass() && validationRePass()) {
    subBtn.removeAttribute("disabled");
  }
  else {
    subBtn.setAttribute("disabled", true)
  }
}

$(".contact-us input").keyup(function () {
  validation();
});

