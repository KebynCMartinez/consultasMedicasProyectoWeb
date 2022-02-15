<?php
  class address
  {
  	public $id;
    public $externalNumber;
    public $internalNumber;
    public $street;

    public $suburb;
  	public $municipality;
    public $state;
    public $cp;

  	function __construct($id_,$externalNumber_,$internalNumber_,$street_,$suburb_,$municipality_,$state_,$cp_)
  	{
  		$this->id=$id_;
      $this->externalNumber=$externalNumber_;
      $this->internalNumber=$internalNumber_;
      $this->street=$street_;
      $this->suburb=$suburb_;
  		$this->municipality=$municipality_;
  		$this->state=$state_;
      $this->cp=$cp_;
  	}
  	public function getId(){ return $this->id; }
    public function getExternalNumber(){ return $this->externalNumber; }
    public function getInternalNumber(){ return $this->internalNumber; }
    public function getStreet(){ return $this->street; }
    public function getSuburb(){ return $this->suburb; }
  	public function getMunicipality(){ return $this->municipality; }
  	public function getState(){ return $this->state; }
    public function getCp(){ return $this->cp; }
 
    public function setId($id_){ $this->id=$id_; }
    public function setExternalNumber($externalNumber_){ return $this->externalNumber=$externalNumber_; }
    public function setInternalNumber($internalNumber_){ return $this->internalNumber=$internalNumber_; }
    public function setStreet($street_){ return $this->street=$street_; }
    public function setSuburb($suburb_){ $this->suburb=$suburb_; }
    public function setMunicipality($municipality_){ $this->municipality=$municipality_; }
    public function setState($state_){ $this->state=$state_; }
    public function setCp($cp_){ $this->cp=$cp_; }
  } 
 ?>