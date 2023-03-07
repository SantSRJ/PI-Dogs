const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
require("dotenv").config();
const { getAllDogs } = require("../controllers/getAllDogs");

const router = Router();

/*
router.get("/dogs", (req, res, next) => {
  const name = req.query.name;
  getAllDogs()
    .then(allDogs => {
      if (name) {
        let dogName = allDogs.filter((el) =>
          el.name.toLowerCase().includes(name.toLowerCase())
        );
        dogName.length
          ? res.status(200).send(dogName)
          : res.send([
              {
                name: 'Ha ocurrido un error, no tenemos esa raza de perro.',
                id: '',
                temperaments: '',
                image:
                  '../Assets/mirada-perros-tristeza-860-web-768x307.jpg',
              },
            ]);
      } else {
        res.status(200).send(allDogs);
      }
    })
    .catch(err => next(err));
});
*/

router.get("/dogs", async (req, res, next) => {
  try {
    const name = req.query.name;
    let allDogs = await getAllDogs();
    if (name) {
      let dogName = await allDogs.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.send([
            {
              name: 'Ha ocurrido un error, no tenemos esa raza de perro.',
              id: '',
              temperaments: '',
              image: '../Assets/mirada-perros-tristeza-860-web-768x307.jpg',
            },
          ]);
    } else {
      res.status(200).send(allDogs);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/dogs/:raceId", async (req, res, next) => {
  const { raceId } = req.params;
  const allRaces = await getAllDogs();
  if (raceId) {
    for (let i = 0; i < allRaces.length; i++) {
      console.log(allRaces[i].id);
      if (allRaces[i].id == raceId) {
        console.log(allRaces[i]);
        return res.status(200).send(allRaces[i]);
      }
    }

    res.status(404).send(`Lo siento, no tenemos una carrera con  ese ID 🤷‍♀️`);
  }
});

router.get("/temperaments", async (_req, res) => {
  let infoApi = await axios(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  let tempsRepeated = infoApi.data.map((el) => el.temperament).toString();
  tempsRepeated = await tempsRepeated.split(",");
  const tempsConEspacio = await tempsRepeated.map((el) => {
    if (el[0] == " ") {
      return el.split("");
    }
    return el;
  });
  const tempsSinEspacio = await tempsConEspacio.map((el) => {
    if (Array.isArray(el)) {
      el.shift();
      return el.join("");
    }
    return el;
  });

  await tempsSinEspacio.forEach((el) => {
    if (el != "") {
      Temperament.findOrCreate({
        where: {
          name: el,
        },
      });
    }
  });
  const allTemps = await Temperament.findAll();
  res.status(200).send(allTemps);
});

router.post("/dogs", async (req, res) => {
  let {
    name = req.body.name,
    min_height = req.body.min_height,
    max_height = req.body.max_height,
    min_weight = req.body.min_weight,
    max_weight = req.body.max_weight,
    life_span = req.body.life_span,
    temperaments = req.body.temperaments,
    image = req.body.image,
  } = req.body;
  let raceCreated = await Dog.create({
    name,
    min_height,
    max_height,
    min_weight,
    max_weight,
    life_span: life_span,
    image,
  });
  let temperamentDB = await Temperament.findAll({
    where: {
      name: temperaments,
    },
  });
  raceCreated.addTemperament(temperamentDB);
  res.status(200).send('Perro creado con éxito');
});

// aca borramos solo el dog creado que esta en la base de datos
router.delete("/dogs/:raceId", async (req, res) => {
  const { raceId } = req.params;
  const allRaces = await getAllDogs();
  if (raceId) {
    for (let i = 0; i < allRaces.length; i++) {
      if (allRaces[i].id === raceId) {
        await allRaces[i].destroy(); // eliminamos el dog de la base de datos
        return res.status(200).send('Perro eliminado con éxito');
      }
    }
    res.status(404).send('No existe un perro con ese ID');
  }
});

module.exports = router;
