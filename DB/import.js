var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var importschema = new Schema(
  {
    importCode: {
      type: STRING,
    },
    publisherName: {
      type: STRING,
    }
  },
  { collection: "import", timestamps: true }
);

module.exports = mongoose.model("Import", importschema);
