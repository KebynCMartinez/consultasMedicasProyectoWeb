<?php
require_once("class/class_connection.php");
require_once("class/class_account.php");
require_once("class/class_user.php");
require_once("class/class_address.php");
require_once("class/class_email.php");
require_once("class/class_phone.php");
require_once("class/class_rol.php");
require_once("class/class_specialty.php");
require_once("class/class_consultation.php");
require_once("class/class_doctor.php");


session_start();
date_default_timezone_set("America/Mexico_City");   

$objConnection = new connection();

function getUser($idUser)
{
  global $objConnection;

  $sql = "SELECT US.id_usuario AS ID_USER,US.nombre AS NAME_USER,US.apellido_paterno AS LASTFATHERNAME,
  US.apellido_materno AS LASTMOTHERNAME,US.fecha_nacimiento AS BORNDATE,US.sexo AS GENDER,
  US.estado_civil AS CIVILSTATUS,US.NSS AS NSS,US.CURP AS CURP,AD.id_direccion AS ID_ADDRESS,
  AD.numeroExterior AS EXTERNALNUMBER,AD.numeroInterior AS INTERNALNUMBER,AD.calle AS STREET,
  AD.colonia AS SUBURB,AD.localidad AS CITY,AD.estado AS NAMESTATE,AD.cp AS CP,EM.id_correo AS IDEMAIL,
  EM.correo AS NAMEEMAIL,PH.id_telefono AS IDPHONE,PH.telefono AS NAMEPHONE FROM usuario AS US  
  INNER JOIN direccion AS AD ON AD.id_usuario=US.id_usuario
  INNER JOIN correo AS EM ON EM.id_usuario=US.id_usuario
  INNER JOIN telefono AS PH ON PH.id_usuario=US.id_usuario WHERE 
  US.id_usuario = '".$idUser."'";

  $result = $objConnection->getConnection()->query($sql);
  if($result)
  {
      if($row = $result->fetch_assoc()) 
      {
        $objUser= new usuario($row['ID_USER'],$row['NAME_USER'],
        $row['LASTFATHERNAME'],$row['LASTMOTHERNAME'],$row['BORNDATE'],$row['GENDER'],
        $row['CIVILSTATUS'],$row['NSS'],$row['CURP']);

        $objUser->setAddress(new address($row['ID_ADDRESS'],$row['EXTERNALNUMBER'],
        $row['INTERNALNUMBER'],$row['STREET'],$row['SUBURB'],$row['CITY'],$row['NAMESTATE'],$row['CP']));

        $objUser->setEmail(new email($row['IDEMAIL'],$row['NAMEEMAIL']));
        $objUser->setPhone(new phone($row['IDPHONE'],$row['NAMEPHONE']));

        return $objUser;
      }
      else     
        return "300";//var_dump(mysqli_error($objConnection->getConnection()));
    }
  else
    return "300";
}

function getDoctor($idDoctor,$opcSearch)
{
  global $objConnection;

  $sql="SELECT ME.id_medico AS IDDOCTOR,AC.id_usuario AS IDUSER,ME.cedula AS CEDULA,
  SP.id_especialidad AS IDSPECIALTY,SP.nombre AS NAMESPECIALTY FROM medico AS ME 
  INNER JOIN cuenta AS AC ON ME.id_cuenta=AC.id_cuenta
  INNER JOIN especialidad AS SP ON ME.id_especialidad=SP.id_especialidad WHERE ";
  
  if($opcSearch==0)
    $sql .="ME.id_medico='".$idDoctor."'"; 
  else
    $sql .="AC.id_usuario='".$idDoctor."'"; 

  $result = $objConnection->getConnection()->query($sql);

  if($result)
  {      
    if($row = $result->fetch_assoc()) 
    {
      return new doctor($row['IDDOCTOR'],getUser($row['IDUSER']),
      $row['CEDULA'],new specialty($row['IDSPECIALTY'],$row['NAMESPECIALTY']));
    }
    else     
      return "300";//var_dump(mysqli_error($objConnection->getConnection()));
  }
  else
    return "300";

}

switch ($_POST['opc'])
{
  //LOGIN DE CUENTA
  case 1:
  { 
    $sql = "SELECT AC.id_cuenta AS IDACCOUNT,AC.cuenta AS NAMEACCOUNT,AC.contrasena AS PASSACCOUNT,
    US.id_usuario AS IDUSER,US.nombre AS NAMEUSER,US.apellido_paterno AS LASTFATHERNAME,
    US.apellido_materno AS LASTMOTHERNAME,AC.id_rol AS ROL FROM cuenta AS AC INNER JOIN usuario AS US ON 
    AC.id_usuario=US.id_usuario WHERE AC.cuenta = '".$_POST['emailLogin']."' AND  
    AC.contrasena = '".$_POST['passLogin']."'";

    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {
        if($row = $result->fetch_assoc()) 
        {
            $_SESSION['objAccount'] = new account($row['IDACCOUNT'],$row['NAMEACCOUNT'],
            $row['PASSACCOUNT'],new usuario($row['IDUSER'],$row['NAMEUSER'],$row['LASTFATHERNAME'],
            $row['LASTMOTHERNAME'],"","","","",""),$row['ROL']);

            echo "200";
        }
        else     
          echo "300";//var_dump(mysqli_error($objConnection->getConnection()));
    }
    else
      echo "300";//var_dump(mysqli_error($objConnection->getConnection()));
  }break;

  //REGISTRA UNA CUENTA NUEVA
  case 2:
  { 
    $sql = "SELECT id_usuario FROM cuenta WHERE cuenta = '".$_POST['email']."'";
    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {
        if($row = $result->fetch_assoc()) 
        {
            echo "301";
            return;
        }
    }

    if($_POST['rol']=="2")
    {
      $sql = "SELECT id_cedula FROM cedula WHERE detalle = '".$_POST['cedula']."'";
      $result = $objConnection->getConnection()->query($sql);
      if($result)
      {
          if($row = $result->fetch_assoc()) 
          {
            $sql = "SELECT id_medico FROM medico WHERE id_cedula = '".$row['id_cedula']."'";
            $result = $objConnection->getConnection()->query($sql);
            if($result)
            {
                if($row = $result->fetch_assoc()) 
                {
                  echo "303";
                  return;
                }
            }
          }
          else
          {
            echo "302";
            return;
          }
      }
    }

    $sql = "INSERT INTO usuario(nombre,apellido_paterno,apellido_materno,fecha_nacimiento,sexo) 
    VALUES ('".$_POST['names']."','".$_POST['lastFatherName']."','".$_POST['lastMotherName']."',
    '".$_POST['dateBorn']."','".$_POST['gender']."')";

    $objConnection->getConnection()->query($sql); 

    $sql = "SELECT last_insert_id() AS ultimo";
    $result = $objConnection->getConnection()->query($sql);
    if($row = $result->fetch_assoc()) 
    {
      $idUser=$row['ultimo'];
      $sql="";

      if($_POST['rol']=="1")
      {
        $sql = "INSERT INTO correo(correo,id_usuario) VALUES ('".$_POST['email']."','".$idUser."');
        INSERT INTO telefono(id_usuario) VALUES ('".$idUser."');
        INSERT INTO direccion(id_usuario) VALUES ('".$idUser."');
        INSERT INTO cuenta(cuenta,contrasena,id_usuario,id_rol) 
        VALUES ('".$_POST['email']."','".$_POST['pass']."','".$idUser."','".$_POST['rol']."');
        SELECT last_insert_id() AS ultimo";
      }
      else
      {
        $sql = "INSERT INTO correo(correo,id_usuario) VALUES ('".$_POST['email']."','".$idUser."');
        INSERT INTO telefono(id_usuario) VALUES ('".$idUser."');
        INSERT INTO direccion(id_usuario) VALUES ('".$idUser."');
        INSERT INTO cuenta(cuenta,contrasena,id_usuario,id_rol) 
        VALUES ('".$_POST['email']."','".$_POST['pass']."','".$idUser."','".$_POST['rol']."');
        INSERT INTO medico(id_cuenta,id_cedula,id_especialidad) VALUE(
        (SELECT id_cuenta FROM cuenta WHERE id_usuario='".$idUser."'),
        (SELECT id_cedula FROM cedula WHERE detalle='".$_POST['cedula']."'),'".$_POST['area']."');
        SELECT last_insert_id() AS ultimo";
      }
      
      if ($objConnection->getConnection()->multi_query($sql))
      {
            $_SESSION['objAccount'] = new account($row['ultimo'],$_POST['email'],$_POST['pass'],
            new usuario($idUser,$_POST['names'],$_POST['lastFatherName'],$_POST['lastMotherName'],"","","","",""),
            $_POST['rol']);
  
            echo "201";
            return;
      }
    }
    echo "301";
  }break;

  //OBTIENE INFORMACION DETALLADA DEL LA CUENTA INICIADA
  case 3:
  {
    $user = getUser($_SESSION['objAccount']->getUser()->getId());

    if($user!="300")
    {
      $_SESSION['objAccount']->setUser($user);
      echo json_encode($_SESSION['objAccount']);
      return;
    }

    echo $user;

  }break;

  //EDITAR USUARIO
  case 4:
  { 
    $sql = "SELECT id_usuario FROM cuenta WHERE cuenta = '".$_POST['email']."'";
    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {
      if($row = $result->fetch_assoc()) 
      {
        if($row['id_usuario']!=$_SESSION['objAccount']->getUser()->getId())
        {
          echo "301";
          return;
        }
      }
    }
    

    $sql = "UPDATE usuario SET nombre='".$_POST['names']."',apellido_paterno='".$_POST['lastFatherName']."',
    apellido_materno='".$_POST['lastMotherName']."',fecha_nacimiento='".$_POST['dateBorn']."',
    sexo='".$_POST['gender']."',estado_civil='".$_POST['civilStatus']."',NSS='".$_POST['nss']."',
    CURP='".$_POST['curp']."' WHERE id_usuario='".$_SESSION['objAccount']->getUser()->getId()."';
    UPDATE cuenta SET cuenta='".$_POST['email']."' WHERE id_usuario='".$_SESSION['objAccount']->getUser()->getId()."';
    UPDATE correo SET correo='".$_POST['email']."' WHERE id_usuario='".$_SESSION['objAccount']->getUser()->getId()."';
    UPDATE telefono SET telefono='".$_POST['phone']."' WHERE id_usuario='".$_SESSION['objAccount']->getUser()->getId()."';
    UPDATE direccion SET numeroExterior='".$_POST['internalNumber']."',numeroExterior='".$_POST['externalNumber']."',
    calle='".$_POST['street']."',colonia='".$_POST['suburb']."',localidad='".$_POST['municipality']."',
    estado='".$_POST['state']."',cp='".$_POST['cp']."' WHERE id_usuario='".$_SESSION['objAccount']->getUser()->getId()."';";
          
    if ($objConnection->getConnection()->multi_query($sql))
    {
      $_SESSION['objAccount']->setName($_POST['email']);
      $_SESSION['objAccount']->getUser()->setName($_POST['names']);
      $_SESSION['objAccount']->getUser()->setLastFatherName($_POST['lastFatherName']);
      $_SESSION['objAccount']->getUser()->setLastMotherName($_POST['lastMotherName']);
      $_SESSION['objAccount']->getUser()->getEmail()->setDetail($_POST['email']);

      echo "201";
      return;
    }
    //echo var_dump(mysqli_error($objConnection->getConnection()));

    echo "301";
  }break;

  //OBTIENE LAS AREAS DE LOS ESPECIALISTAS REGISTRADOS
  case 5:
  { 
    $sql = "SELECT S.id_especialidad AS IDSPECIALTY,S.nombre AS NAMESPECIALTY FROM especialidad AS S 
            INNER JOIN medico AS M ON  S.id_especialidad=M.id_especialidad ";

    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {
        $listSpecialty = array();
        while($row = $result->fetch_assoc()) 
            $listSpecialty[]= new specialty($row['IDSPECIALTY'],$row['NAMESPECIALTY']);

        echo json_encode($listSpecialty);
    }
    else
      echo "300";
  }break;

  //OBTIENE EL NOMBRE DE LOS MEDICOS DEL AREA SELECCIONADA
  case 6:
  { 
    $sql = "SELECT M.id_medico AS IDMEDICAL,CONCAT(US.nombre,' ',US.apellido_paterno,' ',
    US.apellido_materno) AS NAMEMEDICAL,(SELECT COUNT(CO.id_consulta) FROM consulta AS CO 
    WHERE CO.id_medico=M.id_medico) AS COUNTCONSULTATION FROM medico AS M INNER JOIN cuenta AS AC ON 
    M.id_cuenta=AC.id_cuenta INNER JOIN usuario AS US ON AC.id_usuario=US.id_usuario 
    WHERE M.id_especialidad='".$_POST['area']."' ORDER BY COUNTCONSULTATION DESC";
  
    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {
      $listSpecialty = array();
      while($row = $result->fetch_assoc()) 
        $listSpecialty[]= array('id'=>$row['IDMEDICAL'],'name'=>$row['NAMEMEDICAL']);
          
      echo json_encode($listSpecialty);
    }
    else
      echo "300";
  }break;

  //OBTIENE LAS HORAS DISPONIBLES DEL MEDICO SELECCIONADO
  case 7:
  { 
    $_POST['dateConsultation']=substr($_POST['dateConsultation'],0,10);
    $sql = "SELECT HOUR(CO.horario) AS DATEHOUR FROM consulta AS CO WHERE CO.id_medico='".$_POST['id']."' 
    AND CO.fecha='".$_POST['dateConsultation']."'";
  
    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {
      $listHour = array();
      $listEnableHour=array();

      while($row = $result->fetch_assoc()) 
        $listHour[]= $row['DATEHOUR'];
          
      for($itrHour=8;$itrHour<22;$itrHour++)
      {
        if(array_search($itrHour,$listHour,true)==false)
        {
          if($_POST['dateConsultation']==date("Y-m-d"))
          {
            if((int)$itrHour>=(int)date("H"))
              $listEnableHour[]=$itrHour;
          }
          else
            $listEnableHour[]=$itrHour;
        }
      }

      echo json_encode($listEnableHour);
    }
    else
      echo "300";
  }break;

  //OBTIENE LOS MINUTOS DISPONIBLES DEL MEDICO SELECCIONADO
  case 8:
  { 
    $_POST['dateConsultation']=substr($_POST['dateConsultation'],0,10);
    $sql = "SELECT MINUTE(CO.horario) AS DATEMINUTE FROM consulta AS CO WHERE 
    CO.id_medico='".$_POST['id']."' AND HOUR(CO.horario)='".$_POST['hour']."' AND 
    CO.fecha='".$_POST['dateConsultation']."'";
    
    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {
      $listMinute = array();
      $listEnableMinute=array();
  
      while($row = $result->fetch_assoc()) 
        $listMinute[]= $row['DATEMINUTE'];
              
      if(array_search("0",$listMinute,true)==false)
      { 
        if($_POST['dateConsultation']==date("Y-m-d"))
        {
          if((int)$_POST['hour']==(int)date("H"))
          {
            if((int)date("i")<=5)
              $listEnableMinute[]="0";
          }
          else
            $listEnableMinute[]="0";
        }
        else
          $listEnableMinute[]="0";
      }

      if(array_search("20",$listMinute,true)==false)
      {
        if($_POST['dateConsultation']==date("Y-m-d"))
        {
          if($_POST['hour']==(int)date("H"))
          {
            if((int)date("i")<=25)
              $listEnableMinute[]="20";
          }
          else
            $listEnableMinute[]="20";
        }
        else
          $listEnableMinute[]="20";
      }

      if(array_search("40",$listMinute,true)==false)
      {
        if($_POST['dateConsultation']==date("Y-m-d"))
        {
          if($_POST['hour']==(int)date("H"))
          {
            if((int)date("i")<=45)
              $listEnableMinute[]="40";
          }
          else
            $listEnableMinute[]="40";
        }
        else
          $listEnableMinute[]="40";
      }
  
      echo json_encode($listEnableMinute);
    }
    else
      echo "300";
  }break;

  //REGISTRA CONSULTA
  case 9:
  { 
    $_POST['dateConsultation']=substr($_POST['dateConsultation'],0,10);
    $sql="SELECT CO.id_consulta FROM consulta AS CO WHERE CO.fecha='".$_POST['dateConsultation']."' 
          AND CO.horario='".$_POST['timeConsultation']."'";
        
    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {      
      if($row = $result->fetch_assoc()) 
      {
        echo "300";
        return;
      }
    }

    if($_POST['dateConsultation']==date("Y-m-d"))
    {
      if((int)substr($_POST['timeConsultation'],0,2)<(int)date("H"))
      {
        echo "300";
        return;
      }
      else if((int)substr($_POST['timeConsultation'],0,2)==(int)date("H"))
      {
        switch((int)substr($_POST['timeConsultation'],3,2))
        {
          case 0:
          {
            if((int)date("i")>=5)
            {
              echo "300";
              return;
            }
          }break;
          
          case 20:
          {
            if((int)date("i")>=25)
            {
              echo "300";
              return;
            }
          }break;
          
          case 40:
          {
            if((int)date("i")>=45)
            {
              echo "300";
              return;
            }
          }break;
        }
      }
    }
    
    $sql = "INSERT INTO consulta(id_usuario,id_medico,id_especialidad,fecha,horario,sintoma,estatus) 
    VALUES ('".$_SESSION['objAccount']->getUser()->getId()."','".$_POST['id_medical']."','".$_POST['id_area']."',
    '".$_POST['dateConsultation']."','".$_POST['timeConsultation']."','".$_POST['symptomDescription']."','P')";

    $objConnection->getConnection()->query($sql); 

    echo "200";
  }break;

  //OBTIENE LAS CONSULTAS DEL USUARIO
  case 10:
  { 
    $sql = "SELECT CO.id_consulta AS IDCONSULTATION,CO.fecha AS DATECONSULTATION,CO.horario AS 
    TIMECONSULTATION,ES.nombre AS ESPECIALTY,CONCAT(US.nombre,' ',US.apellido_paterno,' ',
    US.apellido_materno) AS NAMEMEDICAL,CASE WHEN CO.estatus='P' THEN 'PENDIENTE' 
    WHEN CO.estatus='A' THEN 'ATENDIDO' ELSE 'CANCELADO'END AS STATUSCONSULTATION FROM consulta AS CO 
    INNER JOIN medico AS ME ON CO.id_medico=ME.id_medico 
    INNER JOIN cuenta AS AC ON AC.id_cuenta=ME.id_cuenta
    INNER JOIN usuario AS US ON AC.id_usuario=US.id_usuario 
    INNER JOIN especialidad AS ES ON ES.id_especialidad=CO.id_especialidad 
    WHERE CO.id_usuario='".$_SESSION['objAccount']->getUser()->getId()."' AND CO.estatus!='C'
    ORDER BY IDCONSULTATION DESC";
    
    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {
      $listConsultation = array();
    
      while($row = $result->fetch_assoc()) 
      {
        $listConsultation[]= array('id'=>$row['IDCONSULTATION'],'date'=>$row['DATECONSULTATION'],
        'time'=>$row['TIMECONSULTATION'],'area'=>$row['ESPECIALTY'],'medical'=>$row['NAMEMEDICAL'],
        'status'=>$row['STATUSCONSULTATION']);
      }
      echo json_encode($listConsultation);
    }
    else
      echo "300";
  }break;

  //OBTIENE OBJETO DOCTOR
  case 11:
  { 
    if($_SESSION['objAccount']->getRol()=="2")
    {
      $sql="SELECT ME.id_medico AS IDDOCTOR,AC.id_usuario AS IDUSER,CE.detalle AS CEDULA,
      SP.id_especialidad AS IDSPECIALTY,SP.nombre AS NAMESPECIALTY FROM medico AS ME 
      INNER JOIN cuenta AS AC ON AC.id_cuenta=ME.id_cuenta 
      INNER JOIN especialidad AS SP ON ME.id_especialidad=SP.id_especialidad 
      INNER JOIN cedula AS CE ON CE.id_cedula=ME.id_cedula WHERE 
      AC.id_usuario='".$_SESSION['objAccount']->getUser()->getId()."'";
          
      $result = $objConnection->getConnection()->query($sql);
    
      if($result)
      {      
        if($row = $result->fetch_assoc()) 
        {
          $_SESSION['objDoctor'] = new doctor($row['IDDOCTOR'],getUser($row['IDUSER']),
          $row['CEDULA'],new specialty($row['IDSPECIALTY'],$row['NAMESPECIALTY']));
        }
      }
    }

    echo json_encode($_SESSION['objAccount']);
  }break;

  //OBTIENE OBJETO DE UNA CONSULTA 
  case 12:
  { 
    $sql="SELECT id_consulta AS IDCONSULTATION,id_usuario AS IDUSER,id_medico AS IDDOCTOR,
    fecha AS DATECONSULTATION,horario AS TIMECONSULTATION,sintoma AS SYMTOMATIC,estatus AS STATUSCONSULATATION,
    descripcion AS DESCRIPTIONCONSULTATION,receta AS RECETA FROM consulta WHERE id_consulta='".$_POST['id']."'"; 
    $result = $objConnection->getConnection()->query($sql);

    if($result)
    {      
      if($row = $result->fetch_assoc()) 
      {
        $objConsultation=new consultation($row['IDCONSULTATION'],$row['DATECONSULTATION'],
        $row['TIMECONSULTATION'],$row['SYMTOMATIC'],$row['STATUSCONSULATATION'],
        $row['DESCRIPTIONCONSULTATION'],$row['RECETA']);

        $idUser=$row['IDUSER'];
        $idDoctor=$row['IDDOCTOR'];

        $objConsultation->setUser(getUser($row['IDUSER']));
        $objConsultation->setDoctor(getDoctor($row['IDDOCTOR'],0));

        echo json_encode($objConsultation);
        return;
      }
    }
      //var_dump(mysqli_error($objConnection->getConnection()));

    echo "300";
  }break;

  //ELIMINA UNA CONSULTA 
  case 13:
  { 
    $sql = "UPDATE consulta SET estatus='C' WHERE id_consulta='".$_POST['id']."'";
    $objConnection->getConnection()->query($sql); 

    echo "200";
  }break;

  case 14:
  {
    $sql = "SELECT CO.id_consulta AS IDCONSULTATION,CO.fecha AS DATECONSULTATION,CO.horario AS 
    TIMECONSULTATION,CONCAT(US.nombre,' ',US.apellido_paterno,' ',
    US.apellido_materno) AS NAMEUSER,CO.sintoma AS SYMTOMATIC,CASE WHEN CO.estatus='P' THEN 'PENDIENTE' 
    WHEN CO.estatus='A' THEN 'ATENDIDO' ELSE 'CANCELADO'END AS STATUSCONSULTATION FROM consulta AS CO 
    INNER JOIN medico AS ME ON CO.id_medico=ME.id_medico 
    INNER JOIN cuenta AS AC ON AC.id_cuenta=ME.id_cuenta
    INNER JOIN usuario AS US ON CO.id_usuario=US.id_usuario 
    INNER JOIN especialidad AS ES ON ES.id_especialidad=CO.id_especialidad 
    WHERE CO.id_medico='".$_SESSION['objDoctor']->getId()."' 
    ORDER BY IDCONSULTATION DESC";
    
    $result = $objConnection->getConnection()->query($sql);
    if($result)
    {
      $listConsultation = array();
    
      while($row = $result->fetch_assoc()) 
      {
        $listConsultation[]= array('id'=>$row['IDCONSULTATION'],'date'=>$row['DATECONSULTATION'],
        'time'=>$row['TIMECONSULTATION'],'nameUser'=>$row['NAMEUSER'],'symtomatic'=>$row['SYMTOMATIC'],
        'status'=>$row['STATUSCONSULTATION']);
      }
      echo json_encode($listConsultation);
    }
    else
      echo "300";
  }break;

  case 15:
  {
      $todayDate=date('Y-m-d');
      $todayTime=date('H');

      if($_SESSION['objAccount']->getRol()=="1")
      {
        $sql = "SELECT CO.id_consulta AS IDCONSULTATION,
        MINUTE(CO.horario) AS TIMEMINUTE  FROM consulta AS CO WHERE 
        CO.fecha='".$todayDate."' AND HOUR(CO.horario)='".$todayTime."' AND 
        CO.id_usuario='".$_SESSION['objAccount']->getUser()->getId()."' AND 
        CO.estatus='P'";
      }
      else
      {
        $sql = "SELECT CO.id_consulta AS IDCONSULTATION,
        MINUTE(CO.horario) AS TIMEMINUTE  FROM consulta AS CO WHERE 
        CO.fecha='".$todayDate."' AND HOUR(CO.horario)='".$todayTime."' AND 
        CO.id_medico='".$_SESSION['objAccount']->getUser()->getId()."' AND 
        CO.estatus='P'";
      }
      
      $result = $objConnection->getConnection()->query($sql);
      if($result)
      {
        while($row = $result->fetch_assoc()) 
        {
          $todayTime=date('i');
          switch((int)$row['TIMEMINUTE'])
          {
            case 0:
            {
              if((int)$todayTime<=15)
              {
                $_SESSION['consulta']=$row['IDCONSULTATION'];
                echo "200";
                return;
              }
            }break;

            case 20:
            {
              if((int)$todayTime>=20 && (int)$todayTime<=35)
              {
                $_SESSION['consulta']=$row['IDCONSULTATION'];
                echo "200";
                return;
              }
            }break;

            case 40:
            {
              if((int)$todayTime>=40 && (int)$todayTime<=55)
              {
                $_SESSION['consulta']=$row['IDCONSULTATION'];
                echo "200";
                return;
              }
            }break;
          }
        }

      }

      echo "300";
  }break;

  case 16:
  {
    $sql = "UPDATE consulta SET estatus='A' WHERE id_consulta='".$_SESSION['consulta']."'";

    $objConnection->getConnection()->query($sql); 

    echo "200";
  }break;
}

?>