export default class API {
    server = null;
    version = 0;
    
    constructor(serverName, version) {
        this.server = serverName.trim();
        this.version = version;
    }

    getStudentsList() {
        return fetch(`${this.server}/api/v${this.version}/students.json`).then(result => result.json()) ;
    }

    getStudentById(id) {
        return fetch(`${this.server}/api/v${this.version}/students/${id}.json`).then(result => result.json());
    }

    updateStudentById(id, data) {
        return fetch(`${this.server}/api/v${this.version}/students/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(result => result.json()) ;
    }

    createStudent(data) {
        return fetch(`${this.server}/api/v${this.version}/students/.json`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(result => result.json()) ;
    }

    deleteStudent(id) {
        return fetch(`${this.server}/api/v${this.version}/students/${id}.json`, {
            method: 'DELETE'
        }).then(result => result.json()) ;
    }
}