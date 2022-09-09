const userModel = require("../models/user.model");

module.exports.getUserInfo = async (req, res) => {
  let token = req.headers.authorization;

  token = token.split(" ")[1];

  try {
    const findUser = await userModel.findOne({ token });

    if (!findUser) {
      const msg = "L'utilisateur n'a pas été trouvé";
      return res.status(404).json({ msg });
    }

    res.json(findUser);
  } catch (err) {
    const msg = "Erreur server";
    res.status(500).json({ msg, data: err });
  }
};

module.exports.updateUser = async (req, res) => {
  const description = req.body.description;

  let token = req.headers.authorization;
  token = token.split(" ")[1];

  try {
    console.log(description)
    const user = await userModel.findOne({ token });
    if (!user) {
      const msg = "L'utilisateur n'a pas été trouvé";
      return res.status(404).json({ msg });
    }

    const result = await userModel.findByIdAndUpdate(user._id, {description: description})

    const msg = "L'utilisateur a été modifié avec succès.";

    res.json({ msg, data: result });
  } catch (error) {
    const msg = "Erreur server";
    res.status(500).json({ msg, data: err });
  }
};
