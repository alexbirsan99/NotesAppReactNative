class NetworkRequestResult {
    #statusCode:number;
    #json:any;

    constructor (statusCode:number, json:any) {
        this.#statusCode = statusCode;
        this.#json = json;
    }

    getStatusCode():number {
        return this.#statusCode;
    }

    getJson():any {
        return this.#json;
    }
}

export default NetworkRequestResult;