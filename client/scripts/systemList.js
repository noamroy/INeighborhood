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
    $('#mainsectionflex').append(tableStructue);
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
                '<td>' + '<a href="addsystem.html?id='+s.id+'"><span  class="btn btn-info editbtnclass" id="editbtnid-' + s.id + '" h>Edit</span></a><span onclick="deleteItem('+s.id+')" class="btn btn-danger deltebtnclass" id="deltebtnid-' + s.id + '">Delete</span>' + '</td>' +
            '</tr>'
        );
    });
}
