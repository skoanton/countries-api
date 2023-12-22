"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://restcountries.com/v3.1/all";
const tempURL = "https://restcountries.com/v3.1/all";
//Elements
const overviewCards = document.getElementById("overviewCards");
const filterOption = document.getElementById("filterOption");
function FetchCountries() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(tempURL);
            if (response.status === 200) {
                const data = yield response.json();
                console.log(data[0]);
                return data;
            }
            else {
                throw new Error("Fel att hämta data");
            }
        }
        catch (error) {
            console.error("Gick inte att hämta");
            throw error;
        }
    });
}
PopulateCards();
function PopulateCards() {
    return __awaiter(this, void 0, void 0, function* () {
        let countrys = yield FetchCountries();
        console.log(filterOption === null || filterOption === void 0 ? void 0 : filterOption.value);
        RemoveCards();
        countrys.forEach(country => {
            let filterValue = filterOption === null || filterOption === void 0 ? void 0 : filterOption.value.toLowerCase();
            if (country.region.toLowerCase() === filterValue || filterValue === "") {
                CreateCards(country);
            }
        });
    });
}
function RemoveCards() {
    while (overviewCards === null || overviewCards === void 0 ? void 0 : overviewCards.firstChild) {
        overviewCards.firstChild.remove();
    }
    ;
}
function CreateCards(country) {
    console.log("creating stuff");
    //Create card Div
    let divEl = document.createElement("div");
    divEl.classList.add("overview-card");
    divEl.classList.add("shadow");
    overviewCards === null || overviewCards === void 0 ? void 0 : overviewCards.appendChild(divEl);
    //Create Image Element
    let imgEl = document.createElement("img");
    imgEl.setAttribute("src", country.flags.png);
    divEl.appendChild(imgEl);
    //Create name el
    let nameEl = document.createElement("h2");
    nameEl.textContent = country.name.common;
    divEl.appendChild(nameEl);
    //Create p Elements
    // population El
    let populationEl = document.createElement("p");
    populationEl.textContent = "Population: ";
    populationEl.innerHTML += `<span class="info-text">${country.population.toLocaleString("en-GB")}</span`;
    populationEl.classList.add("info-header");
    divEl.appendChild(populationEl);
    // Region El
    let regionEl = document.createElement("p");
    regionEl.textContent = "Region: ";
    regionEl.innerHTML += `<span class="info-text">${country.region}</span`;
    regionEl.classList.add("info-header");
    divEl.appendChild(regionEl);
    // Region El
    let capitalEl = document.createElement("p");
    capitalEl.textContent = "Capital: ";
    capitalEl.innerHTML += `<span class="info-text">${country.capital}</span`;
    capitalEl.classList.add("info-header");
    divEl.appendChild(capitalEl);
    divEl.addEventListener("click", function () {
        OpenInfoView(country);
    });
}
function OpenInfoView(country) {
    console.log("info view opens");
    //Close overview
    //Open info view
    //Populate info view with country info
}
