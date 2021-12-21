//DEFINES
const host = "https://ineighborhood.herokuapp.com";
// const host = "http://localhost:8080";
//GET PARAMS
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id;
const crud = params.crud;
//PAGE LOADER SELECTOR
$(document).ready(function () {
    console.log("got here crud is:"+crud+" id is:"+id);
    if (crud){
        if (id){
            showSystemForm(id);
        }
        else{
            showSystemForm(-1);
        }
    }
    else{
        showAllSystems();
    }
});
//~~~~~~~SYSTEM LIST~~~~~~~~~~~~~~~~~
function showAllSystems() {
    $.ajax({
        url: "https://ineighborhood.herokuapp.com/api/neighborhoodsystem",
        type: "GET",
        success: (systems) => {
            createSystemTable(systems);
        }
    });
}
function createSystemTable(systems) {
    const tableStructue =
    '<table class="table" id="systemstable">'+
        '<thead class="thead-dark">'+
            '<tr>'+
                '<th scope="col">ID</th>'+
                '<th scope="col">Name</th>'+
                '<th scope="col">Address</th>'+
                '<th scope="col">IP</th>'+
                '<th scope="col">Mode</th>'+
                '<th scope="col">Type</th>'+
                '<th scope="col">Options</th>'+
            '</tr>'+
        '</thead>'+
        '<tbody>'+
        '</tbody>'+
    '</table>';
    $('#mainsectionflex').empty().append(tableStructue);
    $('#systemstable').append(systems);
    systems.forEach(s => {
        $("table tbody").append(
            '<tr>' +
                '<th scope="row">' + s.id + '</th>' +
                '<td>' + s.name + '</td>' +
                '<td>' + s.address + '</td>' +
                '<td>' + s.ip + '</td>' +
                '<td>' + s.mode + '</td>' +
                '<td>' + s.type + '</td>' +
                '<td>' + '<a href="home.html?crud=edit&id='+s.id+'"><span  class="btn btn-info editbtnclass" id="editbtnid-' + s.id + '" h>Edit/Delete</span></a></td>'+
            '</tr>'
        );
    });
}
//~~~~~~~system form~~~~~~~~~~~~~~~~~
function showSystemForm(systemId){
    createSystemForm();
    var stateOfPage = "DELETE/EDIT";
    if (systemId==-1){
        stateOfPage = "ADD";
    }
    if (stateOfPage == "DELETE/EDIT"){
        setFormForEditDelete(systemId);
    }
    
}
async function createSystemForm(systemId) {
    const formStructure =
    '<form class="formclass" id="systemForm>'+
        '<input type="hidden" id="systemId" name="systemId" value="'+systemId+'">'+
        '<div class="form-outline mb-4">'+
            '<label class="form-label" for="form6Example3">Name:</label>'+
            '<input type="text" id="name" name="name" class="form-control" required/>'+
        '</div>'+
        '<div class="form-outline mb-4">'+
            '<label class="form-label" for="form6Example4">Address:</label>'+
            '<input type="text" id="address" name="address" class="form-control" required/>'+
        '</div>'+
        '<div class="form-outline mb-4">'+
            '<label class="form-label" for="form6Example5">IP:</label>'+
            '<input type="text" id="ip" name="ip" class="form-control" required/>'+
        '</div>'+
        '<div class="col-12">'+
            '<label class="visually-hidden" for="inlineFormSelectPref">Program:</label>'+
            '<select class="select" id="program" name="program">'+
            '</select>'+
        '</div>'+
        '<div class="col-12">'+
            '<label class="visually-hidden" for="inlineFormSelectPref">Mode:</label>'+
            '<br />'+
            '<select class="select" id="mode" name="mode">'+
                '<option value="automate">Automate</option>'+
                '<option value="manual-on">Manual On</option>'+
                '<option value="manual-off">Manual Off</option>'+
            '</select>'+
        '<div class="col-12">'+
            '<label class="visually-hidden" for="inlineFormSelectPref">Type</label>'+
            '<br/>'+
            '<select class="select" id="type" name="type">'+
                '<option value="trafficLights">Traffic light</option>'+
                '<option value="streetLights">Headlight</option>'+
            '</select>'+
        '</div>'+
        '<div id="button place">'+
        '</div>'+
    '</form>';
    $('#mainsectionflex').empty().append(formStructure);
}
async function setFormForEditDelete(systemId) {
    const res_Check_If_System_Exists = await fetch(`${host}/api/neighborhoodsystem/${systemId}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const system_Resjson = await res_Check_If_System_Exists.json();
    if (!(res_Check_If_System_Exists.status == 200)) {
            alert("System retriving Error going. Going back to add mode");
            window.location.href = 'home.html';
        }
    else {
        document.getElementById("systemId").value = system_Resjson.id;
        document.getElementById("name").value = system_Resjson.name;
        document.getElementById("address").value = system_Resjson.address;
        document.getElementById("program").value = system_Resjson.program;
        document.getElementById("ip").value = system_Resjson.ip;
        document.getElementById("mode").value = system_Resjson.mode;
        document.getElementById("type").value = system_Resjson.type;
        document.getElementById("button place").append(
            '<button type="submit" class="btn btn-primary btn-block mb-4" id="submitButton">Update</button>'+
            '<button type="button" class="btn btn-primary btn-block mb-4" id="deleteButton">Delete</button>'
        )
    }
}
async function setFormForAdd() {
    document.getElementById("button place").append(
        '<button type="submit" class="btn btn-primary btn-block mb-4" id="submitButton">Create</button>'
    )    
}
async function setValuesForProgram(){   //WHAT IS THIS?
    const res_Get_all_Programs = await fetch(`${host}/api/program`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const resjson = await res_Get_all_Programs.json();
    const program_select = document.getElementById('program');
    resjson.forEach(element => {
        var program_item = document.createElement('option');
        program_item.value = element.id;
        program_item.innerHTML = `${element.id}:${element.name}`;
        program_select.appendChild(program_item);
    });
}
async function submitForm(){
    const formObj = document.getElementById("systemForm");
    formObj.addEventListener("submit", async function (event) {
        // stop form submission
        event.preventDefault();
        // validate the form
        const nameValid = formObj.elements["name"].value;
        if (!(/^[A-Za-z0-9\s]+$/.test(nameValid))) {
            alert("You have entered an invalid system name! you can use only chars and numbers");
            return false;
        }
        const addressValid = formObj.elements["address"].value;
        const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipValid = formObj.elements["ip"].value;
        if (!(ipformat.test(ipValid))) {
            alert("You have entered an invalid IP address!");
            return false;
        }
        const modeValid = formObj.elements["mode"].value;
        const typeValid = formObj.elements["type"].value;
        const programValid = formObj.elements["program"].value;
        const res_Check_If_Program_Exists = await fetch(`${host}/api/program/${programValid}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (res_Check_If_Program_Exists == 404) {
            alert("Program ID is invalid, It does not exist!");
            return false;
        }
        if (res_Check_If_Program_Exists == 400 || res_Check_If_Program_Exists == 401) {
            alert("Program ID is invalid!");
            return false;
        }
        const formvalue = {
            name: nameValid,
            address: addressValid,
            ip: ipValid,
            mode: modeValid,
            type: typeValid,
            program: Number(programValid),
        }
        const stringBody = JSON.stringify(formvalue);
        const host_To_Send = (state_Of_Page == "ADD") ? `${host}/api/neighborhoodsystem` : `${host}/api/neighborhoodsystem/${systemId}`;
        const method_Of_Operation = (state_Of_Page == "ADD") ? "POST" : "PUT";
        const res = await fetch(host_To_Send, {
            method: method_Of_Operation,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringBody
        })
        const resjson = await res.json();
        if (res.status == 200) {
            window.location.href = "home.html";
            return true;
        }
        alert(resjson.msg);
        return false;
    });
}



// A $( document ).ready() block.
$(document).ready(function () {
    setValuesForProgram();
});



async function deleteItem(id) {
    const res = await fetch(`http://localhost:8080/api/neighborhoodsystem/${id}`, {
        method: "DELETE"
    })
    const resjson = await res.json();
    if(resjson.status == 200){
        console.log("succes");
        window.location.href = "home.html";
    }
    window.location.href = "home.html";
    console.log(resjson);
}
function setAllEditButtons() {
    return;
}
