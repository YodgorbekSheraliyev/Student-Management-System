const form = document.querySelector(".form");
const nameInput = document.querySelector("#name");
const idInput = document.querySelector("#id");
const courseInput = document.querySelector("#course");
const birth = document.querySelector("#birth");
const phone = document.querySelector("#phone");
const btnSubmit = document.querySelector(".submit");
const tBody = document.querySelector(".table-body");
const btnAdd = document.querySelector('.btn-add')
const  inputSearch = document.querySelector('.search-input')
let objID = document.querySelector("#objID");
const tableRows  = document.querySelectorAll('.table-body .tr')
const btnCancel = document.querySelector('.cancel');
const menu = document.querySelector('.burger-menu');

menu.addEventListener('click', () => {
  document.querySelector('.nav .container').classList.toggle('navbar');
  document.querySelector('.header-list').classList.toggle('active-list')
})

btnAdd.addEventListener('click', () => {
  form.style.display = 'block'
})
btnCancel.addEventListener('click', () => {
  form.style.display = 'none'

})
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // form.style.display = 'none'

  if (!objID.value) {
    studentObj = {
      name: nameInput.value,
      course: courseInput.value,
      id: idInput.value,
      birth: birth.value,
      phone: phone.value,
    };

    objID.value = Date.now();
  } else {
    studentObj = JSON.parse(localStorage.getItem(objID.value));
    studentObj.name = nameInput.value;
    studentObj.course = courseInput.value;
    (studentObj.id = idInput.value), (studentObj.birth = birth.value);
    studentObj.phone = phone.value;
  }
  localStorage.setItem(objID.value, JSON.stringify(studentObj));
  form.reset();
  objID.value = "";
  print();

});

function print() {
  tBody.innerHTML = "";

  for (const key in localStorage) {

    if (localStorage.hasOwnProperty(key)) {
      const takenObj = JSON.parse(localStorage.getItem(key));

      let keyArray = Object.keys(localStorage);

      let tr = document.createElement("tr");
      let btnEdit = document.createElement("button");
      let btnDelete = document.createElement("button");
      let td = document.createElement("td");

      tr.classList.add('tr')

      btnEdit.classList.add("edit");
      btnDelete.classList.add("delete");

      btnEdit.textContent = "Edit";
      btnDelete.textContent = "Delete";

      tr.innerHTML = `
          <td>${keyArray.indexOf(key) + 1}</td>
          <td class="user-name">${takenObj.name}</td>
          <td >${takenObj.id}</td>
          <td>${takenObj.course}</td>
          <td>${takenObj.birth}</td>
          <td>${takenObj.phone}</td>
          </td>`;

      td.append(btnEdit, btnDelete);
      tr.appendChild(td);
      tBody.append(tr);

      btnDelete.addEventListener("click", () => {
        localStorage.removeItem(key);
        print();
      });

      btnEdit.addEventListener("click", () => {
        (nameInput.value = takenObj.name),
          (courseInput.value = takenObj.course),
          (birth.value = takenObj.birth),
          (phone.value = takenObj.phone),
          (objID.value = key);
          form.style.display = 'block'


        print();
      });
    }
  }
}


print();
