const addUserBtn = document.getElementById('addUser')
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username')
const recordsDisplay = document.getElementById('records')
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');

if(objStr!=null){
    userArray = JSON.parse(objStr);
}
DisplayInfo();
const name = usernameTextField.value;
addUserBtn.onclick=()=>{
    if(edit_id!=null){
        // edit
        userArray.splice(edit_id,1,{'name': name})
    }else{
        // insert
        userArray.push({'name': name}); 
        edit_id = null;
    }
    saveInfo(userArray);
    usernameTextField.value = '';
    DisplayInfo();
    addUserBtn.innerText = btnText;
}

function saveInfo(userArray){
let str = JSON.stringify(userArray);
localStorage.setItem('users', str);
DisplayInfo();
}

function DisplayInfo(){
    let statement = '';
    userArray.forEach(user,i=> {
        statement += `<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick = 'EditInfo${i}'></i> <i class="btn btn-danger text-white fa fa-trash" onclick = 'DeleteInfo${i}'></i></td>
      </tr>`;
    });
    recordsDisplay.innerHTML = statement;
}

function EditInfo(){
edit_id = id ;
usernameTextField.value = userArray[id].name;
addUserBtn.innerText = 'saveChanges';
}

function DeleteInfo(id){
   userArray.splice(id,1);
   saveInfo(userArray);
  
}