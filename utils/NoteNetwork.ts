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

    static async insertNote(note:INote) {
        const result = await NetworkRequests.postRequest('createNote/', note);
        return {
            note: note,
            statusCode: result.getStatusCode()
        }
    }

    static async updateNote(note:INote) {
        const result = await NetworkRequests.postRequest(`updateNote/id=${note.id}/`, note);
        return {
            note:note,
            statusCode: result.getStatusCode()
        }
    }

    static async deleteNote(note:INote) {
        const result = await NetworkRequests.deleteRequest(`deleteNote/id=${note.id}/`);
        return {
            statusCode: result.getStatusCode()
        }
    }

    static async filterNotes(filter:string) {
        const result = await NetworkRequests.getRequest(`filterNote/filterSearch=${filter}/`);
        const notes:INote[] = result.getJson() as INote[];
        return {
            notes: notes,
            statusCode: result.getStatusCode()
        }
    }

}

export default NoteNetwork;