<?php
  require_once("class_user.php");
  require_once("class_rol.php");
  
  class account
  {
    public $id;
    public $name;
    public $password;
  	public $user;
  	public $rol;

  	function __construct($id_,$name_,$password_,$user_,$rol_)
  	{
  		$this->id=$id_;
        $this->name=$name_;
        $this->password=$password_;
        $this->user=$user_;
        $this->rol=$rol_;
  	}
    public function getId(){ return $this->id; }
    public function getName(){ return $this->name; }
  	public function getPassword(){ return $this->password; }
  	public function getUser(){ return $this->user; }
  	public function getRol(){ return $this->rol; }

    public function setId($id_){ $this->id=$id_; }
    public function setName($name_){  $this->name=$name_; }
  	public function setPassword($password_){ $this->password=$password_; }
  	public function setUser($user_){ $this->user=$user_; }
  	public function setRol($rol_){ $this->rol=$rol_; }
  } 
 ?>