<?php

  require_once("class_address.php");
  require_once("class_phone.php");
  require_once("class_email.php");

  class usuario
  {
  	public $id;
  	public $name;
    public $lastFatherName;
    public $lastMotherName;
  	public $bornDate;
    public $gender;
    public $civilStatus;
    public $NSS;
    public $CURP;

    public $address;
    public $email;
    public $phone;

    function __construct($id_,$name_,$lastFatherName_,$lastMotherName_,$bornDate_,$gender_,$civilStatus_,$NSS_,$CURP_)
  	{
  		$this->id=$id_;
  		$this->name=$name_;
      $this->lastFatherName=$lastFatherName_;
      $this->lastMotherName=$lastMotherName_;
      $this->bornDate=$bornDate_;
      $this->gender=$gender_;
      $this->civilStatus=$civilStatus_;
      $this->NSS=$NSS_;
      $this->CURP=$CURP_;
  	}
  	public function getId(){ return $this->id; }
    public function getNombre(){ return $this->nombre; }
    public function getLastFatherName(){ return $this->lastFatherName; }
    public function getLastMotherName(){ return $this->lastMotherName; }
  	public function getBornDate(){ return $this->age; }
  	public function getGender(){ return $this->gender; }
    public function getcivilStatus(){ return $this->civilStatus; }
    public function getNSS(){ return $this->NSS; }
    public function getCurp(){ return $this->CURP; }
    public function getAddress(){ return $this->address; }
    public function getEmail(){ return $this->email; }
    public function getPhone(){ return $this->phone; }

    public function setId($id_){ $this->id=$id_; }
    public function setName($name_){ $this->name=$name_; }
    public function setLastFatherName($lastFatherName_){ $this->lastFatherName=$lastFatherName_; }
    public function setLastMotherName($lastMotherName){ $this->lastMotherName=$lastMotherName; }
    public function setGender($gender_){ $this->gender=$gender_; }
    public function setCivilStatus($civilStatus_){$this->civilStatus=$civilStatus_; }
    public function setNSS($NSS_){ $this->NSS=$NSS_; }
    public function setCURP($CURP_){$this->CURP=$CURP_;}
    public function setAddress($address_){ $this->address=$address_; }
    public function setEmail($email_){ $this->email=$email_; }
    public function setPhone($phone_){ $this->phone=$phone_; }
  } 
 ?>