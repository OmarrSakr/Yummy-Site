"use strict";
// * HTML Element

// const data = document.getElementById("data");


// * ======================================> side-nav <==================================
// $(()=>{
//     $(".side-nav").hide(0);
//     $(".side-nav-inner").hide(0);
// });
$(".side-nav").css("left", -$(".side-nav-inner").innerWidth());
$("#closeIcon").fadeOut(0);
$(".side-nav ul li").css("bottom", -150);


const left = $(".side-nav-inner").innerWidth();

function openSideNav() {
    $(".side-nav").css("left", 0);
    $("#closeIcon").fadeIn(0);
    $("#openIcon").fadeOut(0);
    for (let i = 0; i < 6; i++) {
        $(".side-nav ul li").eq(i).delay(i * 60).animate({ bottom: 0 }, 360); // return to its original place
    };
}
function closeSideNav() {
    $(".side-nav").css("left", -left);
    $("#openIcon").fadeIn(0);
    $("#closeIcon").fadeOut(0);
    for (let i = 0; i < 6; i++) {
        $(".side-nav ul li").eq(i).animate({ bottom: -150 }, 80);
    };
}

$(".menuIcon").on("click", () => {
    if ($(".side-nav").css("left") === "0px") {
        closeSideNav();
    }
    else {
        openSideNav();
    }
})
// *======> for clicking on anywhere in Page for Hide Navbar <====
const sideNav = document.getElementsByClassName("side-nav")[0];
$("body").on("click", (e) => {
    if (!sideNav.contains(e.target)) {
        closeSideNav();
    }
})
// *============================== <====
$("#theme").on("click", () => {
    let mode = $("body").attr("data-bs-theme");
    if (mode === "dark") {
        $("body").attr("data-bs-theme", "light");
        $("#theme span").text("theme: Light");
        localStorage.setItem("themeMode", "light"); // حفظ الوضع في LocalStorage
    } else {
        $("body").attr("data-bs-theme", "dark");
        $("#theme span").text("theme: Dark");
        localStorage.setItem("themeMode", "dark"); // حفظ الوضع في LocalStorage
    }
})
// ^Restore theme on page load
// $(document).ready(() =>
$(() => {
    let savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
        $("body").attr("data-bs-theme", savedMode);
        $("#theme span").text(`theme: ${savedMode.charAt(0).toUpperCase() + savedMode.slice(1)}`)
    }

})

// ! =============================>  Start Home Code <====================================



// * ====================> displayMeals  <==============================

function displayMeals(meals) {
    $("#data").html(meals.map(
        (meal) => `
                <div class="col-lg-3 col-md-4 col-sm-6 ">
                    <div class="card rounded-2" onclick="getMealDetails('${meal.idMeal}')">
                        <img src="${meal.strMealThumb}" alt="Meal" />
                        <div class="overlay text-center d-flex flex-column align-items-center justify-content-center">
                            <h5 class="fs-5 text-warning ">${meal.strMeal}</h5>
                        </div>
                    </div>
                </div>`
    ).join(""));
    // ^ when you Load the page and Save of Data
    // حفظ الوجبات في localStorage
    localStorage.setItem("mealsData", JSON.stringify(meals));

}

$(() => {
    const savedMeals = JSON.parse(localStorage.getItem("mealsData"));
    // console.log("SavedMeals:", { savedMeals });
    if (savedMeals) {
        displayMeals(savedMeals);
    }
});

// ? ===============> getCategoryMeals for displayMeals() <===============
async function getCategoryMeals(category) {
    $(".loading").fadeIn(300);
    // $("#loading").fadeIn(300);  
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        if (!response.ok) {
            throw new Error("Error fetching data for CategoryMeals");
        }
        const data = await response.json();
        // console.log(data);
        displayMeals(data.meals.slice(0, 20)); // !👆🏻
        $(".loading").fadeOut(300);
    }
    catch (error) {
        console.error("There was an error:", error);
    }
    // $("#loading").fadeOut(300);
}
getCategoryMeals("Seafood");       // here you must call the function getCategoryMeals("")👆🏻 for to work

// * =======================> getMealDetails for displayMealDetails() <===========================
async function getMealDetails(mealID) {
    $(".loading").fadeIn(300);
    try {
        console.log("Meal ID:", mealID);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        if (!response.ok) {
            throw new Error("Error fetching data for CategoryMeals");
        }
        const data = await response.json();
        // console.log(data);
        displayMealDetails(data.meals[0]); // !👇
        $(".loading").fadeOut(300);
    }
    catch (error) {
        console.error("There was an error:", error.message);
    }
}
// ? ===================================> displayMealDetails  <================================
$('#mealDetails').fadeOut(); //* default status

function displayMealDetails(meal) {

    // console.log("Meal ID:", meal);

    // !--------------------------------------------------ingredients--------------------------------------------------

    let ingredients = "";

    for (let i = 0; i < 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-light m-1 py-1 px-2">${meal[`strMeasure${i}`]
                } ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    // !--------------------------------------------------tags--------------------------------------------------

    let tags = meal.strTags?.split(",") ?? [];
    let tagsStr = "";

    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
    <li class="alert alert-light m-1 py-1 px-2">${tags[i]}</li>`;
    }

    // !--------------------------------------------------inner html--------------------------------------------------

    let box = `
    <i id="closeBtn" class="fa-solid fa-xmark  rounded-2 shadow text-black p-2 fs-5" onclick="closeMealDetails()"></i>
        <div class="container ">
            <div class="row py-5 g-4">
                <div class="col-md-4 col-sm-5 mb-3 mb-md-0">
                    <img src="${meal.strMealThumb}" alt="meal" class="img-fluid rounded-3 shadow border">
                    <h2 class="h4 fw-bold mt-2 text-warning">${meal.strMeal}</h2>
                </div>
                <div class="col-md-8 col-sm-7">
                    <h3 class="fw-bold text-warning">Instructions</h3>
                    <p>${meal.strInstructions}</p>
                    <h5 class="mt-2">
                        <span class="fw-bold text-warning">Area : </span> ${meal.strArea}
                    </h5>
                    <h5 class="mt-2">
                        <span class="fw-bold text-warning">Category : </span> ${meal.strCategory}
                    </h5>
                    <h5 class="mt-2 fw-bold text-warning">Recipes :</h5>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                    </ul>
                    <h5 class="mt-2 fw-bold text-warning">Tags :</h5>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <a target="_blank" href="${meal.strSource}" class="btn btn-primary mt-2 me-1"><i
                            class="fa-solid fa-link me-2"></i>Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger mt-2"><i
                            class="fa-brands fa-youtube me-2"></i>Youtube</a>
                </div>
            </div>
        </div>
    `;
    localStorage.setItem("savedMealDetails", JSON.stringify(meal));
    localStorage.setItem('MealDetailsVisible', 'true');

    $('#mealDetails').html(box).fadeIn(300);
    $('body').addClass('no-scroll');
    $("#data").css("opacity", '0');

}

function closeMealDetails() {
    $('#mealDetails').fadeOut(300);
    $('body').removeClass('no-scroll');
    localStorage.setItem('MealDetailsVisible', 'false');
}
//^ On page load, check if there's a displayMealDetails in localStorage
$(() => {
    const savedMealDetails = localStorage.getItem("savedMealDetails");
    const MealDetailsVisible = localStorage.getItem('MealDetailsVisible');

    if (savedMealDetails && MealDetailsVisible === 'true') {
        const meal = JSON.parse(savedMealDetails);
        displayMealDetails(meal);
    }
});
// ! =============================> Final Home Code <====================================
// *======> for clicking on anywhere in Page for Hide MealsDetails <====
const boxDetails = document.getElementById("mealDetails");
$("body").on("click", (e) => {
    if (!boxDetails.contains(e.target)) {
        $('#mealDetails').fadeOut(300);
        $('body').removeClass('no-scroll');
        localStorage.setItem('MealDetailsVisible', 'false');
    }
})

// * ==============================================> Search <=========================================


$("#search").fadeOut(0);
$("#closeSearch").on("click", () => {
    $("#search").fadeOut(300);
    localStorage.setItem('searchVisible', 'false');
})
$("#searchLink").on("click", () => {
    closeSideNav();
    $("#search").fadeIn(300);
    localStorage.setItem('searchVisible', 'true');
});

async function searchByName(term) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        if (!response.ok) {
            throw new Error("Error fetching data for searchByName");
        }
        const data = await response.json();
        displayMeals(data.meals);           // !
        localStorage.setItem('lastSearch', term);
    }
    catch (error) {
        console.error("There was an error:", error);
    }

}
async function searchByFLetter(term) {

    try {
        if (term === "") {
            term = "y";  //default value
        }
        else {
            term = term;
        }

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        if (!response.ok) {
            throw new Error("Error fetching data for searchByFLetter");
        }
        const data = await response.json();
        displayMeals(data.meals);           // !
        localStorage.setItem('lastSearch', term);
    }
    catch (error) {
        console.error("There was an error:", error);
    }
}
const searchOut = document.getElementById("search");
$("body").on("click", (e) => {
    if (!searchOut.contains(e.target) && !sideNav.contains(e.target)) {
        $('#search').fadeOut();
        localStorage.setItem('searchVisible', 'false');
    }
})
//^ On page load, check if there's a last search term in localStorage
$(() => {
    const lastSearch = localStorage.getItem('lastSearch');
    const searchVisible = localStorage.getItem('searchVisible');
    if (searchVisible === 'true') {
        $("#search").fadeIn(300);
    }
    if (lastSearch) {
        $("#searchInput").val(lastSearch); // Assuming you have an input field with id `searchInput`
        searchByName(lastSearch); // Optionally trigger a search with the last search term
        searchByFLetter(lastSearch); // Optionally trigger a search with the last search term
    }
});

// * ==================================================> categories <====================================
$('#categories').fadeOut(); //* default status

$("#closeCategories").on("click", () => {
    $("#categories").fadeOut(300);
    $('body').removeClass('no-scroll')
    $("#data").css("opacity", 1);
    localStorage.setItem('categoriesVisible', 'false');


})
$("#categoriesLink").on("click", () => {
    getCategories();
    closeSideNav();
    $("#categoriesLink").fadeIn(300);
    localStorage.setItem('categoriesVisible', 'true');

});

// *======> for clicking on anywhere in Page for Hide MealsDetails <====
const boxCategories = document.getElementById("categories");
$("body").on("click", (e) => {
    if (!boxCategories.contains(e.target) && !sideNav.contains(e.target)) {
        $('#categories').fadeOut(300);
        $('body').removeClass('no-scroll');
        $("#data").css("opacity", 1);
        localStorage.setItem('categoriesVisible', 'false');
    }
})

// ? ===============> getCategories <===============

async function getCategories() {
    $(".loading").fadeIn(300);
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        if (!response.ok) {
            throw new Error("Error fetching data for getCategories");
        }
        const data = await response.json();
        // console.log(data);
        displayCategories(data.categories);           // !
        $(".loading").fadeOut(300);
        localStorage.setItem('savedCategories', JSON.stringify(data.categories));
    }
    catch (error) {
        console.error("There was an error:", error);
    }

}
// ? ===============> displayCategories <===============

async function displayCategories(categories) {
    $("#data").css("opacity", '0');

    $("#categoriesList").html(categories.map(
        (category) =>
            `<div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card rounded-2" onclick="selectCategory('${category.strCategory}'); hideCategories();">
                        <img src="${category.strCategoryThumb}" alt="category" />
                        <div class="overlay text-center d-flex flex-column align-items-center justify-content-center">
                            <h4 class="fs-3 text-warning ">${category.strCategory}</h4>
                            <p class="text-white  ">${category.strCategoryDescription.split(" ")
                .slice(0, 20)
                .join(" ")}</p>
                        </div>
                    </div>
                </div>`
    )
        .join(""));

    $('#categories').fadeIn(300);
    $('body').addClass('no-scroll');

}

function hideCategories() {
    $('#categories').fadeOut(300);
    $('body').removeClass('no-scroll');
    $("#data").css("opacity", 1);
    localStorage.setItem('categoriesVisible', 'false');
}

function selectCategory(category) {
    getCategoryMeals(category);
    localStorage.setItem('displaySelectedArea', JSON.stringify(category));

}

//^ On page load, check if there's  categories in localStorage
$(() => {
    const savedCategories = JSON.parse(localStorage.getItem('savedCategories') || '[]');
    const categoriesVisible = localStorage.getItem('categoriesVisible') || 'false';
    const displaySelectedArea = JSON.parse(localStorage.getItem('displaySelectedArea') || '');
    // console.log('Loaded from localStorage of Categories:', { savedCategories, categoriesVisible, displaySelectedArea });
    if (savedCategories && displaySelectedArea && categoriesVisible === 'true') {
        displayCategories(savedCategories);
        if (displaySelectedArea) {
            getCategoryMeals(displaySelectedArea);
        }

    }

});
// * ==================================================> Area <====================================
$('#area').fadeOut(); //* default status

$("#closeArea").on("click", () => {
    $("#area").fadeOut(300);
    $('body').removeClass('no-scroll')
    $("#data").css("opacity", 1);
    localStorage.setItem('areaVisible', 'false');

})
$("#areaLink").on("click", () => {
    getArea();
    closeSideNav();
    $("#areaLink").fadeIn(300);
    localStorage.setItem('areaVisible', 'true');

});
// *======> for clicking on anywhere in Page for Hide MealsDetails <====
const boxArea = document.getElementById("area");
$("body").on("click", (e) => {
    if (!boxArea.contains(e.target) && !sideNav.contains(e.target)) {
        $('#area').fadeOut(300);
        $('body').removeClass('no-scroll');
        $("#data").css("opacity", 1);
        localStorage.setItem('areaVisible', 'false');

    }
})

// ? ================> getArea <==================

async function getArea() {
    $(".loading").fadeIn(300);
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        if (!response.ok) {
            throw new Error("Error fetching data for getArea");
        }
        const data = await response.json();
        // console.log(data);
        if (data.meals && Array.isArray(data.meals)) {
            displayArea(data.meals);
            $(".loading").fadeOut(300);

            localStorage.setItem('savedArea', JSON.stringify(data.meals));

        } else {
            console.error("No meals found");
        }
    } catch (error) {
        console.error("There was an error:", error);
    }
}

// ? ===============> getAreaMeals <===============
async function getAreaMeals(area) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        if (!response.ok) {
            throw new Error("Error fetching data for getAreaMeals");
        }
        const data = await response.json();
        // console.log(data);
        displayMeals(data.meals.slice(0, 20));
        localStorage.setItem('selectedArea', area);  // Save selected area
        localStorage.setItem('displaySelectedArea', JSON.stringify(data.meals.slice(0, 30)));  // Save selected area

    } catch (error) {
        console.error("There was an error:", error);
    }
}

// ? ===============> displayArea <===============

function displayArea(area) {
    $("#areaList").html(area.map((data) => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card rounded-2  text-center d-flex flex-column align-items-center justify-content-center py-3" onclick="getAreaMeals('${data.strArea}');hideArea();">
                <i class="fa-solid fa-earth-americas fa-3x mb-3"></i>
                <h4 class="mb-0 fs-3 text-warning-emphasis">${data.strArea}</h4> 
            </div>
        </div>
    `).join(" "));

    $("#area").fadeIn(300);
    $("#data").css("opacity", 0);
    $('body').addClass('no-scroll');
}
function hideArea() {
    $('#area').fadeOut(300);
    $('body').removeClass('no-scroll');
    $("#data").css("opacity", 1);
    localStorage.setItem('areaVisible', 'false');
}

//^ On page load, check if there's area data in localStorage
$(() => {
    const savedArea = JSON.parse(localStorage.getItem('savedArea') || '[]');
    const displaySelectedArea = JSON.parse(localStorage.getItem('displaySelectedArea') || '[]');
    const areaVisible = localStorage.getItem('areaVisible') || 'false';
    const selectedArea = localStorage.getItem('selectedArea') || '';

    // console.log('Loaded from localStorage of Area:', { savedArea, areaVisible, selectedArea, displaySelectedArea });

    if (savedArea.length > 0 && displaySelectedArea.length > 0 && areaVisible === 'true') {
        displayArea(savedArea);
        if (selectedArea) {
            getAreaMeals(selectedArea);  // Show meals for the previously selected area
        }
        if (displaySelectedArea) {
            displayMeals(displaySelectedArea);
        }
    }
});


// * ==================================================> ingredients <====================================

$('#ingredients').fadeOut(); //* default status

$("#closeIngredients").on("click", () => {
    $("#ingredients").fadeOut(300);
    $('body').removeClass('no-scroll')
    $("#data").css("opacity", 1);
    localStorage.setItem('ingredientsVisible', 'false');


})
$("#ingredientsLink").on("click", () => {
    getIngredients();
    closeSideNav();
    $("#ingredientsLink").fadeIn(300);
    localStorage.setItem('ingredientsVisible', 'true');

});
// *======> for clicking on anywhere in Page for Hide ingredients Box <====
const boxIngredients = document.getElementById("ingredients");
$("body").on("click", (e) => {
    if (!boxIngredients.contains(e.target) && !sideNav.contains(e.target)) {
        $('#ingredients').fadeOut(300);
        $('body').removeClass('no-scroll');
        $("#data").css("opacity", 1);
        localStorage.setItem('ingredientsVisible', 'false');
    }
})

// ? ===============> getIngredients <===============

async function getIngredients() {
    $(".loading").fadeIn(300);
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        if (!response.ok) {
            throw new Error("Error fetching data for getIngredients");
        }
        const data = await response.json();
        // console.log(data);
        displayIngredients(data.meals);           // !
        $(".loading").fadeOut(300);
        localStorage.setItem('savedIngredients', JSON.stringify(data.meals));

    }
    catch (error) {
        console.error("There was an error:", error);
    }

}
// ? ===============> displayIngredients <===============

async function displayIngredients(ingredients) {
    $("#data").css("opacity", '0');

    $("#ingredientsList").html(ingredients.map(
        (ingredient) =>
            `<div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card rounded-2" onclick="selectIngredients('${ingredient.strIngredient}'); hideIngredients();">
                    <img src="https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png" alt="ingredient" />
                    <div class="overlay text-center d-flex flex-column align-items-center justify-content-center">
                        <h4 class="fs-3 text-warning ">${ingredient.strIngredient}</h4>
                        <p class="text-white">${ingredient.strDescription ? ingredient.strDescription.split(" ").slice(0, 20).join(" ") : "No description available."}</p>  
                    </div>
                </div>
            </div>`
    ).join(""));

    $('#ingredients').fadeIn(300);
    $('body').addClass('no-scroll');
    //* هذا هو التعبير الشرطي الثلاثي. يعمل مثل شرط if. (ingredient.strDescription ?) && split(" ").slice(0, 20).join(" ") => بياخد الوصف يقسمة ( وياخد اول 20 كلمة بس ) وبعد كدا يجمعهم ( كنص ) طب لو نص اقل من 20 بياخدة كلة
}
function selectIngredients(category) {
    getCategoryMeals(category);
    localStorage.setItem('displaySelectedIngredients', JSON.stringify(category));

}
function hideIngredients() {
    $('#ingredients').fadeOut(300);
    $('body').removeClass('no-scroll');
    $("#data").css("opacity", 1);
    localStorage.setItem('ingredientsVisible', 'false');

}

//^ On page load, check if there's Ingredients data in localStorage
$(() => {
    const savedIngredients = JSON.parse(localStorage.getItem('savedIngredients') || '[]');
    const displaySelectedIngredients = JSON.parse(localStorage.getItem('displaySelectedIngredients') || '[]');
    const ingredientsVisible = localStorage.getItem('ingredientsVisible') || 'false';

    // console.log('Loaded from localStorage of Ingredients:', { savedIngredients, ingredientsVisible, displaySelectedIngredients });

    if (savedIngredients.length > 0 && ingredientsVisible === 'true') {
        displayIngredients(savedIngredients);
        if (displaySelectedIngredients) {
            getCategoryMeals(displaySelectedIngredients);
        }
    }
}
);

// * ==================================================> contact-Us <====================================

$("#contact").fadeOut(0);


$("#nameWarning").fadeOut(0);
$("#emailWarning").fadeOut(0);
$("#phoneWarning").fadeOut(0);
$("#ageWarning").fadeOut(0);
$("#passwordWarning").fadeOut(0);
$("#rePasswordWarning").fadeOut(0);

$("#closeContact").on("click", () => {
    $("#contact").fadeOut(300);
    localStorage.setItem('contactUsVisible', 'false');
});
$("#contactUsLink").on("click", () => {
    closeSideNav();
    $("#contact").fadeIn(300);
    localStorage.setItem('contactUsVisible', 'true');
    $("#nameWarning, #emailWarning, #phoneWarning, #ageWarning, #passwordWarning, #rePasswordWarning").fadeOut(0);

});

// *======> for clicking on anywhere in Page for Hide contact Box <====
const boxContact = document.getElementById("contact");
$("body").on("click", (e) => {
    if (!boxContact.contains(e.target) && !sideNav.contains(e.target)) {
        $('#contact').fadeOut(300);
        localStorage.setItem('contactUsVisible', 'false');
    }
});

let submitBtn = document.getElementById("submitBtn");

function checkFormValidity() {
    $("#data").css("opacity", 0.3);
    $("body").addClass('no-scroll');


    const uName = $("#uName").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    const age = $("#age").val();
    const password = $("#password").val();
    const rePassword = $("#rePassword").val();

    if (
        uNameValidation(uName) &&
        emailValidation(email) &&
        phoneValidation(phone) &&
        ageValidation(age) &&
        passwordValidation(password) &&
        rePasswordValidation(rePassword)
    ) {
        submitBtn.classList.remove("disabled");
        $("#submitBtn").css("cursor", "pointer");
    } else {
        submitBtn.classList.add("disabled");
        $("#submitBtn").css("cursor", "not-allowed");
    }
}


$("#submitBtn").on("click", (e) => {
    if (submitBtn.classList.contains("disabled")) {
        e.preventDefault(); // منع التنفيذ
        return;
    }

    // تخزين القيم في localStorage
    localStorage.setItem("name", $("#uName").val());
    localStorage.setItem("email", $("#email").val());
    localStorage.setItem("phone", $("#phone").val());
    localStorage.setItem("age", $("#age").val());
    $("#password").val();// لا تحتفظ بكلمة المرور في localStorage
    $("#rePassword").val();

    // كدا انا بفرغ الحقل بعمل Clear Input
    $("#uName").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#age").val("");
    $("#password").val("");
    $("#rePassword").val("");


    $("#submitBtn").css("transition", "all 0.4s ease-out");


    $("#nameWarning, #emailWarning, #phoneWarning, #ageWarning, #passwordWarning, #rePasswordWarning").fadeOut(0);


    checkFormValidity();


    localStorage.setItem('contactUsVisible', 'false');
    $("#contact").fadeOut(300);
});


function uNameValidation(uName) {
    const uNamePattern = /^[a-zA-Z]{3,}([._]?[a-zA-Z]+)*$/;
    if (uNamePattern.test(uName)) {
        $("#nameWarning").fadeOut(300);
        return true;
    } else {
        $("#nameWarning").fadeIn(300);
        return false;
    }
}


function emailValidation(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
    if (emailPattern.test(email)) {
        $("#emailWarning").fadeOut(300);
        return true;
    } else {
        $("#emailWarning").fadeIn(300);
        return false;
    }
}

function phoneValidation(phone) {
    const phonePattern = /^(?:\+?[1-9]\d{0,2}[ ]?)?(?:(?:\(?\d{1,4}?\)?[ ]?[-.\s]?\d{1,4}[ ]?[-.\s]?\d{1,4}[ ]?[-.\s]?\d{1,9}){1,3})$/;
    if (phonePattern.test(phone)) {
        $("#phoneWarning").fadeOut(300);
        return true;
    } else {
        $("#phoneWarning").fadeIn(300);
        return false;
    }
}

function ageValidation(age) {
    const agePattern = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if (agePattern.test(age)) {
        $("#ageWarning").fadeOut(300);
        return true;
    } else {
        $("#ageWarning").fadeIn(300);
        return false;
    }
}

function passwordValidation(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;
    if (passwordPattern.test(password)) {
        $("#passwordWarning").fadeOut(300);
        return true;
    } else {
        $("#passwordWarning").fadeIn(300);
        return false;
    }
}

function rePasswordValidation(rePassword) {
    const password = document.getElementById("password").value;
    if (rePassword === password) {
        $("#rePasswordWarning").fadeOut(300);
        return true;
    } else {
        $("#rePasswordWarning").fadeIn(300);
        return false;
    }
}

$("#uName, #email, #phone, #age, #password, #rePassword").on("input", checkFormValidity);


//^ On page load, check if there's Contact Us data in localStorage
$(() => {
    $("#nameWarning, #emailWarning, #phoneWarning, #ageWarning, #passwordWarning, #rePasswordWarning").fadeOut(0);

    const contactUsVisible = localStorage.getItem('contactUsVisible') || 'false';

    // console.log('Loaded from localStorage of Contact Us:', { contactUsVisible });
    if (contactUsVisible === 'true') {
        $("#uName").val(localStorage.getItem("name") || "");
        $("#email").val(localStorage.getItem("email") || "");
        $("#phone").val(localStorage.getItem("phone") || "");
        $("#age").val(localStorage.getItem("age") || "");
        $("#password").val("");   // لا تحتفظ بكلمة المرور في localStorage
        $("#rePassword").val("");

        $("#contact").show();
    } else {
        $("#contact").hide();
    }
});




// * ================> just for ( preload ) when you preload this website .. it will appear load-circle <====================


jQuery(() => {
    //* $("#data") => Located in (Home Section)
     //* انتظر حتى يتم تحميل البيانات
    let dataTime = $("#data");
    if (dataTime.length > 0) {
        //* البيانات جاهزة، لذلك يمكن إخفاء شاشة التحميل
        $(".loading").fadeOut(500, () => {
            $("body").removeClass("no-scroll");
        });
    }
});





$(document).ready(function () {
    $('.side-nav ul li').on('click', function () {

        $('#search').hide();
        $('#categories').hide();
        $('#area').hide();
        $('#ingredients').hide();
        $('#contact').hide();

        let targetContentId = $(this).attr('id')
            .replace('UsLink', '')  // إزالة "UsLink"
            .replace('Link', '');    // إزالة "Link"

        if ($('#' + targetContentId).length > 0) {
            $('#' + targetContentId).show();
        } else {
            console.log("المحتوى غير موجود للـ ID: " + targetContentId);
        }
        $("#data").show;
    });
});




