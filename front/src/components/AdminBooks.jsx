import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  Tooltip,
  Button,
} from "@material-ui/core";
import { setBooks } from "../state/books";
import { setBook } from "../state/book";

import { Edit, Delete } from "@material-ui/icons";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { useStyles } from "../utils/stylesAdminUsers";

export default function AdminBooks() {
  const books = useSelector((state) => state.books);
  const book = useSelector((state) => state.book);
  // const [book] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(setBooks());
    dispatch(setBook());
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/admin/products/${id}`);
    dispatch(setBooks());
  };

  const handleEditBook = (id) => {
    return history.push(`/admin/product/edit/${id}`);
  };

  const handleCreateBook = (id) => {
    return history.push(`/admin/product/create/${id}`);
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      style={{ padding: 20 }}
    >
      <Typography variant="h6" className={classes.title}>
        Libros
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleCreateBook(book._id)}
      >
        Agregar Nuevo Libro
      </Button>

      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={10} style={{ padding: 20 }}>
          <div className={classes.demo}>
            <List>
              {books &&
                books.map((book, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <Avatar>
                        <MenuBookIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={book.titulo} />
                    <Tooltip title="EDITAR">
                      <ListItemSecondaryAction
                        style={{ paddingRight: 65 }}
                        onClick={() => handleEditBook(book._id)}
                      >
                        <IconButton edge="end" aria-label="add-admin">
                          <Edit />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </Tooltip>
                    <Tooltip title="ELIMINAR">
                      <ListItemSecondaryAction
                        onClick={() => handleDelete(book._id)}
                      >
                        <IconButton edge="end" aria-label="delete">
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </Tooltip>
                  </ListItem>
                ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
