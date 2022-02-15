$(document ).ready(function() {
    var formNewMedicalConsulting = document.formNewMedicalConsulting;
  
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

    if(formNewMedicalConsulting!=undefined)
    { 
        for (let itrNew = 0; itrNew < formNewMedicalConsulting.elements.length; itrNew++)
        { 
            if (formNewMedicalConsulting.elements[itrNew].type == "text") 
            {
                formLformNewMedicalConsultingogin.elements[itrNew].addEventListener("focus", focusInput);
                formNewMedicalConsulting.elements[itrNew].addEventListener("blur", blurInput);
            }
        }
    }

    if(document.getElementById("medicalArea")!=undefined)
        getMedicalArea();

    if(document.getElementById("tableConsultation")!=undefined)
        viewConsultationUser();

    if(document.getElementById("tableConsultationGral")!=undefined)
        viewConsultationGral();

    if(document.getElementById("calendar")!=undefined)
    {
        $('#calendar').fullCalendar({
            dayClick:function(date,jsEvent,view)
            {
                let selectDay=date.format();
                selectDay= new Date(selectDay);
                selectDay.setDate(selectDay.getDate()+1);
                selectDay.setHours(22);
    
                $('#calendar').fullCalendar('gotoDate',selectDay);
    
                if(selectDay>=new Date(Date.now()))
                {
                    clearFormRegisterConsultation();
                    $('#modalRMC').modal('show');
                }
                else
                {
                    document.getElementById("imgModalRCReponse").getAttributeNode("src").value="images/reponseLog.png";
                    document.getElementById("pModalRCReponse").innerHTML="<br>FECHA NO DISPONIBLE";
                    $('#modalRCReponse').modal('show');
                }
            }
        });
    }

    if(document.getElementById("inputDate")!=undefined)
    {
        let inputDate=document.getElementById("inputDate");
        inputDate.min=new Date(Date.now()).toISOString().substring(0, 10);
    }

    if(document.getElementById("btnFinish")!=undefined)
    { 
        validateConsultation();
    }
});

function clearFormRegisterConsultation()
{
    let selectArea=document.getElementById("medicalArea"),
    selectSpecialty=document.getElementById("medicalSpecialty"),
    selectHour=document.getElementById("hourConsultation"),
    selectMinute=document.getElementById("minuteConsultation"),
    textArea = document.getElementById("symptomDescription");

    textArea.value="";

    selectArea.selectedIndex = "0";

    for (let itrSpeality = selectSpecialty.options.length-1; itrSpeality > 0; itrSpeality--) 
        selectSpecialty.remove(itrSpeality);

    for (let itrHour = selectHour.options.length-1; itrHour > 0; itrHour--) 
        selectHour.remove(itrHour);

    for (let itrMinute = selectMinute.options.length-1; itrMinute > 0; itrMinute--) 
        selectMinute.remove(itrMinute);
}

function getMedicalArea()
{
    $.ajax({
    type: "POST",
    url: "./server.php",
    datatype: "json",
    data: {'opc':5}, 
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success:function(response)
    {
        if(response!="300")
        {     
            let listArea=JSON.parse(response);
            let selectArea=document.getElementById("medicalArea");

            for(let itrArea=0;itrArea<listArea.length;itrArea++)
            {
                let optionArea =  document.createElement('option');
                optionArea.setAttribute('value',listArea[itrArea]['id']);
                optionArea.appendChild(document.createTextNode(listArea[itrArea]['name']));
                selectArea.appendChild(optionArea);
            }   
        }
    }
    });
}

function getNameMedical()
{
    let selectArea=document.getElementById("medicalArea"),
        selectSpecialty=document.getElementById("medicalSpecialty"),
        selectHour=document.getElementById("hourConsultation"),
        selectMinute=document.getElementById("minuteConsultation");

    for (let itrSpeality = selectSpecialty.options.length-1; itrSpeality > 0; itrSpeality--) 
        selectSpecialty.remove(itrSpeality);

    for (let itrHour = selectHour.options.length-1; itrHour > 0; itrHour--) 
        selectHour.remove(itrHour);

    for (let itrMinute = selectMinute.options.length-1; itrMinute > 0; itrMinute--) 
        selectMinute.remove(itrMinute);

    if(selectArea.value!="")
    {
        $.ajax({
            type: "POST",
            url: "./server.php",
            datatype: "json",
            data: {'opc':6,'area':selectArea.value}, 
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success:function(response)
            {
                if(response!="300")
                {     
                    let listNameSpecialty=JSON.parse(response);
        
                    for(let itrName=0;itrName<listNameSpecialty.length;itrName++)
                    {
                        let optionName =  document.createElement('option');
                        optionName.setAttribute('value',listNameSpecialty[itrName]['id']);
                        optionName.appendChild(document.createTextNode(listNameSpecialty[itrName]['name']));
                        selectSpecialty.appendChild(optionName);
                    }   
                }
            }
        });
    }
}

function getHourConsultation()
{
    let selectSpecialty=document.getElementById("medicalSpecialty"),
        selectHour=document.getElementById("hourConsultation"),
        selectMinute=document.getElementById("minuteConsultation"),dateConsultation;

    for (let itrHour = selectHour.options.length-1; itrHour > 0; itrHour--) 
        selectHour.remove(itrHour);

    for (let itrMinute = selectMinute.options.length-1; itrMinute > 0; itrMinute--) 
        selectMinute.remove(itrMinute);

    if(document.getElementById("calendar"))
        dateConsultation=$('#calendar').fullCalendar('getDate').format();
    else if(document.getElementById("inputDate"))
        dateConsultation=document.getElementById("inputDate").value;

    if(selectSpecialty.value!="")
    {
        $.ajax({
            type: "POST",
            url: "./server.php",
            datatype: "json",
            data: {'opc':7,'id':selectSpecialty.value,
            'dateConsultation':dateConsultation}, 
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success:function(response)
            {
                if(response!="300")
                {                      
                    let listHour=JSON.parse(response);
        
                    for(let itrHour=0;itrHour<listHour.length;itrHour++)
                    {
                        let optionHour =  document.createElement('option');
                        optionHour.setAttribute('value',(listHour[itrHour].toString().length==1?
                        "0".concat(listHour[itrHour]):listHour[itrHour].toString()));
                        optionHour.appendChild(document.createTextNode((listHour[itrHour].toString().length==1?
                        "0".concat(listHour[itrHour]):listHour[itrHour].toString())));
                        selectHour.appendChild(optionHour);
                    }  
                }
            }
        });
    }
}

function getMinuteConsultation()
{
    let selectSpecialty=document.getElementById("medicalSpecialty"),
        selectHour=document.getElementById("hourConsultation"),
        selectMinute=document.getElementById("minuteConsultation"),dateConsultation;

    for (let itrMinute = selectMinute.options.length-1; itrMinute > 0; itrMinute--) 
        selectMinute.remove(itrMinute);

    if(document.getElementById("calendar"))
        dateConsultation=$('#calendar').fullCalendar('getDate').format();
    else if(document.getElementById("inputDate"))
        dateConsultation=document.getElementById("inputDate").value;

    if(selectHour.value!="")
    {
        $.ajax({
            type: "POST",
            url: "./server.php",
            datatype: "json",
            data: {'opc':8,'id':selectSpecialty.value,'hour':selectHour.value,
            'dateConsultation':dateConsultation}, 
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success:function(response)
            {
                if(response!="300")
                {                
                    let listMinute=JSON.parse(response);
        
                    for(let itrMinute=0;itrMinute<listMinute.length;itrMinute++)
                    {
                        let optionMinute =  document.createElement('option');
                        optionMinute.setAttribute('value',(listMinute[itrMinute].toString().length==1?
                        "0".concat(listMinute[itrMinute]):listMinute[itrMinute].toString()));
                        optionMinute.appendChild(document.createTextNode(
                        (listMinute[itrMinute].toString().length==1?"0".concat(listMinute[itrMinute]):
                        listMinute[itrMinute].toString())));
                        selectMinute.appendChild(optionMinute);
                    }  
                }
            }
        });
    }
}

function registerConsultation()
{
    let jsonData={'opc':9,
    'id_area':document.getElementById("medicalArea").value,
    'id_medical':document.getElementById("medicalSpecialty").value,
    'dateConsultation':$('#calendar').fullCalendar('getDate').format(),
    'timeConsultation':document.getElementById("hourConsultation").value+':'+
    document.getElementById("minuteConsultation").value+':00',
    'symptomDescription':document.getElementById("symptomDescription").value};

    $.ajax({
        type: "POST",
        url: "./server.php",
        datatype: "json",
        data: jsonData, 
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success:function(response)
        {
            console.log(response);

            if(response=="200")
            {  
                document.getElementById("imgModalRCReponse").getAttributeNode("src").value="images/responseSuccess.png";
                document.getElementById("pModalRCReponse").innerHTML="<br>CONSULTA REGISTRADA";    
                $('#modalRMC').modal('hide');          
            }
            else
            {
                document.getElementById("imgModalRCReponse").getAttributeNode("src").value="images/reponseLog.png";
                document.getElementById("pModalRCReponse").innerHTML="<br>HORARIO NO DISPONIBLE";
            }

            $('#modalRCReponse').modal('show');
        }
    });
}

function viewConsultationUser()
{
    $.ajax({
        type: "POST",
        url: "./server.php",
        datatype: "json",
        data: {'opc':10}, 
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success:function(response)
        {
            if(response!="300")
            {
                let listConsultation=JSON.parse(response);
                let bodyTable = document.getElementById('bodyTable'); 

                for(let itrConsultation in listConsultation)
                { 
                    let rowTable =  document.createElement('tr');
                    rowTable.setAttribute('id','row-'+listConsultation[itrConsultation]['id']);

                    let cell0 = document.createElement('td');
                    cell0.appendChild(document.createTextNode(listConsultation[itrConsultation]['id']));           

                    let cell1 = document.createElement('td');
                    cell1.appendChild(document.createTextNode(listConsultation[itrConsultation]['date'])); 
                
                    let cell2 = document.createElement('td');
                    cell2.appendChild(document.createTextNode(listConsultation[itrConsultation]['time']));                            

                    let cell3 = document.createElement('td');
                    cell3.appendChild(document.createTextNode(listConsultation[itrConsultation]['area'])); 

                    let cell4 = document.createElement('td');
                    cell4.appendChild(document.createTextNode(listConsultation[itrConsultation]['medical'])); 

                    let cell5 = document.createElement('td');
                    cell5.appendChild(document.createTextNode(listConsultation[itrConsultation]['status'])); 

                    rowTable.appendChild(cell0);
                    rowTable.appendChild(cell1);
                    rowTable.appendChild(cell2);
                    rowTable.appendChild(cell3);
                    rowTable.appendChild(cell4);
                    rowTable.appendChild(cell5);

                    let cell6 = document.createElement('td');
                    if(listConsultation[itrConsultation]['status']=="ATENDIDO")
                    {
                        /*
                        let btnPdf = document.createElement('button');
                        btnPdf.setAttribute('id',"btnPDF-"+listConsultation[itrConsultation]['id']);
                        btnPdf.setAttribute('class','btnTable');
                        btnPdf.setAttribute('style','background-color: white;');
                        btnPdf.setAttribute('onclick','pdfConsultation(this.id);');
                        btnPdf.setAttribute('title','Exportar PDF');
                        let imgBtnPdf = document.createElement('img');
                        imgBtnPdf.setAttribute('src','images/pdf.png');
                        imgBtnPdf.setAttribute('class','imgBtn');
                        btnPdf.appendChild(imgBtnPdf);
                        cell6.appendChild(btnPdf);*/
                    }
                    else if(listConsultation[itrConsultation]['status']=="PENDIENTE")
                    {    
                        let btnDelete = document.createElement('button');
                        btnDelete.setAttribute('id',"btnDelete-"+listConsultation[itrConsultation]['id']);
                        btnDelete.setAttribute('class','btnTable');
                        btnDelete.setAttribute('style','background-color: white;');
                        btnDelete.setAttribute('onclick','deleteConsultation(this.id);');
                        btnDelete.setAttribute('title','Cancelar consulta');
                        let imgBtnDelete = document.createElement('img');
                        imgBtnDelete.setAttribute('src','images/delete.jpg');
                        imgBtnDelete.setAttribute('class','imgBtn');
                        btnDelete.appendChild(imgBtnDelete);
                        cell6.appendChild(btnDelete);
                    }

                    rowTable.appendChild(cell6);
                    bodyTable.appendChild(rowTable);
                }
            }
        }
    });
}

function pdfConsultation(id)
{
    console.log("EXPORTAR PDF: "+id);
}

function deleteConsultation(id)
{
    $.ajax({
        type: "POST",
        url: "./server.php",
        datatype: "json",
        data: {'opc':13,'id':id.split("-")[1]}, 
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success:function(response)
        {
            if(response=="200")
            {  
                let rowTable = document.getElementById("row-"+id.split("-")[1]);

                rowTable.remove();

                document.getElementById("imgModalRCReponse").getAttributeNode("src").value="images/responseSuccess.png";
                document.getElementById("pModalRCReponse").innerHTML="<br>CONSULTA CANCELADA";    
            }
            else
            {
                document.getElementById("imgModalRCReponse").getAttributeNode("src").value="images/reponseLog.png";
                document.getElementById("pModalRCReponse").innerHTML="<br>CONSULTA NO CANCELADA";
            }

            $('#modalRCReponse').modal('show');
        }
    });
}

function viewConsultationGral()
{
    $.ajax({
        type: "POST",
        url: "./server.php",
        datatype: "json",
        data: {'opc':14}, 
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success:function(response)
        {
            if(response!="300")
            {
                let listConsultation=JSON.parse(response);
                let bodyTable = document.getElementById('bodyTable'); 

                for(let itrConsultation in listConsultation)
                { 
                    let rowTable =  document.createElement('tr');
                    rowTable.setAttribute('id','row-'+listConsultation[itrConsultation]['id']);

                    let cell0 = document.createElement('td');
                    cell0.appendChild(document.createTextNode(listConsultation[itrConsultation]['id']));           

                    let cell1 = document.createElement('td');
                    cell1.appendChild(document.createTextNode(listConsultation[itrConsultation]['date'])); 
                
                    let cell2 = document.createElement('td');
                    cell2.appendChild(document.createTextNode(listConsultation[itrConsultation]['time']));                            

                    let cell3 = document.createElement('td');
                    cell3.appendChild(document.createTextNode(listConsultation[itrConsultation]['nameUser'])); 

                    let cell4 = document.createElement('td');
                    cell4.appendChild(document.createTextNode(listConsultation[itrConsultation]['symtomatic'])); 

                    let cell5 = document.createElement('td');
                    cell5.appendChild(document.createTextNode(listConsultation[itrConsultation]['status'])); 

                    rowTable.appendChild(cell0);
                    rowTable.appendChild(cell1);
                    rowTable.appendChild(cell2);
                    rowTable.appendChild(cell3);
                    rowTable.appendChild(cell4);
                    rowTable.appendChild(cell5);

                    bodyTable.appendChild(rowTable);
                }
            }
        }
    });
}

function validateConsultation()
{
    $.ajax({
        type: "POST",
        url: "./server.php",
        datatype: "json",
        data: {'opc':15}, 
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success:function(response)
        {
            console.log(response);
            if(response=="200")
            {
                window.open("chat.html");
            }
            else
            {
                document.getElementById("btnFinish").setAttribute("disabled","");
                document.getElementById("imgModalBCReponse").getAttributeNode("src").value="images/reponseLog.png";
                document.getElementById("pModalBCReponse").innerHTML="<br>NO TIENE CONSULTA EN EL HORARIO ACTUAL";
                $('#modalBCReponse').modal('show');
            }
        }
    });
}

function finishConsultation()
{
    $.ajax({
        type: "POST",
        url: "./server.php",
        datatype: "json",
        data: {'opc':16}, 
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success:function(response)
        {
            console.log(response);
            if(response=="200")
            {
                document.getElementById("imgModalBCReponse").getAttributeNode("src").value="images/responseSuccess.png";
                document.getElementById("pModalBCReponse").innerHTML="<br>LA CONSULTA HA SIDO LIBERADA";
            }
            else
            {
                document.getElementById("imgModalBCReponse").getAttributeNode("src").value="images/reponseLog.png";
                document.getElementById("pModalBCReponse").innerHTML="<br>LA CONSULTA NO HA SIDO LIBERADA";
            }

            $('#modalBCReponse').modal('show');
        }
    });
}