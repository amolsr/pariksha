const Feedback = require("../model/Feedback");
const User = require("../model/User");

exports.addFeedback = async (req, res, next) => {
  try {
    const { feedback, quality } = req.body;
    User.findById(req.user).then(user => {
      const payload = new Feedback({
        UserId: req.user,
        quality,
        name: user.name,
        email: user.email,
        feedback,
      });
      payload.save();
      return res.status(200).json({ success: true });
    }).catch(err => {
      return res.status(401).json({ success: false });
    })
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

exports.getFeedbacks = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const results = {};
  results.total = await User.find({}).countDocuments()
  try {
    await Feedback.find({}).skip((page - 1) * limit).limit(limit).sort({ name: 1 }).then(result => {
      if (result) {
        results.results = result;
        results.page = req.query.page;
        res.status(200).json(results);
      } else {
        res.status(404).json({
          success: false,
          error: "No Feedback Found"
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
