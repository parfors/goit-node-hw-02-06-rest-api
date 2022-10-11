const app = require("./app");
const func = require("./models/contacts");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const f = async () => {
  const result = await func.updateContact(1, {
    id: "4",
    name: "Wylie Pope",
    email: "est@utquamvel.net",
    phone: "(692) 802-2949",
  });
  console.log(result);
  return result;
};
f();
