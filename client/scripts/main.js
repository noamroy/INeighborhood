const { systemList } = require('./systemList');
const { systemForm } = require('./systemForm');
systemList.getAllNeighborhoodSystems

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id;
const CRUD = params.crud;
$(document).ready(function () {
    
    showAllSystems();
});