
import NetworkRequestResult from "../objects/RequestResult";

abstract class NetworkRequests {

    static BASE_URL = 'http://127.0.0.1:8000/api/';

    static async getRequest(URL: string): Promise<NetworkRequestResult> {
        let result = await fetch(this.BASE_URL + URL, {
            method: 'GET'
        });
        const resultJSON = await result.json();
        return new NetworkRequestResult(result.status, resultJSON);
    }


    static async postRequest(URL: string, body: any): Promise<NetworkRequestResult> {
        let result = await fetch(this.BASE_URL + URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const resultJSON = await result.json();
        return new NetworkRequestResult(result.status, resultJSON);
    }


    static async deleteRequest(URL: string): Promise<NetworkRequestResult> {
        let result = await fetch(this.BASE_URL + URL, {
            method: 'DELETE'
        });
        const resultJSON = await result.json();
        return new NetworkRequestResult(result.status, resultJSON);
    }

}

export default NetworkRequests;