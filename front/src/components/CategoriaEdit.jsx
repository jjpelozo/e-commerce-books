import { Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setCategorias } from "../state/categorias";
export default function CategoriaEdit({ id }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [categoria, setCategoria] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(`/api/admin/categoria/${id}`)
      .then(({ data }) => setCategoria(data.name));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/admin/categoria/edit/${id}`, { name: input })
      .then((categoria) => dispatch(setCategorias(categoria)));
    setInput("");
    alert("Libro actualizada")
    history.push("/admin/categorias")
  };

  //axios.put(`/api/admin/categoria/edit/${id}`)

  return (
    <div>
      <Typography variant="h4" style={{ margin: 20 }}>
        Modificá la categoria
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} sm={6} style={{ marginTop: 50 }}>
          <TextField
            autoComplete="fname"
            name="titulo"
            variant="outlined"
            fullWidth
            id="firstName"
            label={categoria}
            autoFocus
            value={input}
            onChange={handleChange}
          />
        </Grid>
      </form>
    </div>
  );
}
