import Srever from './api.js';
import { addStudent } from './functions.js';

const api = new Srever('https://frontend-lectures.firebaseio.com', 1);
const formEditStudent = document.querySelector('#form-edit-student');

api.getStudentsList().then(response => {

    // console.log(Object.keys(response)); //массив ключей объекта response
    // console.log(Object.values(response)); //массив значений объекта response
    // console.log(Object.entries(response)); //массив ключей и значений объекта response

    const students = Object.entries(response).map(item => {
        const [ id, student] = item;
        student.id = id;
    
        return student
    });
    
    // console.log(students);
    students.forEach(addStudent); //то же что и следующая строка
    // students.forEach(student => addStudent(student));

}).catch(error => {
    console.error(error);
});

document.body.addEventListener('click', event => {
    event.preventDefault();

    if(!event.target.hasAttribute('data-id')) return;

    const studentId = event.target.getAttribute('data-id');
    
    api.getStudentById(studentId).then(response => {
        
        for (let key in response) {
            formEditStudent.elements[key].value = response[key];            
        }

        formEditStudent.elements.id.value = studentId;
    });
});