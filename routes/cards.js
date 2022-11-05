//?
import { rl } from "../util/logger.js";
import express from "express";
const router = express.Router();
import Card from "../models/cardModel.js";

//todo - get
router.get("/getposts", async (req, res) => {
  try {
    let posts = await Card.find();

    res.json(posts.sort((a, b) => b.created - a.created));
  } catch (err) {
    rl.log(err.message);
  }
});

//todo - add
import {
  cardValidator,
  cardValidationResult,
} from "../middleware/card/cardValidator.js";

router.post("/add", cardValidator, cardValidationResult, async (req, res) => {
  //
  try {
    let oneCard = await Card.findOne({ img: req.body.img });

    if (oneCard) {
      res.status(500).json("Նման փոստ բազայում կա։");
      return;
    }

    const newCard = new Card(req.body);

    await newCard.save();

    res.json("Ավելացված փոստը տեսնելու համար թարմացրեք էջը։");
  } catch (err) {
    console.log(err.message);
  }
});

//todo - del
router.delete("/del", async (req, res) => {
  try {
    var card = await Card.findOneAndDelete({
      _id: req.body.id,
    });

    if (card) {
      res.json("Փոստը հաջողությամբ հեռացվեց բազայից։");
    } else {
      res.status(503).json("Նման փոստ բազայում չկա։");
    }
  } catch (err) {
    rl.log(err.message);
  }
});

//todo - update
router.put("/update", async (req, res) => {
  try {
    let card = await Card.findOne({
      _id: req.body.id,
    });

    if (card) {
      card.title = req.body.title;
      card.href = req.body.href;
      card.img = req.body.img;

      await card.save();
      res.json("Փոստի թարմացումը հաջողությամբ կատարվեց");
    } else {
      res.json("Նման փոստ բազայում չկա։");
    }
  } catch (err) {
    rl.log(err.message);
  }
});

export default router;
