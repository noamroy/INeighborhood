
import constants from '../../static/constants';


async function updateProgram(program, actionType) {
    delete program['formState'];
    if (actionType === 'ADD') {
        delete program['id'];
    }
    const nameValid = program.name;
    if (!(/^[A-Za-z0-9\s]+$/.test(nameValid))) {
        alert("You have entered an invalid program name! you can use only chars and numbers");
        return false;
    }
    const startSourceValid = program.startSource;
    const startDelayValid = program.startDelay;
    const finishSourceValid = program.finishSource;
    const finishDelayValid = program.finishDelay;
    const formvalue = {
        name: nameValid,
        startSource: startSourceValid,
        startDelay: parseInt(startDelayValid),
        finishSource: finishSourceValid,
        finishDelay: parseInt(finishDelayValid),
        currentStatus: false,
    }
    const stringBody = JSON.stringify(formvalue);
    const host_To_Send = (actionType == "ADD") ? `${constants.hostNoam}program` : `${constants.hostNoam}program/${program.id}`;
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
export { updateProgram };