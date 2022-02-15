<?php
  class rol
  {
    public $id;
    public $name;
  	public $description;

  	function __construct($id_,$name_,$description_)
  	{
        $this->id=$id_;
        $this->name=$name_;
  		$this->description=$description_;
  	}
    public function getId(){ return $this->id; }
    public function getName(){ return $this->name_; }
  	public function getDescription(){ return $this->description; }

    public function setId($id_){ $this->id=$id_; }
    public function setName($name_){ $this->name=$name_; }
    public function setDescription($description_){ $this->description=$description_; }
  } 
 ?>