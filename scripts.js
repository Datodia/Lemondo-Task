// I dont using this categories array because if I using this 
//categories we have only three categories and its not a good for design
//it was bad designed site, but its esay so using this array, if you think it
//is promleb that i dont using this, give me feedback and I'll using this.
//I just write all categories in the HTML and give then unique ID.
const categories = [
    {
        name: "უძრავი ქონება",
        id: 1
    },
    {
        name: "ბიზნესი",
        id: 2
    },
    {
        name: "მედია",
        id: 3
    }
]


// DomainList array
const domainList = [
    {
        domainName: "example1",
        domainExtension: ".ge",
        price: 299,
        categories: [1, 2]
    },
    {
        domainName: "example2",
        domainExtension: ".com.ge",
        price: 299,
        categories: [2, 3]
    },
    {
        domainName: "example3",
        domainExtension: ".edu.ge",
        price: 299,
        categories: [2]
    },
    {
        domainName: "example4",
        domainExtension: ".ge",
        price: 299,
        categories: [3]
    },
    {
        domainName: "example5",
        domainExtension: ".org.ge",
        price: 299,
        categories: [1, 3]
    }
]

//Invoke function that filter and draw the domain list, it filter by its parameter domainList
addToList(domainList);

//Variables
let rangeInput = document.querySelectorAll('.range-input input'),
    priceInput = document.querySelectorAll('.price input'),
    range = document.querySelectorAll('.slider .progress'),
    priceGap = 1,
    searchInput = document.querySelector("#byName"),
    quantity = document.getElementById("quantity"),
    checkbox = document.querySelectorAll(".checkboxCategory"),
    test = document.getElementById('test'),
    basket = document.getElementById('basket'),
    addBtn = document.querySelectorAll('.add'),
    count = 0,
    rise = document.querySelectorAll(".rise"),
    addText = document.getElementById('add-text');

//Number of domains 
quantity.innerHTML = domainList.length

//when we type something in the search it add this value in the domainList and filter it
searchInput.addEventListener("input", function () {
    addToList(domainList);
})

//Each priceInputs transmition priceGenerator parameters
priceInput.forEach(input => {
    input.addEventListener('input', e => {
        priceGenerator(0, 0, 1, e)
        priceGenerator(1, 2, 3, e)
    })
})

//Each RageInput transmition rageGeterator parameters
rangeInput.forEach(input => {
    input.addEventListener('input', e => {
        rangeGenerator(0, 0, 1, e)
        rangeGenerator(1, 2, 3, e)
    })
})

//this function generate range inputs and range aslo style it
function rangeGenerator(rangeIndex, num1, num2, e) {
    let minVal = parseInt(rangeInput[num1].value),
        maxVal = parseInt(rangeInput[num2].value);

    if ((maxVal - minVal) < priceGap) {
        if (e.target.className === "range-min") {
            rangeInput[num1].value = maxVal - priceGap
        } else {
            rangeInput[num2].value = minVal + priceGap;
        }
    } else {
        priceInput[num1].value = minVal;
        priceInput[num2].value = maxVal;
        range[rangeIndex].style.left = ((minVal / rangeInput[num1].max) * 100) + '%';
        range[rangeIndex].style.right = 100 - (maxVal / rangeInput[num2].max) * 100 + '%'
    }
    addToList(domainList);
}

//This function generate price and its input also styled it
function priceGenerator(rangeIndex, num1, num2, e) {
    let minPrice = parseInt(priceInput[num1].value),
        maxPrice = parseInt(priceInput[num2].value);
    if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[num2].max) {
        if (e.target.className === "input-min") {
            rangeInput[num1].value = minPrice;
            range[rangeIndex].style.left = ((minPrice / rangeInput[num1].max) * 100) + "%";
        } else {
            rangeInput[num2].value = maxPrice;
            range[rangeIndex].style.right = 100 - (maxPrice / rangeInput[num2].max) * 100 + "%";
        }
    }
    addToList(domainList);
}

//It selects all checkboxes and add in the domainList
checkbox.forEach(elem => {
    elem.addEventListener('click', (elem) => {
        addToList(domainList);
    })
});

checkbox = document.querySelectorAll(".checkboxDomain");

//It selects all checkboxs from domains zone and add in the domainList
checkbox.forEach(elem => {
    elem.addEventListener('click', (elem) => {
        addToList(domainList);
    })
})



//Each add 'damateba' button each item 
addBtn.forEach(function (e) {
    e.addEventListener('click', function () {
        let rise = e.previousElementSibling;

        if (rise.style.display === 'none') {
            rise.style.display = "block"
        } else {
            rise.style.display = "none"
        }

    });
});


//On the click each add button show items number in the basket and also we can remove items from the basket
rise.forEach(function (e) {
    e.addEventListener('click', function () {
        if (e.classList.contains("clicked")) {
            if (count > 0) {
                count--
                basket.innerHTML = count;

            }
            if (count === 0) {
                basket.innerHTML = "";
                basket.classList.remove('basket')
            }

            e.classList.remove("clicked");
            e.innerHTML = "დამატება";
            return;
        }
        count++
        basket.innerHTML = count

        if (count === 1) {
            basket.classList.add('basket')
        }

        e.classList.add("clicked");
        e.innerHTML = 'ამოღება';
    });
});

//this jquery add show and hide filter menu on mobile
$(document).ready(function () {
    $('#mob-sort').click(function () {
        $('.filter-container .filter').show()
        $('.filter-container .domains').hide()
        $('header .header .buttons').hide()
    })

    $('#mob-sort-exit').click(function () {
        $('.filter-container .filter').hide()
        $('.filter-container .domains').show()
        $('header .header .buttons').show()
    })

    $('#search-btn').click(function () {
        $('.filter-container .filter').hide()
        $('.filter-container .domains').show()
        $('header .header .buttons').show()
    })
})

//This function filter and then draw it
function addToList(json = []) {
    let listTable = document.querySelector(".domains");
    listTable.innerHTML = "";

    let length = getLength();
    let cost = getCost();
    let category = getCategoryArray();
    let domains = getDomainArray();
    let name = getInputValue();
    json.forEach(function (e) {
        let fullName = e.domainName + e.domainExtension;
        if (fullName.length < length.minLength || fullName.length > length.maxLength) {
            return;
        }

        if (e.price < cost.minCost || e.price > cost.maxCost) {
            return;
        }

        if (category.length > 0 && !category.some(ai => e.categories.includes(ai))) {
            return;
        }

        if (domains.length > 0 && !domains.includes(e.domainExtension)) {
            return;
        }

        if (name.length > 0 && name.toLowerCase() !== e.domainName) {
            return;
        }


        listTable.innerHTML += `<div class="items">
       <div class="left">
            <button>
                <img src="assets/Btn_send.svg" alt="">
            </button>
            <h1>${e.domainName + e.domainExtension}</h1>
        </div>
        <div class="right">
            <div class="price">
                <h1>40 000₾</h1>
                <p>14 258.7 $</p>
            </div>
            <button id="rise" class="rise">
                <h1>დამატება</h1>
            </button>
            <button class="add">
                <img src="assets/white-basket.svg" alt="">
            </button>
        </div>
    </div>`


    });

    if (listTable.childNodes.length === 0) {
        //daamate listable.innerHTML rom ver moidzebna
        listTable.innerHTML = `<div class="eror">
        <img src="assets/eror.svg" alt="">
        <h1>დომენი ვერ მოიძებნა</h1>
        <p>მითითებული პარამეტრებით დომენების მარკეტში შედეგები ვერ მოიძებნა, შეცვალეთ ძიების პარამეტრები და ცადეთ თავიდან</p>
    </div>`;
    }

}

//This function takes all category ckeckbox id that are checked and then push them in the array
function getCategoryArray() {
    let checkbox = document.querySelectorAll(".checkboxCategory:checked");
    let categories = [];
    checkbox.forEach(function (e) {
        if (e.id.length > 0) {
            categories.push(parseInt(e.id));
        }
    })
    return categories;
}

//This function takes all domains checkbox that are ckecked and push them in the array
function getDomainArray() {
    let checkbox = document.querySelectorAll(".checkboxDomain:checked");
    let categories = [];
    checkbox.forEach(function (e) {
        let spanText = e.nextElementSibling;
        if (spanText.innerHTML.length > 0) {
            categories.push(spanText.innerHTML);
        }
    })
    return categories;
}

//This function takes search input value and return it
function getInputValue() {
    let inputValue = document.querySelector("#byName").value;
    if (inputValue.trim().length > 0) {
        return inputValue;
    }
    return "";
}

//This function takes price inputs value and return it
function getCost() {
    let minCost = document.querySelector("#minCost").value;
    let maxCost = document.querySelector("#maxCost").value;

    let cost = {
        "minCost": parseInt(minCost),
        "maxCost": parseInt(maxCost)
    }

    return cost;

}

//This function takes quantity inputs value and return it
function getLength() {
    let minLength = document.querySelector("#minLength").value;
    let maxLength = document.querySelector("#maxLength").value;

    let length = {
        "minLength": parseInt(minLength),
        "maxLength": parseInt(maxLength)
    }

    return length;
}


