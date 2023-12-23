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
const homeButton = document.getElementById("homeButton");
const backButton = document.getElementById("backButton");
const overviewCards = document.getElementById("overviewCards");
const filterOption = document.getElementById("filterOption");
const overviewModul = document.getElementById("overview");
const infoViewModul = document.getElementById("infoView");
// Info-card
//General
const infoImg = document.getElementById("infoImg");
const infoName = document.getElementById("infoName");
const infoNativeName = document.getElementById("infoNativeName");
const infoPopulation = document.getElementById("infoPopulation");
const infoRegion = document.getElementById("infoRegion");
const infoSubRegion = document.getElementById("infoSubRegion");
const infoCapital = document.getElementById("infoCapital");
//Other infoo
const infoTopLevelDomain = document.getElementById("infoTopLevelDomain");
const infoCurrencies = document.getElementById("infoCurrencies");
const infoLanguages = document.getElementById("infoLanguages");
const borderButtons = document.getElementById("borderButtons");
//Search el
const inputSearch = document.getElementById("inputSearch");
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
function RefreshPage() {
    window.location.reload();
}
homeButton === null || homeButton === void 0 ? void 0 : homeButton.addEventListener("click", RefreshPage);
backButton === null || backButton === void 0 ? void 0 : backButton.addEventListener("click", SwitchView);
/* inputSearch?.addEventListener("keyup", Search); */
PopulateCards();
function Search() {
    console.log(inputSearch === null || inputSearch === void 0 ? void 0 : inputSearch.value);
    PopulateCards();
}
function SwitchView() {
    if (overviewModul === null || overviewModul === void 0 ? void 0 : overviewModul.classList.contains("hide")) {
        overviewModul.classList.remove("hide");
    }
    else {
        overviewModul === null || overviewModul === void 0 ? void 0 : overviewModul.classList.add("hide");
    }
    if (infoViewModul === null || infoViewModul === void 0 ? void 0 : infoViewModul.classList.contains("hide")) {
        infoViewModul === null || infoViewModul === void 0 ? void 0 : infoViewModul.classList.remove("hide");
    }
    else {
        infoViewModul === null || infoViewModul === void 0 ? void 0 : infoViewModul.classList.add("hide");
    }
}
function PopulateCards() {
    return __awaiter(this, void 0, void 0, function* () {
        let countrys = yield FetchCountries();
        RemoveCards();
        countrys.forEach(country => {
            let filterValue = filterOption === null || filterOption === void 0 ? void 0 : filterOption.value.toLowerCase();
            if (country.region.toLowerCase() === filterValue && country.name.common.toLowerCase().includes(inputSearch.value) || filterValue === "" && country.name.common.toLowerCase().includes(inputSearch.value)) {
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
    SwitchView();
    overviewModul === null || overviewModul === void 0 ? void 0 : overviewModul.classList.add("hide");
    while (borderButtons === null || borderButtons === void 0 ? void 0 : borderButtons.firstChild) {
        borderButtons.firstChild.remove();
    }
    //Open info view
    infoViewModul === null || infoViewModul === void 0 ? void 0 : infoViewModul.classList.remove("hide");
    console.log(country);
    //Populate info view with country info
    infoImg === null || infoImg === void 0 ? void 0 : infoImg.setAttribute("src", country.flags.png);
    infoName.textContent = country.name.common;
    infoNativeName.textContent = country.altSpellings[1];
    infoPopulation.textContent = country.population.toLocaleString("en-GB");
    infoRegion.textContent = country.region;
    infoSubRegion.textContent = country.subregion;
    infoCapital.textContent = country.capital[0];
    infoTopLevelDomain.textContent = country.cca2;
    /* infoCurrencies!.textContent = country.currencies.constructor.name.toString();
    console.log(country.languages);
    country.languages.forEach(lang => {
        infoLanguages!.textContent += ` ${lang}`;
    }); */
    if (country.borders && country.borders.length > 0) {
        country.borders.forEach(countryBorder => {
            let buttonEl = document.createElement("button");
            buttonEl.textContent = countryBorder;
            borderButtons === null || borderButtons === void 0 ? void 0 : borderButtons.appendChild(buttonEl);
        });
    }
    else {
        let pEl = document.createElement("p");
        pEl.textContent = "No Borders";
        borderButtons === null || borderButtons === void 0 ? void 0 : borderButtons.appendChild(pEl);
    }
}
