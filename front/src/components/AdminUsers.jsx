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
} from "@material-ui/core";
import React from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useDispatch } from "react-redux";

import { GroupAddSharp, Delete } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import axios from "axios";
import { setUsers } from "../state/users";
import { useStyles } from "../utils/stylesAdminUsers";


export default function AdminUsers({ users }) {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  const classes = useStyles();

  const handleDelete = (id) => {
    axios.delete(`/api/admin/users/${id}`);
    dispatch(setUsers());
  };

  const handleAdmin = (id, admin) => {
    console.log(admin);
    axios.put(`/api/admin/users/update/${id}`, { admin });
    dispatch(setUsers());
  };

  return (

    
    <Grid container direction="row" justify="center" alignItems="stretch" style={{ height: "100vh"}}>


      <Grid item xs={10} style={{ paddingLeft: 20 }}>
        <Typography variant="h6" className={classes.title}>
          Users
        </Typography>
        <div className={classes.demo}>
          <List id="prueba">
            {users.map((usuario, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <Tooltip title={"IS ADMIN: " + usuario.isAdmin}>
                  <ListItemText primary={usuario.email} />
                </Tooltip>

                {usuario.nombre != user ? (
                  <>
                    <Tooltip title="AGREGAR/QUITAR DE ADMIN">
                      <ListItemSecondaryAction
                        style={{ paddingRight: 65 }}
                        onClick={() =>
                          handleAdmin(usuario._id, usuario.isAdmin)
                        }
                      >
                        <IconButton edge="end" aria-label="add-admin">
                          <GroupAddSharp />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </Tooltip>
                    <Tooltip title="ELIMINAR">
                      <ListItemSecondaryAction
                        onClick={() => handleDelete(usuario._id)}
                      >
                        <IconButton edge="end" aria-label="delete">
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </Tooltip>
                  </>
                ) : null}
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    </Grid>
  );
}
