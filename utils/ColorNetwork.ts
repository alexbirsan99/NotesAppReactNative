import NetworkRequests from "./NetworkRequests";


abstract class ColorNetwork {

    static #colors:IColor[] = [];

    static async getAllColors() {
        const URL  = 'colors/';

        if(this.#colors.length == 0) {
            let result = await NetworkRequests.getRequest(URL);
            this.#colors = result.getJson() as IColor[];
        }

        return this.#colors;
    }


    static async getColor(colorID:string) {
        if(this.#colors.length == 0) {
            await this.getAllColors();
        }


        return this.#colors.filter(element => element.id.replace(/-/g, '') === colorID)[0];
    }
}


export default ColorNetwork;