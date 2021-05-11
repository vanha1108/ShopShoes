var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var importschema = new Schema(
  {
    code: {
      type: String,
    },
    importDetailCode: {
      type: String,
    },
    publisherName: {
      type: String,
    }
  },
  { collection: "import", timestamps: true }
);

module.exports = mongoose.model("Import", importschema);
