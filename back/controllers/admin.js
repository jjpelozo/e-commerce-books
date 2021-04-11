const User = require("../models/User");
const Categoria = require("../models/Categorias");
const Product = require("../models/Product");

const adminController = {
  findUsers(req, res) {
    User.find()
      .then((users) => res.send(users).status(200))
      .catch((e) => res.send(e).status(400));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then(res.sendStatus(200))
      .catch((e) => res.send(e));
  },
  update(req, res) {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body).then((user) =>
      res.send(user)
    );
  },
  changeAdmin(req, res) {
    console.log(req.body.admin);
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (req.body.admin == true) {
          user.isAdmin = false;
          return user.save();
        }
        user.isAdmin = true;
        return user.save();
      })
      .then((user) => console.log(user));
  },
  createCategories(req, res) {
    Categoria.create(req.body).then((categoria) => res.send(categoria));
  },
  deleteCategoria(req, res) {
    Categoria.findOneAndDelete({ _id: req.params.id }).then(() =>
      res.sendStatus(200)
    );
  },
  deleteProduct(req, res) {
    Product.findOneAndDelete({ _id: req.params.id }).then(() =>
      res.sendStatus(200)
    );
  },
  getCategoria(req, res) {
    Categoria.findOne({ _id: req.params.id }).then((categoria) =>
      res.send(categoria)
    );
  },
  updateCategoria(req, res) {
    Categoria.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    ).then((categoria) => res.send(categoria));
  },
  updateBook(req, res) {
    console.log(req.body);
    Product.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .populate("categoria")
      .then((product) => res.send(product))
      .catch((e) => res.send(e));
  },
  createBook(req, res) {
    console.log(req.body);
    Product.create(req.body)
      .then((product) => {
        console.log("PRODUCTO CREADO");
        return res.send(product);
      })
      .catch((e) => {
        console.log(e);
        console.log("producto no creado");
        res.send(e);
      });
  },
};

module.exports = adminController;
