$(document ).ready(function() {
    var selectDay=document.getElementById("bornDay"),selectYear=document.getElementById("bornYear"),
    formLogin = document.formLogin,formRegister = document.formRegister,formEditAccount = document.formEditAccount,
    formViewAccount = document.formViewAccount;
  
    if(formViewAccount==undefined)
    {
        for(let itrDay=1;itrDay<32;itrDay++)
        {
            let optionDay =  document.createElement('option');
            optionDay.setAttribute('value',itrDay);
            optionDay.appendChild(document.createTextNode(itrDay));
            selectDay.appendChild(optionDay);
        }
        
        for(let itrYear=1900;itrYear<=(new Date()).getFullYear();itrYear++)
        {
            let optionYear =  document.createElement('option');
            optionYear.setAttribute('value',itrYear);
            optionYear.appendChild(document.createTextNode(itrYear));
            selectYear.appendChild(optionYear);
        }    
    }

    var focusInput = function(){
        this.parentElement.children[1].className = "label active";
        this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
    };
    
    var blurInput = function(){
        if (this.value <= 0) {
            this.parentElement.children[1].className = "label";
            this.parentElement.children[0].className = this.parentElement.children[0].className + " error";
        }
    };

    if(formLogin!=undefined)
    { 
        for (let itrLogin = 0; itrLogin < formLogin.elements.length; itrLogin++)
        { 
            if (formLogin.elements[itrLogin].type == "text" || formLogin.elements[itrLogin].type == "email" || 
                formLogin.elements[itrLogin].type == "password") 
            {
                formLogin.elements[itrLogin].addEventListener("focus", focusInput);
                formLogin.elements[itrLogin].addEventListener("blur", blurInput);
            }
        }
    }

    if(formRegister!=undefined)
    {
        for (let itrRegister = 0; itrRegister < formRegister.elements.length; itrRegister++) 
        {
            if (formRegister.elements[itrRegister].type == "text" || formRegister.elements[itrRegister].type == "email" || 
                formRegister.elements[itrRegister].type == "password") 
            {
                formRegister.elements[itrRegister].addEventListener("focus", focusInput);
                formRegister.elements[itrRegister].addEventListener("blur", blurInput);
            }
        }
        
        let selectArea = document.getElementById("medicalArea"),
        inputCedula = document.getElementById("cedula");

        selectArea.setAttribute("disabled","");
        inputCedula.setAttribute("disabled","");
    }

    if(formEditAccount!=undefined)
    {
        for (let itrRegister = 0; itrRegister < formEditAccount.elements.length; itrRegister++) 
        {
            if (formEditAccount.elements[itrRegister].type == "text" || formEditAccount.elements[itrRegister].type == "email" || 
            formEditAccount.elements[itrRegister].type == "password") 
            {
                formEditAccount.elements[itrRegister].addEventListener("focus", focusInput);
                formEditAccount.elements[itrRegister].addEventListener("blur", blurInput);
            }
        }  

        loadProfileEditAccount();
    }

    if(formViewAccount!=undefined)
    {
        for (let itrRegister = 0; itrRegister < formViewAccount.elements.length; itrRegister++) 
        {
            if (formViewAccount.elements[itrRegister].type == "text" || formViewAccount.elements[itrRegister].type == "email" || 
                formViewAccount.elements[itrRegister].type == "password") 
            {
                formViewAccount.elements[itrRegister].addEventListener("focus", focusInput);
                formViewAccount.elements[itrRegister].addEventListener("blur", blurInput);
            }
        }  
        
        loadProfileViewAccount();
    }
});

function resetCPassword()
{
    var inputCPassword=document.getElementById("cPasswordRegister");
    if(document.getElementById("passwordRegister").value!=inputCPassword.value)
        document.getElementById("cPasswordRegister").value="";

    $(inputCPassword).popover('hide');
}

function validateEqualPassword()
{
    var inputCPassword=document.getElementById("cPasswordRegister");
    if(document.getElementById("passwordRegister").value!=inputCPassword.value)
        $(inputCPassword).popover('show');
    else
        $(inputCPassword).popover('hide');
}

function clearFormRegister()
{
    let formRegister = document.formRegister;
    formRegister.reset();
        
    for (let itrRegister = 0; itrRegister < formRegister.elements.length; itrRegister++) 
    {
        if (formRegister.elements[itrRegister].type == "text" || 
            formRegister.elements[itrRegister].type == "email" || 
            formRegister.elements[itrRegister].type == "password") 
        {
            formRegister.elements[itrRegister].parentElement.children[1].className="label";
        }
    } 
}

function loginAccount()
{
    var jsonData={'opc':1,'emailLogin':document.getElementById("emailLogin").value,
    'passLogin':document.getElementById("loginPassword").value};

    $.ajax({
    type: "POST",
    url: "./server.php",
    datatype: "json",
    data: jsonData, 
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success:function(response)
    {
        if(response=="200")
        {
            window.location.href = 'dashBoard.html';
        }
        else
        {
            document.getElementById("imgModalResponse").getAttributeNode("src").value="images/reponseLog.png";
            document.getElementById("pModalResponse").innerHTML="<br>USUARIO O CONTRASEÑA INCORRECTOS";
            
            $('#modalReponse').modal('show');
        }
    }
    });
}

function registerAccount()
{
    if(document.getElementById("passwordRegister").value==document.getElementById("cPasswordRegister").value)
    {
        var radios = document.getElementsByName('gender'),gender="";
        for (var itrRadio = 0; itrRadio< radios.length; itrRadio++) 
        {
            if (radios[itrRadio].checked) 
            {
                gender=radios[itrRadio].value;
                break;
            }
        }

        var jsonData={'opc':2,
        'names':document.getElementById("name").value,
        'lastFatherName':document.getElementById("apPaterno").value,
        'lastMotherName':document.getElementById("apMaterno").value,
        'email':document.getElementById("emailRegister").value,
        'pass':document.getElementById("passwordRegister").value,
        'gender':gender,
        'dateBorn':(document.getElementById("bornYear").value+"-"+
        document.getElementById("bornMonth").value+"-"+
        document.getElementById("bornDay").value),
        'rol':document.getElementById("typeAccount").value,
        'area':document.getElementById("medicalArea").value,
        'cedula':document.getElementById("cedula").value};
            
        $.ajax({
        type: "POST",
        url: "./server.php",
        datatype: "json",
        data: jsonData, 
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success:function(response)
        {
            switch(response)
            {
                case '201':window.location.href = 'dashBoard.html';break;
                case '301':
                {
                    document.getElementById("imgModalResponse").getAttributeNode("src").value="images/reponseLog.png";
                    document.getElementById("pModalResponse").innerHTML="<br>CORREO YA VINCULADO";
                }break;
                case '302':
                {
                    document.getElementById("imgModalResponse").getAttributeNode("src").value="images/reponseLog.png";
                    document.getElementById("pModalResponse").innerHTML="<br>CEDULA NO HABILITADA";
                }break;
                case '303':
                {
                    document.getElementById("imgModalResponse").getAttributeNode("src").value="images/reponseLog.png";
                    document.getElementById("pModalResponse").innerHTML="<br>CEDULA YA VINCULADA";
                }break;

            }

            $('#modalReponse').modal('show');
        }});
    }
}

function editAccount()
{
    var radios = document.getElementsByName('gender'),gender="";
    for (var itrRadio = 0; itrRadio< radios.length; itrRadio++) 
    {
        if (radios[itrRadio].checked) 
        {
            gender=radios[itrRadio].value;
            break;
        }
    }

    var jsonData={'opc':4,
    'names':document.getElementById("name").value,
    'lastFatherName':document.getElementById("apPaterno").value,
    'lastMotherName':document.getElementById("apMaterno").value,
    'nss':document.getElementById("nss").value,
    'curp':document.getElementById("curp").value,
    'email':document.getElementById("email").value,
    'phone':document.getElementById("phone").value,
    'gender':gender,
    'civilStatus':document.getElementById("civilStatus").value,
    'dateBorn':(document.getElementById("bornYear").value+"-"+
    document.getElementById("bornMonth").value+"-"+
    document.getElementById("bornDay").value),
    'cp':document.getElementById("cp").value,
    'state':document.getElementById("state").value,
    'municipality':document.getElementById("municipality").value,
    'suburb':document.getElementById("suburb").value,
    'street':document.getElementById("street").value,
    'externalNumber':document.getElementById("externalNumber").value,
    'internalNumber':document.getElementById("internalNumber").value};
              
    $.ajax({
    type: "POST",
    url: "./server.php",
    datatype: "json",
    data: jsonData, 
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success:function(response)
    {
        if(response=="201")
        {
            document.getElementById("imgModalEditResponse").getAttributeNode("src").value="images/responseSuccess.png";
            document.getElementById("pModalEditResponse").innerHTML="<br>Cuenta Actualizada";
        }
        else
        {
            document.getElementById("imgModalEditResponse").getAttributeNode("src").value="images/reponseLog.png";
            document.getElementById("pModalEditResponse").innerHTML="<br>CORREO YA VINCULADO";
        }

        $('#modalEditReponse').modal('show');        
    }});
}

function loadProfileEditAccount()
{
    $.ajax({
    type: "POST",
    url: "./server.php",
    datatype: "json",
    data: {'opc':3}, 
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success:function(response)
    {
        if(response!="300")
        {
            let objAccount = JSON.parse(response);

            if(objAccount["user"]["name"])
            {
                document.getElementById("name").value=objAccount["user"]["name"];
                document.getElementById("name").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["lastFatherName"])
            {
                document.getElementById("apPaterno").value=objAccount["user"]["lastFatherName"];
                document.getElementById("apPaterno").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["lastMotherName"])
            {
                document.getElementById("apMaterno").value=objAccount["user"]["lastMotherName"];
                document.getElementById("apMaterno").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["email"]["detail"])
            {
                document.getElementById("email").value=objAccount["user"]["email"]["detail"];
                document.getElementById("email").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["phone"]["detail"])
            {
                document.getElementById("phone").value=objAccount["user"]["phone"]["detail"];
                document.getElementById("phone").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["NSS"])
            {
                document.getElementById("nss").value=objAccount["user"]["NSS"];
                document.getElementById("nss").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["CURP"])
            {
                document.getElementById("curp").value=objAccount["user"]["CURP"];
                document.getElementById("curp").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["civilStatus"])
            {
                document.getElementById("civilStatus").value=objAccount["user"]["civilStatus"];
            }

            if(objAccount["user"]["bornDate"])
            {
                document.getElementById("bornDay").value=parseInt(objAccount["user"]["bornDate"].split("-")[2]);
                document.getElementById("bornMonth").selectedIndex=objAccount["user"]["bornDate"].split("-")[1];
                document.getElementById("bornYear").value=objAccount["user"]["bornDate"].split("-")[0];
            }

            if(objAccount["user"]["gender"])
            {
                let radios = document.getElementsByName('gender');
                for (var itrRadio = 0; itrRadio< radios.length; itrRadio++) 
                {
                    if (radios[itrRadio].value==objAccount["user"]["gender"]) 
                    {
                        radios[itrRadio].checked = true;
                        break;
                    }
                }
            }

            if(objAccount["user"]["address"]["cp"])
            {
                document.getElementById("cp").value=objAccount["user"]["address"]["cp"];
                document.getElementById("cp").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["state"])
            {
                document.getElementById("state").value=objAccount["user"]["address"]["state"];
            }

            if(objAccount["user"]["address"]["municipality"])
            {
                document.getElementById("municipality").value=objAccount["user"]["address"]["municipality"];
                document.getElementById("municipality").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["suburb"])
            {
                document.getElementById("suburb").value=objAccount["user"]["address"]["suburb"];
                document.getElementById("suburb").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["street"])
            {
                document.getElementById("street").value=objAccount["user"]["address"]["street"];
                document.getElementById("street").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["externalNumber"])
            {
                document.getElementById("externalNumber").value=objAccount["user"]["address"]["externalNumber"];
                document.getElementById("externalNumber").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["internalNumber"])
            {
                document.getElementById("internalNumber").value=objAccount["user"]["address"]["internalNumber"];
                document.getElementById("internalNumber").parentElement.children[1].className="label active";
            }
        }
        else
            console.log(response);
    }
    });
}

function loadProfileViewAccount()
{
    $.ajax({
    type: "POST",
    url: "./server.php",
    datatype: "json",
    data: {'opc':3}, 
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success:function(response)
    {
        if(response!="300")
        {
            let objAccount = JSON.parse(response);

            if(objAccount["user"]["name"])
            {
                document.getElementById("name").value=objAccount["user"]["name"];
                document.getElementById("name").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["lastFatherName"])
            {
                document.getElementById("apPaterno").value=objAccount["user"]["lastFatherName"];
                document.getElementById("apPaterno").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["lastMotherName"])
            {
                document.getElementById("apMaterno").value=objAccount["user"]["lastMotherName"];
                document.getElementById("apMaterno").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["email"]["detail"])
            {
                document.getElementById("email").value=objAccount["user"]["email"]["detail"];
                document.getElementById("email").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["phone"]["detail"])
            {
                document.getElementById("phone").value=objAccount["user"]["phone"]["detail"];
                document.getElementById("phone").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["NSS"])
            {
                document.getElementById("nss").value=objAccount["user"]["NSS"];
                document.getElementById("nss").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["CURP"])
            {
                document.getElementById("curp").value=objAccount["user"]["CURP"];
                document.getElementById("curp").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["civilStatus"])
            {
                let listGender=["Soltero(a)","Casado(a)","Divorciado(a)","Viudo(a)","Concubinato",
                "Separación en proceso judicial"];
                document.getElementById("civilStatus").value=listGender[objAccount["user"]["civilStatus"]];
                document.getElementById("civilStatus").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["bornDate"])
            {
                document.getElementById("bornDay").value=objAccount["user"]["bornDate"].split("-")[2];
                document.getElementById("bornDay").parentElement.children[1].className="label active";

                document.getElementById("bornMonth").value=objAccount["user"]["bornDate"].split("-")[1];
                document.getElementById("bornMonth").parentElement.children[1].className="label active";

                document.getElementById("bornYear").value=objAccount["user"]["bornDate"].split("-")[0];
                document.getElementById("bornYear").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["gender"])
            {
                document.getElementById("gender").value=(objAccount["user"]["gender"]=="M"?"Hombre":
                (objAccount["user"]["gender"]=="W"?"Mujer":"Otro"));
                document.getElementById("gender").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["cp"])
            {
                document.getElementById("cp").value=objAccount["user"]["address"]["cp"];
                document.getElementById("cp").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["state"])
            {
                let listState=["","Aguascalientes","Baja California (Norte)","Baja California Sur","Campeche",
                "Coahuila","Colima","Chiapas","Chihuahua","Distrito Federal","Durango","Estado de México",
                "Guanajuato","Guerrero","Hidalgo","Jalisco","Michoacán","Morelos","Nayarit","Nuevo Léon",
                "Oaxaca","Puebla","Quintana Roo","Querétaro","Sinaloa","San Luis Potosi","Sonora","Tabasco",
                "Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas"];
                document.getElementById("state").value=listState[objAccount["user"]["address"]["state"]];
                document.getElementById("state").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["municipality"])
            {
                document.getElementById("municipality").value=objAccount["user"]["address"]["municipality"];
                document.getElementById("municipality").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["suburb"])
            {
                document.getElementById("suburb").value=objAccount["user"]["address"]["suburb"];
                document.getElementById("suburb").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["street"])
            {
                document.getElementById("street").value=objAccount["user"]["address"]["street"];
                document.getElementById("street").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["externalNumber"])
            {
                document.getElementById("externalNumber").value=objAccount["user"]["address"]["externalNumber"];
                document.getElementById("externalNumber").parentElement.children[1].className="label active";
            }

            if(objAccount["user"]["address"]["internalNumber"])
            {
                document.getElementById("internalNumber").value=objAccount["user"]["address"]["internalNumber"];
                document.getElementById("internalNumber").parentElement.children[1].className="label active";
            }
        }
        else
            console.log(response);
    }
    });
}

function parameterDoctor()
{
    let selectAccount = document.getElementById("typeAccount"),
        selectArea = document.getElementById("medicalArea"),
        inputCedula = document.getElementById("cedula");
    
    if(selectAccount.value=="2")
    {
        selectArea.removeAttribute("disabled","");
        inputCedula.removeAttribute("disabled","");

        selectArea.setAttribute("required","");
        inputCedula.setAttribute("required","");
    }
    else
    {
        selectArea.removeAttribute("required","");
        inputCedula.removeAttribute("required","");

        selectArea.setAttribute("disabled","");
        inputCedula.setAttribute("disabled","");

        selectArea.selectedIndex=0;
        inputCedula.value="";
        inputCedula.parentElement.children[1].className="label";
    }
}