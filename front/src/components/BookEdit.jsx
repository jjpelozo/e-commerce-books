import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { setBook } from "../state/book";
import { useSelector, useDispatch } from "react-redux";
import { setCategorias } from "../state/categorias";

import useStyles from "../utils/stylesRegister";
import { useHistory } from "react-router";

export default function BookEdit({ id }) {
  const history = useHistory();
  const book = useSelector((store) => store.book);
  const [titulo, setTitulo] = useState(book.titulo);
  const [autor, setAutor] = useState(book.autor);
  const [editorial, setEditorial] = useState(book.editorial);
  const [precio, setPrecio] = useState(book.precio);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategorias());
    dispatch(setBook(id));
  }, []);

  /*   useEffect(() => {
 
  }, []); */

  const handleChange = (e) => {
    if (e.target.name === "titulo") setTitulo(e.target.value);
    if (e.target.name === "autor") setAutor(e.target.value);
    if (e.target.name === "editorial") setEditorial(e.target.value);
    if (e.target.name === "precio") setPrecio(e.target.value);
  };

  const onSubmit = (e) => {
    console.log(book);
    e.preventDefault();
    axios
      .post(`/api/admin/products/edit/${id}`, {
        titulo,
        autor,
        editorial,
        precio,
      })
      .then(() => {
        alert("Libro actualizado");
        history.push("/admin/products");
      });
  };

  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Typography variant="h4" style={{ margin: 20 }}>
        Modificá el libro
      </Typography>
      <Grid
        container
        spacing={4}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12}>
          <TextField
            name="titulo"
            label=""
            variant="outlined"
            fullWidth
            id="firstName"
            label={"Título: " + book.titulo}
            autoFocus
            value={titulo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            id="lastName"
            label={"Autor: " + book.autor}
            name="autor"
            value={autor}
            onChange={handleChange}
          />
        </Grid>
        {/* <Grid Item>
          <InputLabel htmlFor="outlined-age-native-simple">
            Categoria
          </InputLabel>
          <Select
            native
            value=""
            label="Categoria"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            {categorias &&
              categorias.map((categoria) => {
                return <option value={categoria.name}>{categoria.name}</option>;
              })}
          </Select>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            name="editorial"
            variant="outlined"
            fullWidth
            id="editorial"
            label={"Editorial: " + book.editorial}
            autoComplete="email"
            onChange={handleChange}
            value={editorial}
          />
        </Grid>
        <Grid Item xs={12} style={{ padding: 20 }}>
          <TextField
            variant="outlined"
            placeholder={"Reseña:" + book.reseqna}
            fullWidth
            label={"Reseña:"}
            multiline
            rows={6}
          />
        </Grid>
        <Grid item xs={6} sm={3} justify="center">
          <TextField
            name="precio"
            variant="outlined"
            label={"Precio: $" + book.precio}
            margin="normal"
            id="precio"
            autoComplete="current-password"
            value={precio}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={3} justify="center">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Enviar Info
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
