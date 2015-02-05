

$("#btnSubmit").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        _validateInput();
    }
});

function _validateIsbnNumber() {
    var hasError = false;
    if ($.trim($('#textIsbnNum').val()) == "") {
        $('#textIsbnNum').addClass('error');

        hasError = true;
    }
    else {
        $('#textIsbnNum').removeClass('error');

    }

    if (hasError == true) {
        return false;
    }
    else {
        return _getDataFromIsbnNumber();
    }
    return false;
}

function _getDataFromIsbnNumber() {
   // _GetPrice();
    $.ajax({
        async: false,
        type: "POST",
        url: "Default.aspx/GetDataByISBNNumber",
        data: '{ISBNNumber: "' + $('#textIsbnNum').val() + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#mvMain').html("");

            $('#loader').show();
        },
       
        success: OnSuccess,
        complete: function () {
            $('#loader').hide();
        },
        failure: function (response) {
            alert(response.d);
            $('#loader').hide();
        }
    });
}
function OnSuccess(response) {
    //alert(response.d);
    var data = CreateTableView(response.d, 'CssClassName', true);
    //alert(data);
   // $("#bookContainer").append(CreateTableView(response.d, 'CssClassName', true));

    $("#mvMain").append(CreateDivView(response.d));
}


function CreateTableView(objArray, theme, enableHeader) {
            
    // set optional theme parameter
    if (theme === undefined) {
        theme = ''; //default theme
    }
 
    if (enableHeader === undefined) {
        enableHeader = true; //default enable headers
    }
 
    // If the returned data is an object do nothing, else try to parse
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
 
    var str = '<table class="' + theme + '">';
 
    // table head
    if (enableHeader) {
        str += '<thead><tbody><tr>';
        for (var index in array.products[0]) {
            if (index == "title" || index == "imageurl") {
                str += '<th scope="col">' + index + '</th>';
                //break;
            }
        }
        str += '</tr></tbody></table></thead>';
    }
 

    // table body
    str += '<tbody>';
    for (var i = 0; i < array.products.length; i++) {
        str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
                
        for (var index in array.products[i]) {
            if (array.products[i][index] == null) {
                str += '<td> </td>';
            }
            else if (index == "title" || index == "imageurl") {


                if (index == "imageurl") {
                    str += '<td><img class="inline" src="' + array.products[i][index] + '" /></td>';
                }
                else {
                    str += '<td>' + array.products[i][index] + '</td>';
                }
            }                    
        }
        str += '</tr>';
    }
    str += '</tr></tbody>'
    str += '</table>';
    return str;
}

function CreateDivView(objArray) {

   
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    
   var str = '<div style="float:left;">';
    for (var i = 0; i < array.products.length; i++) {
        var id;
        for (var index in array.products[i]) {
            if (index == "id") {
                id = array.products[i][index];
            }
        }
        for (var index in array.products[i]) {


            if (array.products[i][index] == null) {
                
            }
         
            else if (index == "title" || index == "imageurl" || index == "id") {


                if (index == "imageurl") {
                    str += '<div class="box">';
                    //str +='<img class="inline" src="' + array.products[i][index] + '" />';
                    str +=    '<span class="galleryImage">'
                str +=   '<a href="" data-gallery="">';
                str +=   '<img class="inline" src="' + array.products[i][index] + '" />';
                str +=    '</a>';
                str += '<input value="11.jpg" id="delete_CheckBox" name="delete_CheckBox" type="checkbox" onclick="_UpdateByISBNNumberAndChecked(' + id + ','+ this.checked +');" />';
               
                str +=   '</span>';

                str +=    '</div>';
                }
                else if (index == "id") {
                    str += '<span class="spnCls" >' + array.products[i][index] + ' </span>';
                }
                else if (index == "title") {
                    str += '<div class="title">' + array.products[i][index] + '</div>';
                }
            }
        }
        str += '</div>';
    }
 
    return str;
}


function _UpdateByISBNNumberAndChecked(BookID, Checked) {
    $.ajax({
        async: false,
        type: "POST",
        url: "Default.aspx/UpdateByISBNNumberAndChecked",
        data: '{ISBNNumber: "' + $('#textIsbnNum').val() + '", BookID: "' + BookID + '" , Checked: "' + Checked + '"  }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#mvMain').html("");

            $('#loader').show();
        },
       
        success: OnSuccess,
        complete: function () {
            $('#loader').hide();
        },
        failure: function (response) {
            alert(response.d);
            $('#loader').hide();
        }
    });
}

function GetIdFromJson(index, array) {
    var id = "";
    
    return id;

}

function _GetPrice() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var url = "http://api.saxo.com/v1/Prices/Prices.xml?key=08964e27966e4ca99eb0029ac4c4c217&ProductID=3042442";
    xmlhttp.open("GET",url, true);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;

    $.get(url, function (responseText) {
        alert(responseText);
    });




}