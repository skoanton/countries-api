const BASE_URL = "https://restcountries.com/v3.1/all";
const tempURL = "https://restcountries.com/v3.1/all"


//Elements
const homeButton:HTMLElement | null = document.getElementById("homeButton");
const backButton:HTMLElement | null = document.getElementById("backButton");


const overviewCards : HTMLElement | null = document.getElementById("overviewCards");
const filterOption: HTMLSelectElement | null  = document.getElementById("filterOption") as HTMLSelectElement | null;
const overviewModul: HTMLElement | null = document.getElementById("overview");
const infoViewModul: HTMLElement| null = document.getElementById("infoView");

// Info-card
//General
const infoImg = document.getElementById("infoImg") as HTMLImageElement |null;
const infoName :HTMLElement | null = document.getElementById("infoName");
const infoNativeName: HTMLElement | null = document.getElementById("infoNativeName");
const infoPopulation: HTMLElement | null = document.getElementById("infoPopulation");
const infoRegion: HTMLElement | null = document.getElementById("infoRegion");
const infoSubRegion: HTMLElement | null = document.getElementById("infoSubRegion");
const infoCapital: HTMLElement | null = document.getElementById("infoCapital");

//Other infoo
const infoTopLevelDomain: HTMLElement | null = document.getElementById("infoTopLevelDomain");
const infoCurrencies: HTMLElement | null = document.getElementById("infoCurrencies");
const infoLanguages: HTMLElement | null = document.getElementById("infoLanguages");


const borderButtons: HTMLElement |null = document.getElementById("borderButtons");


//Search el
const inputSearch = document.getElementById("inputSearch") as HTMLInputElement | null;

interface Country{
    altSpellings:string[],
    name:{
        common:string,
    },
    population:number,
    region:string,
    capital:string[],
    subregion: string,
    cca2:string;
    currencies:{},
    languages:string[],
    flags:{
        png:string,
    }
    borders:string[]
}


async function FetchCountries(): Promise<Country[]>{
    try {
        const response: Response = await fetch(tempURL);
        if(response.status === 200){
            const data: Country[] = await response.json();
            console.log(data[0]);
            return data;
        }

        else{
            throw new Error("Fel att hämta data");
            
        }
    } catch (error) {
        console.error("Gick inte att hämta");
        throw error;
        
    }
}
function RefreshPage(){
    window.location.reload();
}

homeButton?.addEventListener("click",RefreshPage);
backButton?.addEventListener("click",SwitchView);
/* inputSearch?.addEventListener("keyup", Search); */
PopulateCards();


function Search(){
    console.log(inputSearch?.value);
    PopulateCards()
}

function SwitchView(){
    if(overviewModul?.classList.contains("hide")){
        overviewModul.classList.remove("hide");
        
    }
    else{
        overviewModul?.classList.add("hide");
        
    }

    if(infoViewModul?.classList.contains("hide")){
        infoViewModul?.classList.remove("hide");
        
    }

    else{
        infoViewModul?.classList.add("hide");
    }


}

async function PopulateCards(){
    let countrys: Country[] = await FetchCountries();

    
    RemoveCards();
    countrys.forEach(country => { 

        let filterValue = filterOption?.value.toLowerCase();
        if(country.region.toLowerCase() === filterValue && country.name.common.toLowerCase().includes(inputSearch!.value) || filterValue === "" && country.name.common.toLowerCase().includes(inputSearch!.value)){     
            CreateCards(country);           
        }
        
    });
}

function RemoveCards(){
    while(overviewCards?.firstChild){
        overviewCards.firstChild.remove();
    };
}


function CreateCards(country:Country){

    //Create card Div
    let divEl = document.createElement("div");
    divEl.classList.add("overview-card");
    divEl.classList.add("shadow");
    overviewCards?.appendChild(divEl);

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
    regionEl.textContent ="Region: "
    regionEl.innerHTML += `<span class="info-text">${country.region}</span`;
    regionEl.classList.add("info-header");
    divEl.appendChild(regionEl);

    // Region El
    let capitalEl = document.createElement("p");
    capitalEl.textContent ="Capital: "
    capitalEl.innerHTML += `<span class="info-text">${country.capital}</span`;
    capitalEl.classList.add("info-header");
    divEl.appendChild(capitalEl);

    divEl.addEventListener("click", function(){
        OpenInfoView(country);
    })
}

function OpenInfoView(country:Country){
    console.log("info view opens");
    SwitchView();
    overviewModul?.classList.add("hide");
    
    while(borderButtons?.firstChild){
        borderButtons.firstChild.remove();
    }
    
    //Open info view
    infoViewModul?.classList.remove("hide");
    console.log(country);
    //Populate info view with country info
    infoImg?.setAttribute("src",country.flags.png);
    infoName!.textContent = country.name.common;
    infoNativeName!.textContent =  country.altSpellings[1];
    infoPopulation!.textContent = country.population.toLocaleString("en-GB");
    infoRegion!.textContent = country.region;
    infoSubRegion!.textContent = country.subregion;
    infoCapital!.textContent = country.capital[0];
    infoTopLevelDomain!.textContent = country.cca2;
    /* infoCurrencies!.textContent = country.currencies.constructor.name.toString();
    console.log(country.languages);
    country.languages.forEach(lang => {
        infoLanguages!.textContent += ` ${lang}`;
    }); */
    if(country.borders && country.borders.length > 0){
        country.borders.forEach(countryBorder => {
            let buttonEl = document.createElement("button");
            buttonEl.textContent = countryBorder;
            borderButtons?.appendChild(buttonEl);
        });
    }

    else{
        let pEl = document.createElement("p");
        pEl.textContent = "No Borders";
        borderButtons?.appendChild(pEl);
    }
    
    
}




