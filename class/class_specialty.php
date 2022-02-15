<?php
  class specialty
  {
  	public $id;
  	public $name;

  	function __construct($id_,$name_)
  	{
  		$this->id=$id_;
  		$this->name=$name_;
  	}
  	public function getId(){ return $this->id; }
  	public function getName(){ return $this->name; }

    public function setId($id_){ $this->id=$id_; }
    public function setName($name_){ $this->name=$name_;}
  } 
 ?>