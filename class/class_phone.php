<?php
  class phone
  {
  	public $id;
  	public $detail;

  	function __construct($id_,$detail_)
  	{
  		$this->id=$id_;
  		$this->detail=$detail_;
  	}
  	public function getId(){ return $this->id; }
  	public function getDetail(){ return $this->detail; }

    public function setId($id_){ $this->id=$id_; }
    public function setDetail($detail_){ $this->detail=$detail_; }
  } 
 ?>