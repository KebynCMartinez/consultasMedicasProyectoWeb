<?php
  require_once("class_user.php");
  require_once("class_specialty.php");

  class doctor
  {
  	public $id;
  	public $user;
  	public $cedula;
  	public $especialidad;

  	function __construct($id_,$user_,$cedula_,$specialty_)
  	{
  		$this->id=$id_;
        $this->user=$user_;
        $this->cedula=$cedula_;
        $this->specialty=$specialty_;
  	}
  	public function getId(){ return $this->id; }
  	public function getUser(){ return $this->user; }
  	public function getCedula(){ return $this->cedula; }
  	public function getSpecialty(){ return $this->specialty; }

  	public function setId($id_){ $this->id=$id_; }
  	public function setUser($user_){ $this->user=$user_; }
  	public function setCedula($cedula_){ $this->cedula=$cedula_; }
  	public function setSpecialty($specialty_){ $this->specialty=$specialty_; }
  } 
 ?>