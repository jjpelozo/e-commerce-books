import React, { useState } from "react";
import Home from "./components/Home";
import FormRegisterContainer from "./container/FormRegisterContainer";
import Shop from "./components/Shop";
import SingleCard from "./components/SingleCard";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import FormLoginContainer from "./container/FormLoginContainer";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import lightBlue from "@material-ui/core/colors/lightBlue";
import blueGrey from "@material-ui/core/colors/blueGrey";
import AdminUsersContainer from "./container/AdminUsersContainer";
import AdminCategoriasContainer from "./container/AdminCategoriasContainer";
import AdminBooksContainer from "./container/AdminBooksContainer";
import BookEdit from "./components/BookEdit";
import CategoriaEdit from "./components/CategoriaEdit";
import CreateBook from "./components/CreateBook";
import Review from "./components/Review";
import ReviewsBook from "./components/ReviewsBook";

function App() {
  const [modo, setModo] = useState("dark");
  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${modo})`);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: prefersDarkMode
          ? { type: "dark", primary: { main: lightBlue[700] } }
          : { type: "light", primary: { main: blueGrey[800] } },

        typography: {
          fontFamily: ["Ubuntu", "cursive"].join(","),
        },
      }),
    [prefersDarkMode]
  );

  const changeMode = () => {
    modo === "dark" ? setModo("light") : setModo("dark");
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar changeMode={changeMode} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home changeMode={changeMode} />}
            />
            <Route exact path="/login" component={FormLoginContainer} />
            <Route exact path="/register" component={FormRegisterContainer} />
            <Route exact path="/shop" render={() => <Shop />} />
            <Route
              exact
              path="/singlecard/:id"
              render={({ match }) => <SingleCard id={match.params.id} />}
            />
            <Route path="/search/:keyword" component={Home} />
            <Route exact path="/admin/users" component={AdminUsersContainer} />
            <Route
              exact
              path="/singlecard/:id/review"
              render={({ match }) => <Review id={match.params.id} />}
            />
            <Route
              exact
              path="/singlecard/:id/reviews"
              render={({ match }) => <ReviewsBook id={match.params.id} />}
            />
            <Route path="/search/:keyword" component={Home} />
            <Route exact path="/admin/users" component={AdminUsersContainer} />
            <Route
              exact
              path="/admin/categorias"
              component={AdminCategoriasContainer}
            />
            <Route path="/search/category/:keyword" component={Home} />

            <Route exact path="/admin/users" component={AdminUsersContainer} />
            <Route
              exact
              path="/admin/products"
              component={AdminBooksContainer}
            />

            <Route
              exact
              path="/admin/product/edit/:id"
              render={({ match }) => <BookEdit id={match.params.id} />}
            />
            <Route
              exact
              path="/admin/product/create/:id"
              render={({ match }) => <CreateBook id={match.params.id} />}
            />
            <Route
              exact
              path="/admin/categoria/edit/:id"
              render={({ match }) => <CategoriaEdit id={match.params.id} />}
            />
            
          </Switch>
        </BrowserRouter>

        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
