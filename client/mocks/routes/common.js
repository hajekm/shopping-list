// Use this file only as a guide for first steps using middleware variants. You can delete it when you have understood the concepts.
// For a detailed explanation about using middlewares, visit:
// https://mocks-server.org/docs/usage/variants/middlewares

module.exports = [
  {
    id: "add-headers", //route id
    url: "*", // url in express format
    method: ["GET", "POST", "PUT", "DELETE"], // HTTP methods
    variants: [
      {
        id: "enabled", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (_req, res, next, core) => {
            res.set("Authorization", "1111");
            core.logger.info("Custom header added by route variant middleware");
            next();
          },
        },
      },
      {
        id: "disabled", // variant id
        disabled: true,
      },
    ],
  },
];
