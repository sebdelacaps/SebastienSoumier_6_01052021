const Sauce = require("../models/sauce_models");
const fs = require("fs");

// selection sauce unique
exports.getSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// creation of a new sauce
exports.newSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  delete sauceObject._id;
  sauceObject.likes = 0;
  sauceObject.dislikes = 0;
  sauceObject.usersLiked = [];
  sauceObject.usersDisliked = [];

  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré!" }))
    .catch((error) => res.status(400).json({ error }));
};

// modification of a sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié!" }))
    .catch((error) => res.status(400).json({ error }));
};

// removal of a sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé!" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// like/dislike sauce
exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    // case 1 : // if user likes sauce

    // Sauce.findByIdAndUpdate({_id: req.params.id}, {
    //   $push: {usersLiked: req.body.userId}
    // }, {
    //   new:true
    // })
    // .then(() => res.status(200).json({message: 'Objet liké!'}))
    // .catch(error => res.status(400).json({error}));

    case 1: // if user likes sauce
      Sauce.find({
        _id: req.params.id,
        $or: [
          { usersLiked: { $in: req.body.userId } },
          { usersDisliked: { $in: req.body.userId } },
        ],
      })

        .then((result) => {
          if (!result.length) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
            )
              .then(() => res.status(200).json({ message: "Objet liké!" }))
              .catch((error) => res.status(400).json({ error }));
          } else {
            return res
              .status(205)
              .json({ message: "Objet déjà liké ou disliké!" });
          }
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    case -1:
      Sauce.find({
        _id: req.params.id,
        $or: [
          { usersLiked: { $in: req.body.userId } },
          { usersDisliked: { $in: req.body.userId } },
        ],
      })

        .then((result) => {
          if (!result.length) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
              }
            )
              .then(() => res.status(200).json({ message: "Objet disliké!" }))
              .catch((error) => res.status(400).json({ error }));
          } else {
            return res
              .status(205)
              .json({ message: "Objet déjà liké ou disliké!" });
          }
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    case 0: //if user changes his/her mind
      Sauce.findOne({ usersLiked: { $in: req.body.userId } })
        .then((result) => {
          if (result) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
            )
              .then(() => res.status(200).json({ message: "Like retiré!" }))
              .catch((error) => res.status(400).json({ error }));
          } else {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike retiré!" }))
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
  }
};

// display all sauce
exports.displaySauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
