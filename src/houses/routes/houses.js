const { query } = require("express");
const express = require("express");
const router = express.Router();
const uid = require("uid");
const cors = require("cors");
const multer = require("multer");
const DatauriParser = require("datauri/parser");
const path = require("path");

router.use(cors());

const authorization = containerDependency.get("authService").authMiddleware;
const houseModel = containerDependency.get("houseModel");
const imageManager = containerDependency.get("imageService");
const paramBuilder = containerDependency.get("houseParamBuilder");

const upload = multer({}).array("images");

const formatBufferTo64 = (file) =>
   new DatauriParser().format(file.originalname.toString(), file.buffer);

const arrayBufferToBase64 = (files) => {
   const images = files.map((file) => formatBufferTo64(file));
   return images;
};

router.get("/", ({ query }, res, next) => {
   const findParams = paramBuilder.setParams(query);
   const paginationParams = paramBuilder.setPagination(query);

   houseModel
      .find(findParams, paginationParams, HousesResponse.showAllHouses)
      .then(({ info, status }) => {
         res.status(status).json(info);
      })
      .catch(({ error, status }) => {
         res.status(status).json(error);
      });
});

router.get("/search", ({ query }, res, next) => {
   const findParams = paramBuilder.setParams(query);
   const paginationParams = paramBuilder.setPagination(query);

   houseModel
      .find(findParams, paginationParams, HousesResponse.showAllHouses)
      .then(({ info, status }) => {
         res.status(status).json(info);
      })
      .catch(({ error, status }) => {
         res.status(status).json(error);
      });
});

router.get("/geolocation", (req, res, next) => {
   const coordinates = { lat: req.query.lng, lat: req.query.lng };
   const maxDistance = req.query.maxDistance;
   const filter = req.query.filter;

   houseModel
      .findByLocation(coordinates, maxDistance, filter, HousesResponse.showAllHouses)
      .then(({ info, status }) => {
         res.status(status).json(info);
      })
      .catch(({ error, status }) => {
         res.status(status).json(error);
      });
});

router.get("/details/:id", (req, res, next) => {
   const id = req.params.id; //sh3yfelxzkyvuh9cb3q8 for test

   houseModel
      .findById(id, HousesResponse.showSpecificHouse)
      .then(({ info, status }) => {
         res.status(status).json(info);
      })
      .catch(({ error, status }) => {
         res.status(status).json(error);
      });
});

//No olvidar añadir el token
router.post("/add_houses", (req, res, next) => {
   const dataToSave = req.body;
   dataToSave.public_id = uid(20);

   try {
      houseModel
         .saveInfo(dataToSave)
         .then(({ info, status }) => {
            res.status(status).json({ public_id: info.public_id });
         })
         .catch(({ error, status }) => {
            res.status(status).json(error);
         });
   } catch (error) {
      res.status(400).json(error.message);
   }
});

router.post("/add_house_images", upload, async (req, res, next) => {
   try {
      const file64 = arrayBufferToBase64(req.files);
      const imagesToSave = file64;
      const userId = req.body.userId;
      const houseId = req.body.houseId;
      const folder = `users/${userId}/houses/${houseId}/`;
      const images = await imageManager.uploadImages(imagesToSave, folder);
      const transformImage = await houseModel.editInfo(
         { public_id: houseId },
         { resources: { photos: images.info } }
      );
      console.log(transformImage);
      res.status(200).json(transformImage);
   } catch (error) {
      console.log(error);
   }
});

router.post("/add_house_images_test", upload, (req, res, next) => {
   console.log("negrito");
   res.status(200).json(req.files);
});

router.post("/edit_house", (req, res, next) => {
   const filter = req.body.filter;
   const dataUpdate = req.body.update;

   houseModel
      .editInfo(filter, dataUpdate)
      .then(({ info, status }) => {
         res.status(status).json(info);
      })
      .catch(({ error, status }) => {
         res.status(status).json(error);
      });
});

// router.post('/add_houses', authorization, (req, res, next) => {
//   const reportMissingArgument = () => res.status(400).json({error: "missing argument"})
//   console.log("Post de añadir casas")
//   const
// });

router.get("/verifyToken", authorization, (req, res, next) => {
   res.send("Token is ok");
});

module.exports = router;
