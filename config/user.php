<?php

    class User {
        private $conn;
        private $table_name = "";
        public $id;
        public $name;
        public $telephone;
        public $message;
        public function __construct($db)
        {
            $this->conn = $db;
        }
        function create() {
            $query = "INSERT INTO
                        " . $this->table_name . "
                    SET
                        id=:id, name=:name, telephone=:telephone, email=:email, message=:message";

            $stmt = $this->conn->prepare($query);

            $this->id = htmlspecialchars($this->id);
            $this->name = htmlspecialchars($this->name);
            $this->telephone = htmlspecialchars($this->telephone);
            $this->email = htmlspecialchars($this->email);
            $this->message = htmlspecialchars($this->message);

            $stmt->bindParam(":id", $this->id);
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":telephone", $this->telephone);
            $stmt->bindParam(":email", $this->email);
            $stmt->bindParam(":message", $this->message);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }
    }

?>