import { doApi } from "./maps_manager.js";

let btn_country = document.querySelectorAll(".btn_country");
let input_search = document.querySelector("#id_search");
let btn_search = document.querySelector("#btn_search");

export const declareEvents = () => {
    btn_country.forEach(country => {
        country.addEventListener("click", () => {
            doApi(country.innerHTML);
        })
    })
    btn_search.addEventListener("click", () => {
        doApi(input_search.value);
        input_search.value = "";
    })
}