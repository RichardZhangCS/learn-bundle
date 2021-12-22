var mongoose = require("mongoose");
var { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  submission_date: { type: Date, required: true },
});

CommentSchema.virtual("submission_date_formatted").get(() => {
  return DateTime.fromJSDate(this.submission_date).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("Comment", CommentSchema);
