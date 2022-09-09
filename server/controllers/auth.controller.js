const userModel = require("../models/user.model");

module.exports.signIn = async (req, res) => {
  const { name, email, avatar, token } = req.body;

  const data = {
    name,
    email,
    avatar,
    token,
  };

  console.log(data)


  try {
    const checkUser = await userModel.findOne({ email });


    if (checkUser === null) {
      console.log("abc")
      const createUser = await userModel.create(data);

      console.log(createUser);
      return res.json(createUser);
    }
    await userModel.findOneAndUpdate(email, { token });
    return res.json(data);
  } catch (err) {
    console.log(err)
    const msg = "L'utilisateur n'a pas pu être créer";
    return res.status(500).json({ msg, data: err });
  }
};

module.exports.logOut = async (req, res) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  try {
    const findToken = await userModel.findOneAndUpdate(token, { token: "" });

    if (!findToken) {
      const msg = "L'utilisateur est introuvable";

      return res.status(404).json(msg);
    }

    const msg = "L'utilisateur à été déconnecté avec succès";
    res.json({ msg, data: findToken });
  } catch (err) {
    const msg = "L'utilisateur n'a pas pu être déconnecté";
    return res.status(500).json({ msg, data: err });
  }
};
