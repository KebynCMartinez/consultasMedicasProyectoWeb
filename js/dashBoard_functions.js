$(document ).ready(function() {
    $.ajax({
        type: "POST",
        url: "./server.php",
        datatype: "json",
        data: {'opc':11}, 
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success:function(response)
        {
            
            let objAccount = JSON.parse(response);
      
            document.getElementById("nameUser").innerHTML=objAccount["user"]["name"]+" "+
            objAccount["user"]["lastFatherName"]+" "+objAccount["user"]["lastMotherName"];

            if(objAccount["rol"]=="1")
            {
                document.getElementById("opcUser4").remove();
            }
            else
            {
                document.getElementById("opcUser2").remove();
                document.getElementById("opcUser3").remove();
            }
        }
    });
});

function loadEditProfile()
{
    $("#containerGral").load('editProfile.html');
}

function loadViewProfile()
{
    $("#containerGral").load('viewProfile.html');
}

function loadRegisterConsultation()
{
    $("#containerGral").load('registerConsultation.html');
}

function loadEditConsultation()
{
    $("#containerGral").load('editConsultation.html');
}

function loadConsultationGral()
{
    $("#containerGral").load('gralConsultation.html');
}

function loadChat()
{
    $("#containerGral").load('breakConsultation.html.html');
}