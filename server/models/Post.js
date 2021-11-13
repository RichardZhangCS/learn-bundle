var mongoose = require("mongoose");
var { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: false },
  description: { type: String, required: true },
  prereqs: { type: String, required: false },
  tags: [{ type: Schema.Types.ObjectId, required: false }],
  submission_date: { type: Date, required: true },
});

PostSchema.virtual("submission_date_formatted").get(() => {
  return DateTime.fromJSDate(this.submission_date).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("Post", PostSchema);
