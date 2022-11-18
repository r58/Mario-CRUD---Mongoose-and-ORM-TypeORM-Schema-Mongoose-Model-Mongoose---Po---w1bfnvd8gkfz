const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here

app.get("/mario", (req, res) => {
  marioModel.find().then((m) => res.send(m));
});

app.get("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel
    .findById(id)
    .then((mario) => res.send(mario))
    .catch((error) => res.status(400).send({ message: error.message }));
  return;
});

app.post("/mario", (req, res) => {
  const mr = new marioModel({
    name: req.body.name,
    weight: req.body.weight
  });
  mr.save()
    .then((mario) => {
      /*if (!mario.name) {
      res.status(400).send("Name is missing");
      return;
    } else if (!mario.weight) {
      res.status(400).send("Weight is missing");
    }*/
      res.status(201).json(mario);
    })
    .catch((err) => {
      res.status(400).json({ message: "either name or weight is missing" });
    });
});

/*app.put('/mario/:id',(req,res)=>{
  const id = req.params.id;
  marioModel.findByIdAndUpdate(id,req.body,{new:true,upsert:true}).then((result)=>res.send(result)).
  catch(err=>res.status(400).send({message:err.message}));
});*/

app.patch("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send({ message: err.message }));
});

app.delete("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "character deleted" }))
    .catch((err) => res.status(400).json({ message: err.message }));
  /*
  marioModel.findByIdAndDelete(id,function(result){
      if(!result){
          res.status(404).send("Movie not found");
          return;
      }
      res.send(result);
  });
  */
});

module.exports = app;
