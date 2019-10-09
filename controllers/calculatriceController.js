const mongoose = require('mongoose');
 
let Schema = mongoose.Schema;

// Definition de mon schéma
let calcSchema = new Schema({
  nombre1: Number,
  nombre2: Number,
  operateur: String,
  resultat: Number,
});

// Associe mon schéma à la variable => Operation
let Operation = mongoose.model("params", calcSchema);

// L'adresse de mon serveur
let dbUrl = "mongodb://localhost:27017/calcul";
const db = mongoose.connection;

const controller = {};

controller.formulaire = (req, res) => {
  res.render('calculatrice', {page:'Calculatrice', menuId:'ajouter'});
};

controller.list = (req, res) => {
  // Connection à ma BDD
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  // Vérification si erreurs
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    // Requête .find sur mon schema
    Operation.find((err, result) => {
      if (err) throw err;
      // Renvoie les documents (que je défini "result") qui correspondent à mon schéma sur la vue "index"
      res.render("index", {
        page:result, menuId:'home'
      });
    });
  });
};

controller.save = (req, res) => {
  try {
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      // Déclaration de mon objet qui prend pour attributs les éléments de mon body
      let operationAjout = new Operation({
        nombre1: req.body.nombre1,
        nombre2: req.body.nombre2,
        operateur: req.body.sel1,
        resultat: 0,
      });
      // Sauvegarde de mon objet et redirection sur la route '/'
      operationAjout.save(err => {
        if (err) throw err;
        console.log("1 document inserted");
        res.redirect("/");
      });
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

controller.calculer = (req, res) => { 
  try {
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      Operation.findById(req.params.id, (err, operation) => {
        let nb1 = Number(operation.nombre1);
        let nb2 = Number(operation.nombre2);
        switch (operation.operateur) {
          case "+":
            resultat = nb1 + nb2;
            break;
          case "-":
            resultat = nb1 - nb2;
            break;
          case "*":
            resultat = nb1 * nb2;
            break;
          case "/":
            resultat = nb1 / nb2;
            break;
        }
        Operation.findByIdAndUpdate(req.params.id,{ 
          resultat: resultat 
        }, () => {});

        res.redirect("/");
      });
    });
  } catch (err) {
    if (err) {
      console.log(err);
      console.log("err");
    }
  }
};

controller.edit = (req, res) => {
  try {
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      // Requete pour trouver l'operation qui correspond à l'id récuperer dans l'url
      Operation.findById(req.params.id, (err, result) => {
        // Revoie les attributs de l'operation sur la vue "edit"
        res.render("calculatrice_edit", {
          page: result, menuId:'modifier'
        });
        db.close();
      });
    });
  } catch (err) {
    if (err) {
      console.log(err);
      console.log("err");
    }
  }
};

controller.update = (req, res) => {
  try {
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      Operation.findByIdAndUpdate(req.params.id, {
        nombre1: req.body.nombre1,
        nombre2: req.body.nombre2,
        operateur: req.body.sel1,
        resultat: null
      }, (err) => {
        if (err) throw err;
        res.redirect("/");
        db.close();
      });
    });
  } catch (err) {
    if (err) {
      console.log(err);
      console.log("err");
    }
  }
};

controller.delete = (req, res) => {
  try {
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      Operation.findByIdAndRemove(req.params.id, (err) => {
        if (err) throw err;
        res.redirect("/");
        db.close();
      });
    });
  } catch (err) {
    if (err) {
      console.log(err);
      console.log("err");
    }
  }
};

module.exports = controller;
