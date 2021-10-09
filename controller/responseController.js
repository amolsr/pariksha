const Response = require("../model/Response");
const ObjectId = require("mongoose").Types.ObjectId;

exports.unfair = async (req, res, next) => {
  try {
    const response = await Response.findOne({ userId: ObjectId(req.user), testId: ObjectId(req.test) });
    var x = response.switchCounter;
    response.switchCounter = x + 1;
    await response.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};


// store responses
exports.saveResponses = async (req, res, next) => {
  try {
    const response = await Response.findOne({ userId: ObjectId(req.user), testId: ObjectId(req.test) });

    selected = req.body.responses;

    selected.forEach((element) => {
      if (element.response === 1) {
        element.response = "one";
      } else if (element.response === 2) {
        element.response = "two";
      } else if (element.response === 3) {
        element.response = "three";
      } else if (element.response === 4) {
        element.response = "four";
      } else {
        element.response = "negative";
      }
    });

    let subs = [...selected];
    let resp = [];
    if (typeof response.responses !== "undefined" && response.responses.length > 0) {
      resp = [...response.responses];
    }

    respOb = {};
    resp.forEach((ele) => {
      respOb[ele["question"]] = ele["response"];
    });

    subsOb = {};
    subs.forEach((ele) => {
      subsOb[ele["question"]] = ele["response"];
    });

    respObj = {
      ...respOb,
      ...subsOb,
    };

    let finalResp = [];
    Object.keys(respObj).forEach((ele) => {
      ob = {};
      ob["question"] = ele;
      ob["response"] = respObj[ele];
      ob["status"] = "saved";
      finalResp.push(ob);
    });

    await Response.updateOne({ userId: ObjectId(req.user), testId: ObjectId(req.test) }, {
      $set: {
        responses: finalResp
      }
    })
    return res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server Error" });
  }
};

// endTest
exports.endTest = async (req, res) => {
  try {
    const response = await Response.findOne({ userId: ObjectId(req.user), testId: ObjectId(req.test) });

    const selected = req.body.responses;

    selected.forEach((element) => {
      if (element.response === 1) {
        element.response = "one";
      } else if (element.response === 2) {
        element.response = "two";
      } else if (element.response === 3) {
        element.response = "three";
      } else if (element.response === 4) {
        element.response = "four";
      } else {
        element.response = "negative";
      }
    });

    let subs = [...selected];
    let resp = [];
    if (typeof response.responses !== "undefined" && response.responses.length > 0) {
      resp = [...response.responses];
    }

    const previousAttempted = [];
    resp.forEach((ele) => {
      previousAttempted.push(ele["question"]);
    });

    const respToSave = subs.filter((ele) => {
      return !previousAttempted.includes(ele.question);
    });

    respToSave.forEach((ele) => {
      ele.status = "marked";
    });

    const finalResp = [...resp, ...respToSave];

    await Response.updateOne({ userId: ObjectId(req.user), testId: ObjectId(req.test) }, {
      $set: {
        responses: finalResp
      }
    })
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getAllResponses = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const results = {};
  results.total = await Response.find({}).countDocuments()
  try {
    await Response.aggregate([
      {
        $addFields: {
          max: { $size: "$questions" },
        },
      },
      {
        $unwind: {
          path: "$responses",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "questions",
          let: { questionid: { $toObjectId: "$responses.question" } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$questionid", "$_id"],
                },
              },
            },
          ],
          as: "correct",
        },
      },
      {
        $unwind: {
          path: "$correct",
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $addFields: {
          score: {
            $cond: [{
              $and: [
                { $ifNull: ["$correct", false] },
                { $eq: ["$correct.correct", "$responses.response"] }
              ],
            }, 1, 0],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          testId: { $first: "$testId" },
          hasAttempted: { $first: "$hasAttempted" },
          switchCounter: { $first: "$switchCounter" },
          score: { $sum: "$score" },
          max: { $first: "$max" }
        },
      },
    ]).then(result => {
      if (result) {
        results.results = result;
        results.page = req.query.page;
        res.status(200).json(results);
      } else {
        res.status(404).json({
          success: false,
          error: "No Responses Found"
        })
      }
    })
  }
  catch {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

exports.deleteResponseById = (req, res, next) => {
  Response.findByIdAndDelete(req.params.id).then(result => {
    res.json({ "status": "true" });
  }).catch(err => {
    res.json({ "status": "false" });
  })
}
