
setInterval("getStoreData()",2000);
var getStoreData = function () {
    $.ajax({
        url: "http://localhost:8080/store3d/servlet/getData",
        type: 'POST',
        dataType: 'JSON',
        data: {},
        success: function (data) {
            window.localStorage.setItem('Store3DData',JSON.stringify(data));
        }
    });

}
