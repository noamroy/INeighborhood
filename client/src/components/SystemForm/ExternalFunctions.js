
import constants from '../../static/constants';


async function updateSystems(system, actionType, groupValue) {
    delete system['formState'];
    if (actionType === 'ADD') {
        delete system['id'];
    }
    console.log(system);
    const nameValid = system.name;
    if (!(/^[A-Za-z0-9\s]+$/.test(nameValid))) {
        alert("You have entered an invalid system name! you can use only chars and numbers");
        return false;
    }
    const addressValid = system.address;
    const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipValid = system.ip;
    if (!(ipformat.test(ipValid))) {
        alert("You have entered an invalid IP address!");
        return false;
    }
    const modeValid = system.mode;
    const typeValid = system.type;
    const programValid = system.program;
    const res_Check_If_Program_Exists = await fetch(`${constants.hostNoam}program/${programValid}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
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
        group: groupValue,
        program: Number(programValid),
    }
    const stringBody = JSON.stringify(formvalue);
    const host_To_Send = (actionType == "ADD") ? `${constants.hostNoam}neighborhoodsystem` : `${constants.hostNoam}neighborhoodsystem/${system.id}`;
    const method_Of_Operation = (actionType == "ADD") ? "POST" : "PUT";
    const res = await fetch(host_To_Send, {
        method: method_Of_Operation,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: stringBody
    })
    const resjson = await res.json();
    if (res.status == 200) {
        window.location.href = '/dashboard';
        return true;
    }
    alert(resjson.msg);
    return false;
}

async function setValuesForProgram() {
    const res_Get_all_Programs = await fetch(`${constants.hostNoam}program`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`

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

export { updateSystems, setValuesForProgram };