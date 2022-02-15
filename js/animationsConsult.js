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