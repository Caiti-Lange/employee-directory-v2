import express from "express";
import employeeRouter from "#api/employees";

const app = express();

app.use(express.json());

app.route("/").get((req, res) => {
  res.send("API working")
});

app.use("/employees", employeeRouter);

app.use((err, req, next) => {
  console.error(err);

  res.status(500).json({ error: err.statusMessage, message: "Error occured!"});
});

export default app;
