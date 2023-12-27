const express = require("express");
const cors = require("cors");
const db = require("./db");

const itemRouter = require("./controller/item-controller");
const listRouter = require("./controller/list-controller");
const userRouter = require("./controller/user-controller");

const app = express();
const port = process.env.PORT || 8000;

// const swaggerUi = require(`swagger-ui-express`),
//   swaggerDocument = require(`./swagger.json`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/item", itemRouter);
app.use("/list", listRouter);
app.use("/user", userRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: "something went wrong",
        reason: err.message,
    });
});

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/*", (req, res) => {
    res.send("Unknown path!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
