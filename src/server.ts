import express from "express";

const app = express();

app.get("/users", (request, response) =>
  response.send({ message: "Hello World - NLW04" })
);

app.listen(3333, () => console.log("Server is running!"));
