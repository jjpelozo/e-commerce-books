import React, { useEffect, useState } from "react";
import AdminBooks from "../components/AdminBooks";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../state/books";

export default function AdminBooksContainer() {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBooks());
  }, []);

  return <AdminBooks books={books} />;
}
