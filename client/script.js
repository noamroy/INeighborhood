function getAllStock() {
    $.ajax({
        url: "http://hackaton-onlyone.herokuapp.com/api/orders",
        type: "GET",
        success: (stock) => {
            recreateStockTable(stock);
        }
    });
}

function fillInventory() {
    $.ajax({
        url: "http://hackaton-onlyone.herokuapp.com/api/provisions",
        type: "GET",
        success: (inventory) => {
            fillInventoryData(inventory);
        }
    });
}
function fillInventoryData(inventory){
    console.log(inventory);
    $("#flour").text(inventory.flour);
    $("#cheese").text(inventory.cheese);
    $("#tomatos").text(inventory.tomatos);
    $("#olives").text(inventory.olives);
    $("#mushrooms").text(inventory.mushrooms);
    $("#pineapples").text(inventory.pineapples);
}

function recreateStockTable(stock) {
    const tableStructue=
    '<table id="customers">' +
    '<tr>' + 
        '<th>Date</th>'+
        '<th>Time</th>'+
        '<th>Order</th>'+
        '<th>Order Number</th>'+
    '<tr>'+
    '<tbody>'+
    '</tbody>'+
    '</table>';

    $('#customers').append(stock);

    stock.forEach(s => {
        $("table tbody").append(
            '<tr>'+
                '<th>'+ s.id+ '</th>'+
                '<th>'+ s.time+ '</th>'+
                '<th>'+ s.olivepizza+ '</th>'+
                '<th>'+ s.mushroompizza+ '</th>'+
                '<th>'+ s.pineapplepizza+ '</th>'+
            '</tr>'
        );
        
    });
     
}

getAllStock();
fillInventory();
