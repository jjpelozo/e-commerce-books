import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Register from "../components/Register";

const RegisterContainer = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.name === "nombre") setNombre(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "apellido") setApellido(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return axios
      .post("/api/register", { nombre, apellido, password, email })
      .then((user) => {
        console.log(user.data);
        if (user.data.errors) {
          alert(user.data.errors.email.message);
        } else {
          alert("creacion exitosa");
          return history.push("/login");
        }
      })

      .catch((e) => alert(e));
     
  };

  return <Register handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default RegisterContainer;
