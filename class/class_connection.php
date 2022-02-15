<?php
  class connection
  {
  	public $serverName;
    public  $user;
    public  $pass;
    public  $dbname;
  	function __construct()
  	{
        $this->serverName = "localhost";
        $this->user = "soluc108_oscar";
        $this->pass = "dandelot2012";
        $this->dbname = "consulting_room";
        $this->conn = new mysqli($this->serverName ,$this->user,$this->pass ,$this->dbname );
        //$this->conn = new PDO("mysql:host=$this->serverName;dbname=$this->dbname", $this->user, $this->pass);
        //$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if (!$this->conn) {
          echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
          echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
          echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
          exit;
        }
    }

    public function getConnection()
    {
        return $this->conn;
    }
  } 
?>