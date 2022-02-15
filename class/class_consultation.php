<?php
  require_once("class_doctor.php");
  require_once("class_user.php");

  class consultation
  {
  	public $id;
    public $user;
    public $doctor;
    public $date;

    public $time;
  	public $symtomatic;
    public $status;
    public $description;
    public $receta;

  	function __construct($id_,$date_,$time_,$symtomatic_,$status_,$description_)
  	{
        $this->id=$id_;
        $this->date=$date_;
        $this->time=$time_;
        $this->symtomatic=$symtomatic_;
        $this->status=$status_;
        $this->description=$description_;
  	}
  	public function getId(){ return $this->id; }
    public function getUser(){ return $this->user; }
    public function getDoctor(){ return $this->doctor; }
    public function getDate(){ return $this->date; }
    public function getTime(){ return $this->time; }
    public function getSymtomatic(){ return $this->symtomatic; }
    public function getStatus(){ return $this->status; }
  	public function getDescription(){ return $this->description; }
    public function getReceta(){ return $this->receta; }
 
    public function setId($id_){ $this->id=$id_;}
    public function setUser($user_){$this->user=$user_;}
    public function setDoctor($doctor_){ $this->doctor=$doctor_; }
    public function setDate($date_){ $this->date=$date_; }
    public function setTime($time_){ $this->time=$time_; }
    public function setSymtomatic($symtomatic_){ $this->symtomatic=$symtomatic_; }
    public function setStatus($status_){ $this->status=$status_; }
  	public function setDescription($description_){ $this->description=$description_; }
    public function setReceta($receta_){ $this->receta=$receta_; }
  } 
 ?>