require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const errorHandler = require("./middlewares/errorHandler");
const NotFoundException = require("./exceptions/NotFoundException");

const app = express();
const port = process.env.PORT || 3000;
const origins = process.env.CORS_ORIGIN?.split(",")
  .map((x) => x.trim())
  .filter(Boolean);
app.use(cors(origins?.length ? { origin: origins } : {}));
app.use(express.json());
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.use("/products", require("./routes/productRoutes"));
app.use((req, res) => {
  throw new NotFoundException("요청한 경로가 없습니다.");
});
app.use(errorHandler);

async function start() {
  await dbConnect();
  app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));
}
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
