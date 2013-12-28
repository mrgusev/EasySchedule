
$(function () {
    var enDictionary = {
        "unexpected": "Unexpected error",
        "accepted": "You have successfully accepted group invitation",
        "declined": "You have successfully declined group invitation"
    };
    var noDictionary = {
        "unexpected": "Uventet feil",
        "accepted": "Du har nå akseptert gruppe invitasjon",
        "declined": "Du har avvist gruppe invitasjon"
    };

    var urlVars = getUrlVars();
    var Dictionary = urlVars['locale'] == 'no' ? noDictionary : enDictionary;
    
    var status = document.URL.indexOf("/acceptInvitation", 0) > 0 ? 2 : 6;
    $.ajax({
        url: '../api/v1/group/' + urlVars['groupId'] + '/member/' + urlVars['membershipId'],
        type: "PUT",
        contentType: 'application/json;charset=UTF-8',
        data: "{\"inviteCode\":\"" + urlVars['inviteCode']
            + "\",\"status\":\"" + status + "\"}",
        success: function () {
            if(status == 2) {
                $('#message').text(Dictionary['accepted']);
            }
            else {
                $('#message').text();
            }
        },
        error: function (data) {
            if (data.responseJSON && data.responseJSON.message != undefined) {
                $('#message').text(data.responseJSON.message);
            }
            else {
                $('#message').text(Dictionary["unexpected"]);
            }
        }
    });

});
