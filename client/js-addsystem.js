const formObj = document.getElementById("addDeviceForm");

// const host = "https://ineighborhood.herokuapp.com";
const host = "http://localhost:8080";

formObj.addEventListener("submit", async function (event) {
    // stop form submission
    event.preventDefault();
    const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // validate the form
    const nameValid = formObj.elements["name"].value;
    if(!(/^[A-Za-z\s]+$/.test(nameValid))){
        alert("You have entered an invalid private name!");
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
    const activeValid = formObj.elements["active"].value;
    const programValid = formObj.elements["program"].value;
    const res_Check_If_Program_Exists = await fetch(`${host}/api/program/${programValid}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    if(res_Check_If_Program_Exists == 404){
        alert("Program ID is invalid, It does not exist!");
        return false;
    }
    if(res_Check_If_Program_Exists == 400 || res_Check_If_Program_Exists == 401){
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
        active: Number(activeValid),
    }
    const stringBody = JSON.stringify(formvalue);
    const res = await fetch(`${host}/api/neighborhoodsystem`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: stringBody
    })
    const resjson = await res.json();
    if (res.status == 200) {
        console.log("succes");
        window.location.href = "home.html";
        return true;
    }
    alert(resjson.msg);
    return false;
});


