const formObj = document.getElementById("addDeviceForm");


formObj.addEventListener("submit", async function(event) {
    // stop form submission
    event.preventDefault();

    // validate the form
    const nameValid = formObj.elements["name"].value;
    const addressValid = formObj.elements["address"].value;
    const ipValid = formObj.elements["ip"].value;
    const modeValid = formObj.elements["mode"].value;
    const typeValid = formObj.elements["type"].value;
    const activeValid = formObj.elements["active"].value;
    const formvalue = {
        name: nameValid,
        address: addressValid,
        ip: ipValid,
        mode: modeValid,
        type: typeValid,
        active: activeValid,
    }
    console.log(formvalue);
    const stringBody = JSON.stringify(formvalue);
    console.log(stringBody);
    const res = await fetch("https://ineighborhood.herokuapp.com/api/neighborhoodsystem", {
        method: "POST",
        body: stringBody
    })
    const resjson = await res.json();
    console.log(resjson);
});