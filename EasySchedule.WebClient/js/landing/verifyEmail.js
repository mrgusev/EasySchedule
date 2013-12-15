
$(function () {
    var enDictionary = {
        "unexpected": "Unexpected error",
        "confirmed": "You have successfully confirmed e-mail",
        "login": "Login"
    };
    var noDictionary = {
        "unexpected": "Uventet feil",
        "confirmed": "Du har bekreftet e-post",
        "login": "Logg inn"
    };

    var urlVars = getUrlVars();
    var Dictionary = urlVars['locale'] == 'no' ? noDictionary : enDictionary;

    $('#go-login').text(Dictionary['login']);

    $('#go-login').click(function () {
        window.location.href = '../login.html';
    });

    $.ajax({
        url: '../api/v1/login/verify',
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        data: "{\"email\":\"" + urlVars['email'] + "\",\"verificationCode\":\"" + urlVars['verificationCode'] + "\"}",
        success: function () {
            $('#message').text(Dictionary["confirmed"]);
            $('#go-login').show();
        },
        error: function (data) {
            if (data.responseJSON.message != undefined) {
                $('#message').text(data.responseJSON.message);
            }
            else {
                $('#message').text(Dictionary["unexpected"]);
            }
        }
    });

});
