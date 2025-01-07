import express from "express";

const app = express();
const port = 3000;

// Simple get api call
// app.get("/", (req, res) => {
//   res.send("Hello Utpal!");
// });

app.use(express.json());

let techData = [];
let nextId = 1;

// Add new tech
app.post("/tech", (req, res) => {
  const { name, frees } = req.body;

  const newTech = { id: nextId++, name, frees };
  techData.push(newTech);
  res.status(200).send(newTech);
});

// Get all tech
app.get("/tech", (req, res) => {
  res.status(200).send(techData);
});

// Get the specific tech
app.get("/tech/:id", (req, res) => {
  const id = req.params.id;
  const tech = techData.find((tech) => tech.id == id);
  if (tech) {
    res.status(200).send(tech);
  } else {
    res.status(404).send({ message: "Tech not found" });
  }
});

//Update the tech
app.put("/tech/:id", (req, res) => {
  const id = req.params.id;
  const tech = techData.find((tech) => tech.id == id);
  if (tech) {
    const { name, frees } = req.body;
    tech.name = name;
    tech.frees = frees;
    res.status(200).send(tech);
  } else {
    res.status(404).send({ message: "Tech not found" });
  }
});

//Delete tech
app.delete("/tech/:id", (req, res) => {
  console.log("Delete ====>", req);

  const id = req.params.id;
  const index = techData.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).send({ message: "Tech not found" });
  }

  // Use splice to modify the array in place
  techData.splice(index, 1);

  res.status(204).send("Tech deleted successfully");
});

// Listen the port
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
