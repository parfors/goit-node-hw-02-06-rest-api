const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "contacts.json");

const getContacts = async () => {
  try {
    const result = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(result);
  } catch (error) {
    return error.message;
  }
};

const updateContacts = async (body) => {
  await fs.writeFile(contactPath, JSON.stringify(body, null, 2));
};

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(result);
  } catch (error) {
    return error.message;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();
    const result = contacts.find((el) => el.id === String(contactId));
    if (result === undefined) {
      return null;
    }
    return result;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts();
    const index = contacts.findIndex((el) => el.id === String(contactId));
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
  } catch (error) {
    return error.message;
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await getContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, newContact];
    await updateContacts(newContacts);
    return newContact;
  } catch (error) {
    return error.message;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getContacts();
    const index = contacts.findIndex((el) => el.id === String(contactId));
    if (index === -1) {
      return { message: "there is no contact for that index" };
    }
    contacts[index] = { ...contacts[index], ...body };
    updateContacts(contacts);
    return contacts[index];
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

console.log(listContacts());
