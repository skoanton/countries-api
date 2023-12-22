const BASE_URL = "https://restcountries.com/v3.1/all";
const tempURL = "https://restcountries.com/v3.1/all"


//Elements
const overviewCards : HTMLElement | null = document.getElementById("overviewCards");
const filterOption: HTMLSelectElement | null  = document.getElementById("filterOption") as HTMLSelectElement | null;

interface Country{
    altSpellings:string[],
    name:{
        common:string,
    },
    population:number,
    region:string,
    capital:string[],
    subreigon: string,
    cca2:string;
    currencies:string[],
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


PopulateCards();

async function PopulateCards(){
    let countrys: Country[] = await FetchCountries();
    console.log(filterOption?.value);
    RemoveCards();
    countrys.forEach(country => { 

        let filterValue = filterOption?.value.toLowerCase();
        if(country.region.toLowerCase() === filterValue || filterValue === ""){
           
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
    console.log("creating stuff"); 
    //Create card Div
    let divEl = document.createElement("div");
    divEl.classList.add("overview-card");
    overviewCards?.appendChild(divEl);

    //Create Image Element
    let imgEl = document.createElement("img");
    imgEl.setAttribute("src", country.flags.png);
    divEl.appendChild(imgEl);

    //Create p Elements
    // population El
    let populationEl = document.createElement("p");
    populationEl.textContent = "Population: ";
    populationEl.innerHTML += `<span class="infoText">${country.population}</span`;
    populationEl.classList.add("infoHeader");
    divEl.appendChild(populationEl);

    // Region El
    let regionEl = document.createElement("p");
    regionEl.textContent ="Region:"
    regionEl.innerHTML += `<span class="infoText">${country.region}</span`;
    regionEl.classList.add("infoHeader");
    divEl.appendChild(regionEl);

    // Region El
    let capitalEl = document.createElement("p");
    capitalEl.textContent ="Capital:"
    capitalEl.innerHTML += `<span class="infoText">${country.capital}</span`;
    capitalEl.classList.add("infoHeader");
    divEl.appendChild(capitalEl);
}