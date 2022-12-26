import { codeCountry} from "./app_maps.js";

export const doApi = async (_searchQ) => {
    

        try {
            let url = `https://restcountries.com/v3.1/name/${_searchQ}`;

            let resp = await axios.get(url);
            console.log(resp.data);
            createFile(resp.data)
        }
        catch (err) {
            console.log(err);
        }
    
}

export const createFile = (_arr) => {
    document.querySelector("#id_name").innerHTML = _arr[0].name.common;
    document.querySelector("#id_flag").src = _arr[0].flags.png;
    document.querySelector("#id_capital").innerHTML = _arr[0].capital[0];
    document.querySelector("#id_pop").innerHTML = _arr[0].population.toLocaleString();
    if(Object.values(_arr[0].languages)[1]==undefined)
    document.querySelector("#id_lan").innerHTML = Object.values(_arr[0].languages)[0];
    else
    document.querySelector("#id_lan").innerHTML = Object.values(_arr[0].languages)[0] + ", " + Object.values(_arr[0].languages)[1];
    
    document.querySelector("#id_coin").innerHTML = Object.keys(_arr[0].currencies) + " "
        + Object.values(_arr[0].currencies)[0].name + " "
        + Object.values(_arr[0].currencies)[0].symbol;

    let id_row = document.querySelector("#id_row");

    if (_arr[0].borders) {
        id_row.innerHTML = " ";
        _arr[0].borders.forEach(item => {
            

                let borderStates = document.createElement("button");
                borderStates.className = "inline btn btn-outline-danger col me-5 mb-2";
                borderStates.innerHTML = codeCountry(item);
                id_row.append(borderStates);

                borderStates.addEventListener("click", () => {
                    doApi(borderStates.innerHTML);
                })
            
        });


    } else {
        id_row.innerHTML = `
        <h2 class="text-danger display-6">----------- </h2>
        `
    }

    createMap(_arr[0].latlng[0], _arr[0].latlng[1]);

}

const createMap = (_longitude, _Latitude) => {
    document.querySelector("#id_map").src = `
    https://maps.google.com/maps?q=${_longitude},${_Latitude}&z=5&ie=UTF8&iwloc=&output=embed`;

     
}


