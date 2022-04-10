
import NetworkRequestResult from "../objects/RequestResult";

abstract class NetworkRequests {

    static BASE_URL = 'http://127.0.0.1:8000/api/';

    static async getRequest(URL:string):Promise<NetworkRequestResult> {
        let result = await fetch(this.BASE_URL + URL, {
            method: 'GET'
        });
        const resultJSON = await result.json();
        return new NetworkRequestResult(result.status, resultJSON);
    }

}

export default NetworkRequests;