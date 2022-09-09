const userModel = require("../models/user.model");
const eventModel = require("../models/event.model");

module.exports.readEvent = async (req, res) => {
  const id = req.params.id;

  try {
    let eventDetail = await eventModel.findById(id);

    if (!eventDetail) {
      const msg = "Event introuvable";
      res.status(404).json(msg);
    }

    const msg = "L'event a été récupéré avec succès";
    res.json({ msg, data: eventDetail });
  } catch (error) {
    const msg = "Erreur serveur";
    res.status(500).json({ msg, data: error });
  }
};

module.exports.createEvent = async (req, res) => {
  let token = req.headers.authorization;

  token = token.split(" ")[1];

  const {event, coordonne, photo} = req.body


  try {

    const user = await userModel.findOne({ token });

    if (!user) {
      const msg = "L'utilisateur n'a pas été trouvé";
      res.status(404).json(msg);
    }


    const data = {
      event,
      photo,
      coordonne: [coordonne.lon, coordonne.lat],
      organisateur: user._id,
    };

    const result = await eventModel.create(data);

    res.json(result);
  } catch (err) {
    const msg = "Erreur serveur";
    res.status(500).json({ msg, data: err });
  }
};

module.exports.readAllUserEvent = async (req, res) => {
  let token = req.headers.authorization;

  token = token.split(" ")[1];

  try {

    // console.log(token)
    const user = await userModel.findOne({ token });


    if (!user) {
      const msg = "L'utilisateur n'a pas été trouvé";
      res.status(404).json(msg);
    }

    const userEvent = await eventModel.find({organisateur: user._id})

    if(!userEvent){
      const msg = "L'event n'a pas été trouvé";
      res.status(404).json(msg);
    }


    res.json(userEvent);
    
  } catch (error) {
    const msg = "Erreur serveur";
    res.status(500).json({ msg, data: error });
  }
}

