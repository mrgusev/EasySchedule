
$(function () {
    var enDictionary = {
        "unexpected": "Unexpected error",
        "unsubscribed": "You have been successfully unsubscribed"
    };
    var noDictionary = {
        "unexpected": "Uventet feil",
        "unsubscribed": "Du har blitt meldt"
    };

    var urlVars = getUrlVars();
    var Dictionary = urlVars['locale'] == 'no' ? noDictionary : enDictionary;
    
    $.ajax({
        url: '../api/v1/profile/' + urlVars['profileId'],
        type: "PUT",
        contentType: 'application/json;charset=UTF-8',
        data: "{\"optOut\":\"true\"}",
        success: function () {
            $('#message').text(Dictionary["unsubscribed"]);
        },
        error: function (data) {
            if (data.responseJSON.message != undefined) {
                $('#message').text(data.responseJSON.message);
            }
            else {
                $('#message').text(Dictionary('unexpected'));
            }
        }
    });
});
