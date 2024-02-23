import axios from "axios"

let baseUserURL="https://65d5689d3f1ab8c63436e7a7.mockapi.io/users"

export let createUser=(data)=>axios.post(baseUserURL,data)