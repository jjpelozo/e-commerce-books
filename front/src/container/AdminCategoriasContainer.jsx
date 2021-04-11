import React, { useEffect, useState } from "react";
import { AdminCategorias } from "../components/AdminCategorias";
import { useDispatch, useSelector } from "react-redux";
import { setCategorias } from "../state/categorias";

export default function AdminCategoriasContainer() {
  const categorias = useSelector((state) => state.categorias);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategorias());
  }, []);

  return <AdminCategorias categorias={categorias} />;
}
