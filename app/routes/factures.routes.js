module.exports = (app) => {
  const factures = require("../controllers/factures.controller.js");

  app.post("/factures", factures.create);

  app.get("/factures", factures.findAll);

//  app.post("/login", factures.findbycredantials);

  app.get("/factures/:factureId", factures.findOne);

  app.put("/factures/:factureId", factures.update);

  app.delete("/factures/:factureId", factures.delete);
};
