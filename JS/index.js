const form = document.querySelector(".form");
const nameInput = document.querySelector("#name");
const idInput = document.querySelector("#id");
const courseInput = document.querySelector("#course");
const birth = document.querySelector("#birth");
const bloodGroup = document.querySelector("#blood-group");
const phone = document.querySelector("#phone");
const btnSubmit = document.querySelector(".submit");
const tBody = document.querySelector(".table-body");
let objID = document.querySelector('#objID');


form.addEventListener("submit", (e) => {

  e.preventDefault();

if(!objID.value) {
   studentObj = {

      name: nameInput.value,
      course: courseInput.value,
      id:idInput.value,
      birth: birth.value,
      bloodGroup: bloodGroup.value,
      phone: phone.value

    };

    objID.value = Date.now();
    
  }else{
    
    studentObj  = JSON.parse(localStorage.getItem(objID.value))
    studentObj.name= nameInput.value;
    studentObj.course = courseInput.value;
    studentObj.id = idInput.value,
    studentObj.birth = birth.value;
    studentObj.bloodGroup = bloodGroup.value;
    studentObj.phone = phone.value;
  }
  
  localStorage.setItem(objID.value, JSON.stringify(studentObj));
  form.reset();
  
  objID.value = ''
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
      let td = document.createElement('td');

      btnEdit.classList.add("edit");
      btnDelete.classList.add("delete");

      btnEdit.textContent = "Edit";
      btnDelete.textContent = "Delete";

      tr.innerHTML = `
          <td>${keyArray.indexOf(key) + 1}</td>
          <td>${takenObj.name}</td>
          <td >${takenObj.id}</td>
          <td>${takenObj.course}</td>
          <td>${takenObj.birth}</td>
          <td>${takenObj.bloodGroup}</td>
          <td>${takenObj.phone}</td>
          </td>`;

      td.append(btnEdit, btnDelete);
      tr.appendChild(td);
      tBody.append(tr);

      btnDelete.addEventListener("click", () => {
        localStorage.removeItem(key);
        print();
      });

      btnEdit.addEventListener('click', () => {

        nameInput.value = takenObj.name,
        courseInput.value = takenObj.course,
        birth.value = takenObj.birth,
        bloodGroup.value = takenObj.bloodGroup,
        phone.value = takenObj.phone,
        objID.value = key;
        console.log(takenObj);

        print()

      })

    }
  }
}
print()
