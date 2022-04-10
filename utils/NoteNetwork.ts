import NetworkRequests from "./NetworkRequests";

abstract class NoteNetwork {

    static async getNotes() {
       const result = await NetworkRequests.getRequest('notes/');
       const notes:INote[] = result.getJson() as INote[];
       return {
           notes: notes,
           statusCode: result.getStatusCode()
       }
    }

}

export default NoteNetwork;