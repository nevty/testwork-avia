import axios from "axios";


const instance = axios.create({
    baseURL: "https://front-test.beta.aviasales.ru",
})

export const ticketsAPI = {
    getSearchId(){
        return instance.get('/search');
    },
    getTickets(id){
        return instance.get(`/tickets?searchId=${id}`);
    },
}

