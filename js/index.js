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

document.querySelector('#form-edit-student button[type="submit"]').addEventListener('click', () => {
    const data = {
        'firstname': formEditStudent.elements.firstname.value,
        'lastname': formEditStudent.elements.lastname.value,
        'email': formEditStudent.elements.email.value,
        'git': formEditStudent.elements.git.value,
        'info': formEditStudent.elements.info.value
    };
    // console.log(data);

    const id = formEditStudent.elements.id.value;

    api.updateStudentById(id, data).then(response => {
        const element = document.querySelector(`#students-list [data-id="` + id +`"]`);

        element.innerText = `${response.firstname} ${response.lastname}`;
    }).catch(error => {
        console.error(error)
    });

   
});

document.querySelector('#form-add-student button[type="submit"]').addEventListener('click', () => {
    const formAddStudent = document.querySelector('#form-add-student');
    const { elements } = formAddStudent;

    const data = {
        firstname: elements.firstname.value,
        lastname: elements.lastname.value,
        email: elements.email.value,
        git: elements.git.value,
        info: elements.info.value,
        
    };

    const elementsWithError = formAddStudent.querySelectorAll('.has-error');
    if (elementsWithError.length) {
        elementsWithError.forEach(element => {
            element.classList.remove('has-error');
        })

    }

// ----------вариант проверки на пустое поле с вложенными ифами (некрасиво)----------------------------
    // if (!data.firstname || !data.lastname) {
    //     if (!data.firstname) {
    //         formAddStudent.querySelector('[name="firstname"]').parentNode.classList.add('has-error')
    //     }
    
    //     if (!data.lastname) {
    //         formAddStudent.querySelector('[name="lastname"]').parentNode.classList.add('has-error')
    //     }
    // }
// --------------------------------------
    let hasError = false


    if (!data.firstname) {
        formAddStudent.querySelector('[name="firstname"]').parentNode.classList.add('has-error')
        hasError = true;
    }

    if (!data.lastname) {
        formAddStudent.querySelector('[name="lastname"]').parentNode.classList.add('has-error')
        hasError = true;
    }

    if (hasError) return;

    api.createStudent(data).then(response => {
        const { name: id } = response;

        data.id = id;
        addStudent(data);

        formAddStudent.reset();
    }).catch(error => {
        console.error(error);
    });
});

document.querySelector('#form-edit-student button[type="button"]').addEventListener('click', () => {
    const id = document.querySelector('#form-edit-student [name="id"]').value;
    if (!id) return;


    console.log(id);
    api.deleteStudent(id).then(() => {
        document.querySelector(`#students-list [data-id="` + id +`"]`).remove();
    }).catch(error => {
        console.error(error);
    });
});;
;
