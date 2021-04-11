import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { setBook } from "../state/book";
import { useSelector, useDispatch } from "react-redux";
import { setCategorias } from "../state/categorias";
import { setBooks } from "../state/books";

import useStyles from "../utils/stylesRegister";
import { useHistory } from "react-router";

export default function CreateBook({ id }) {
  const history = useHistory();
  const book = useSelector((store) => store.book);
  const categorias = useSelector((state) => state.categorias);
  const [selected, setSelected] = useState();
  const [titulo, setTitulo] = useState(book.titulo);
  const [autor, setAutor] = useState(book.autor);
  const [imagen, setImgURL] = useState(book.imagen);
  const [editorial, setEditorial] = useState(book.editorial);
  const [categoria, setCategoria] = useState();
  const [precio, setPrecio] = useState(book.precio);
  const [num_paginas, setNumPaginas] = useState(book.num_paginas);
  const [edicion, setEdicion] = useState(book.edicion);
  const [reseqna, setReseqna] = useState(book.reseqna);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategorias());
    dispatch(setBook(id));
  }, [selected]);

  const handleSelected = (name, id) => {
    setSelected(name);
    setCategoria(id);
  };

  const handleChange = (e) => {
    if (e.target.name === "titulo") setTitulo(e.target.value);
    if (e.target.name === "autor") setAutor(e.target.value);
    if (e.target.name === "imagen") setImgURL(e.target.value);
    if (e.target.name === "editorial") setEditorial(e.target.value);
    /*  if (e.target.name === "categoria") setCategoria(selected); */
    if (e.target.name === "precio") setPrecio(e.target.value);
    if (e.target.name === "num_pag") setNumPaginas(e.target.value);
    if (e.target.name === "edicion") setEdicion(e.target.value);
    if (e.target.name === "reseqna") setReseqna(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    return axios
      .post(`/api/admin/products/create`, {
        titulo,
        num_paginas,
        edicion,
        reseqna,
        categoria,
        autor,
        editorial,
        precio,
        imagen,
      })
      .then(() => {
        alert("Libro Creado");
        dispatch(setBooks());
        history.push("/admin/products");
      });
  };

  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Typography variant="h4" style={{ margin: 20 }}>
        Agregar libro
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
            variant="outlined"
            fullWidth
            id="firstName"
            label={"Título: "}
            autoFocus
            value={titulo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            autoFocus
            id="lastName"
            label={"Autor: "}
            name="autor"
            value={autor}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="editorial"
            variant="outlined"
            fullWidth
            id="editorial"
            label={"Editorial: "}
            onChange={handleChange}
            value={editorial}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel id="demo-simple-select-filled-label">
              {selected ? selected : "Categoria"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              name="categoria"
              id="demo-simple-select-filled"
              value={selected}
              onChange={handleChange}
            >
              {categorias &&
                categorias.map((categ) => {
                  return (
                    <MenuItem
                      value={selected}
                      onClick={() => handleSelected(categ.name, categ._id)}
                    >
                      {categ.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            id="lastName"
            label={"Num de pag: "}
            name="num_pag"
            value={num_paginas}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="edicion"
            variant="outlined"
            fullWidth
            id="edición"
            label={"Edición: "}
            autoComplete="email"
            onChange={handleChange}
            value={edicion}
          />
        </Grid>
        <Grid Item xs={12} style={{ padding: 20 }}>
          <TextField
            variant="outlined"
            name="reseqna"
            fullWidth
            label={"Reseña:"}
            value={reseqna}
            multiline
            rows={6}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="imagen"
            variant="outlined"
            fullWidth
            id="edición"
            label={"Imagen URL: "}
            onChange={handleChange}
            value={imagen}
          />
        </Grid>
        <Grid item xs={6} sm={3} justify="center">
          <TextField
            name="precio"
            variant="outlined"
            label={"Precio: $"}
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
            Crear Libro
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
