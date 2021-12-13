
function getAllSystems() {
    $.ajax({
        url: "https://ineighborhood.herokuapp.com/api/neighborhoodsystem",
        type: "GET",
        success: (systems) => {
            recreateSystemTable(systems);
        }
    });
}


function recreateSystemTable(systems) {
    const tableStructue=
    '<table id="customers">' +
    '<tr>' + 
        '<th scope="col">ID</th>' +
        '<th scope="col">Name</th>'+
        '<th scope="col">Address</th>'+
        '<th scope="col">IP</th>'+
        '<th scope="col">Mode</th>'+
        '<th scope="col">Type</th>'+
        '<th scope="col">Status</th>'+
    '<tr>'+
    '<tbody>'+
    '</tbody>'+
    '</table>';

    $('#systemstable').append(systems);

    systems.forEach(s => {
        $("table tbody").append(
            '<tr>'+
                '<th scope="row">'+s.id+'</th>'+
                '<td>'+s.name+'</td>'+
                '<td>'+s.address+'</td>'+
                '<td>'+s.ip+'</td>'+
                '<td>'+s.mode+'</td>'+
                '<td>'+s.type+'</td>'+
                '<td>'+(s.active? "On":"Off") +'</td>'+
            '</tr>'
        );
        
    });
     
}

// A $( document ).ready() block.
$( document ).ready(function() {
    getAllSystems();
});

