//?
import { rl, yl } from "../util/logger.js";
import express from "express";
var router = express.Router();

import { s3 } from "../aws-s3.js";

//todo - create-ok
router.post("/upload", async function (req, res) {
  const key = Object.keys(req.files)[0];
  rl.log(req.files[key]);

  if (!req?.session?.user?.id) {
    res.status(500).json("Դուք համակարգ մուտք չեք գործել։");
    return;
  }

  s3.upload(
    {
      Bucket: req?.session?.user?.id,
      Key: req.files[key].name,
      Body: req.files[key].data,
    },
    function (err, data) {
      if (err) {
        rl.log("Error", err);
      } else {
        res.json("Ֆայլը հաջողությամբ վերբեռնվեց։");
      }
    }
  );
});

// todo - check file existance
router.post(
  "/check_name",

  async (req, res) => {
    //
    if (!req?.session?.user?.id) {
      res.status(500).json("Դուք համակարգ մուտք չեք գործել։");
      return;
    }
    yl.log(req.body);
    try {
      let r = await s3
        .listObjects({ Bucket: req?.session?.user?.id })
        .promise();
      let x = r.Contents.map((item) => item.Key);

      if (x.indexOf(req.body.name) !== -1) {
        res.json("yes");
      } else {
        res.json("no");
      }
    } catch (err) {
      res.json("something went wrong");
    }
  }
);

//todo - readList-ok
router.get(
  "/getnames",

  async (req, res) => {
    //
    if (!req?.session?.user?.id) {
      res.status(500).json("Դուք համակարգ մուտք չեք գործել։");
      return;
    }

    try {
      let r = await s3
        .listObjects({ Bucket: req?.session?.user?.id })
        .promise();
      let x = r.Contents.map((item) => item.Key);

      res.json(x);
    } catch (err) {
      res.json("something went wrong");
    }
  }
);

//todo - rename-ok
router.post("/rename", async (req, res) => {
  if (!req?.session?.user?.id) {
    res.status(500).json("Դուք համակարգ մուտք չեք գործել։");
    return;
  }

  try {
    await s3
      .copyObject({
        Bucket: req?.session?.user?.id,
        CopySource: encodeURI(`${req?.session?.user?.id}/${req.body.oldname}`),
        Key: req.body.newname,
      })
      .promise();

    await s3
      .deleteObject({
        Bucket: req?.session?.user?.id,
        Key: req.body.oldname,
      })
      .promise();

    res.json("Ֆայլի անունը հաջողությամբ փոխվեց։");
  } catch (err) {
    res.status(404).json("Նշված ֆայլը գոյություն չունի։");
  }
});

//todo - delete-ok
router.delete("/del", async (req, res) => {
  if (!req?.session?.user?.id) {
    res.status(500).json("Դուք համակարգ մուտք չեք գործել։");
    return;
  }

  const filename = req.body.filename;

  let l_o = await s3.listObjects({ Bucket: req?.session?.user?.id }).promise();
  let item_keys = l_o.Contents.map((item) => item.Key);
  let item_index = item_keys.indexOf(filename);
  if (item_index === -1) {
    res.status(404).json("Նշված ֆայլը գոյություն չունի։");
    return;
  }

  try {
    await s3
      .deleteObject({ Bucket: req?.session?.user?.id, Key: filename })
      .promise();

    res.json(filename + "-ը հաջողությամբ հեռացվեց պահոցից։");
  } catch {
    res.json("something went wrong");
  }
});

//todo
export default router;
