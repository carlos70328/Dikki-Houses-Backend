const express = require('express');
const router = express.Router();
const authorization = containerDependency.get('Auth0').authMiddleware;

router.get('/', (req, res, next) => {
  const houseModel = containerDependency.get('houseModel');
  houseModel.findAll().then(houseInfo => {
    res.status(200).json(houseInfo);
  });
});

router.get('/id/:id', (req, res, next) => {
  const id = req.params.id; //5e6596179d4a8d63c09aa6ae for test
  const houseModel = containerDependency.get('houseModel');
  houseModel.findById(id).then(houseInfo => {
    res.status(200).json(houseInfo);
  });
});

router.post('/add_houses', authorization, (req, res, next) => {
  const reportMissingArgument = () => res.status(400).json({error: "missing argument"})
  const 
});

router.get('/verifyToken', (req, res, next) => {
  res.send("Token is ok")
});

module.exports = router;
