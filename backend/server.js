import express from "express";
import colorsRouter from "./routes/color.route.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/colors", colorsRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
