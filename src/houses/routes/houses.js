const express = require('express');
const router = express.Router();

const authorization = containerDependency.get('authService').authMiddleware;
const houseModel = containerDependency.get('houseModel');
const imageManager = containerDependency.get('imageService');

router.get('/', (req, res, next) => {
	houseModel.findAll().then(({ info, status }) => {
		res.status(status).json(info);
	}).catch(({ error, status }) => {
		res.status(status).json(error);
	});
});

router.get('/id/:id', (req, res, next) => {
	const id = req.params.id; //5e6596179d4a8d63c09aa6ae for test
	houseModel.findById(id).then(({ info, status }) => {
		res.status(status).json(info);
	}).catch(({ error, status }) => {
		res.status(status).json(error);
	});
});

//No olvidar añadir el token
router.post('/add_houses', (req, res, next) => {
	const dataToSave = req.body;
	houseModel.saveInfo(dataToSave).then(({ info, status }) => {
		res.status(status).json(info);
	}).catch(({ error, status }) => {
		res.status(status).json(error);
	});
});

router.post('/add_house_images', (req, res, next) => {
	const imagesToSave = Object.values(req.files);
	const userId = req.body.userId;
	const houseId = req.body.houseId;
	const folder = `users/${userId}/houses/${houseId}/`
	imageManager.uploadImages(imagesToSave, folder).then(({ info, status }) => {
		// res.status(status).json(info);
	}).catch(({ error, status }) => {
		// res.status(status).json(error);
	});
});

router.post('/edit_house', (req, res, next) => {
	const filter = req.body.filter;
	const dataUpdate = req.body.update;
	houseModel.editInfo(filter, dataUpdate).then(({ info, status }) => {
		res.status(status).json(info);
	}).catch(({ error, status }) => {
		res.status(status).json(error);
	});
});

// router.post('/add_houses', authorization, (req, res, next) => {
//   const reportMissingArgument = () => res.status(400).json({error: "missing argument"})
//   console.log("Post de añadir casas")
//   const 
// });

router.get('/verifyToken', authorization, (req, res, next) => {
	res.send("Token is ok");
});

module.exports = router;
