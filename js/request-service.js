class RequestService {
   async get(url) {
        const response = await fetch(url, { method: 'GET' });

        const json = await response.json();

        return json;
    }
}

const requestService = new RequestService();

export default requestService;