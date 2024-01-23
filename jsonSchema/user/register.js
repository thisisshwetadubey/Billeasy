module.exports = {
  type: "object",
  additionalProperties: false,
  properties: {
    username: { type: "string", required: true },
    email: {
      type: "string",
      // pattern: "/^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+. [a-zA-Z]{2,4}$/",
      required: true,
    },
    password: {
      type: "string",

      required: true,
    },
  },
};
