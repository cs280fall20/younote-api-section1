const db = require("./data/db.js");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const notesRouter = require("./routes/notes.js");
const express = require("express");
const app = express();
const port = 4567;

db.connect();
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(notesRouter);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
