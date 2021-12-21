const formObj = document.getElementById("addDeviceForm");

const host = "https://ineighborhood.herokuapp.com";
// const host = "http://localhost:8080";

var state_Of_Page = "ADD";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id_Of_System = params.id;

async function setFormForEdit(id_Of_System) {
    if (state_Of_Page = "EDIT") {

        const res_Check_If_System_Exists = await fetch(`${host}/api/neighborhoodsystem/${id_Of_System}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const system_Resjson = await res_Check_If_System_Exists.json();
        if (!(res_Check_If_System_Exists.status == 200)) {
            alert("System retriving Error going. Going back to add mode");
            state_Of_Page = "ADD";
        }
        else {
            document.getElementById("name").value = system_Resjson.name;
            document.getElementById("address").value = system_Resjson.address;
            document.getElementById("program").value = system_Resjson.program;
            document.getElementById("ip").value = system_Resjson.ip;
            document.getElementById("mode").value = system_Resjson.mode;
            document.getElementById("type").value = system_Resjson.type;

        }
    }
}

if (params.id) {
    state_Of_Page = "EDIT";
    setFormForEdit(id_Of_System);
}

async function setValuesForProgram(){
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
        var progam_item = document.createElement('option');
        progam_item.value = element.id;
        progam_item.innerHTML = `${element.id}:${element.name}`;
        program_select.appendChild(progam_item);
    });
}

formObj.addEventListener("submit", async function (event) {
    // stop form submission
    event.preventDefault();
    const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // validate the form
    const nameValid = formObj.elements["name"].value;
    if (!(/^[A-Za-z0-9\s]+$/.test(nameValid))) {
        alert("You have entered an invalid system name! you can use only chars and numbers");
        return false;
    }
    const addressValid = formObj.elements["address"].value;
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
    const host_To_Send = (state_Of_Page == "ADD") ? `${host}/api/neighborhoodsystem` : `${host}/api/neighborhoodsystem/${id_Of_System}`;
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

// A $( document ).ready() block.
$(document).ready(function () {
    setValuesForProgram();
});
