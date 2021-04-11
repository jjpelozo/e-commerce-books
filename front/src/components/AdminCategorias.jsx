import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Button,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategorias } from "../state/categorias";

import { Delete, Edit } from "@material-ui/icons";
import ClassIcon from '@material-ui/icons/Class';

import { useStyles } from "../utils/stylesAdminUsers";
import { useHistory } from "react-router";

export const AdminCategorias = ({ categorias }) => {
  const [input, setInput] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(setCategorias());
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/admin/categorias/${id}`);
    dispatch(setCategorias());
  };

  const handleEdit = (id) => {
    history.push(`/admin/categoria/edit/${id}`);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/admin/categorias", { name: input });
    setInput("");
    dispatch(setCategorias());
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" style={{ padding: 20 }} align="center">
            Nueva categoría
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            label="ingrese nombre de categoría"
            name="categoria"
            value={input}
            autoFocus
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Agregar
          </Button>
        </form>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10} style={{ paddingLeft: 20 }}>
          <Typography variant="h6" className={classes.title}>
            Categorias
          </Typography>
          <Grid
            item
            xs={10}
            style={{ paddingLeft: 20 }}
            className={classes.demo}
          >
            <List>
              {categorias &&
                categorias.map((categoria, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar>
                        <ClassIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={categoria.name} />
                    <Tooltip title="EDITAR">
                      <ListItemSecondaryAction
                        onClick={() => {
                          handleEdit(categoria._id);
                        }}
                        style={{ paddingRight: 65 }}
                        /*    onClick={() => handleAdmin(categoria._id)} */
                      >
                        <IconButton edge="end" aria-label="add-admin">
                          <Edit />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </Tooltip>
                    <Tooltip title="ELIMINAR">
                      <ListItemSecondaryAction
                        onClick={() => handleDelete(categoria._id)}
                      >
                        <IconButton edge="end" aria-label="delete">
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </Tooltip>
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
