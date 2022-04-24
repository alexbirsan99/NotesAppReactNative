import NetworkRequests from "./NetworkRequests";


abstract class TagNetwork {

    static tags:ITag[] = [];

    static async getTag(id:string) {
        const URL = `tags/id=${id}/`;
        const result = await NetworkRequests.getRequest(URL);
        const tagJSON = await result.getJson();
        return {
            tag: tagJSON as ITag,
            statusCode: result.getStatusCode(),
        };
    }

    static async loadTags() {
        const URL = `tags/`;
        const result = await NetworkRequests.getRequest(URL);
        const tagJSON = await result.getJson();
        return {
            tags: tagJSON as ITag[],
            statusCode: result.getStatusCode(),
        };
    }
}

export default TagNetwork;