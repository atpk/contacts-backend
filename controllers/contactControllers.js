const asyncHandler = require("express-async-handler");
const { connectToDB } = require("../config/dbConnection");
const { ObjectId } = require("mongodb");

//@description Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  console.log("Req received for fetch all contacts");

  // db connection
  const db = await connectToDB();
  const collection = db.collection("Contact");

  // fetch contacts from db
  const contacts = await collection.find({}).toArray();

  res.status(200).json(contacts);
});

//@description Create a contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("Req received for create:", req.body);

  // check for empty fields
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("empty fields!");
  }

  // db connection
  const db = await connectToDB();
  const collection = db.collection("Contact");

  // insert into db
  const contact = await collection.insertOne({
    name,
    email,
    phone,
  });
  console.log("contact added successfully!");

  res.status(201).json(contact);
});

//@description Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  console.log("Req received for get: ", req.params.id);

  // db connection
  const db = await connectToDB();
  const collection = db.collection("Contact");

  // fetch contacts from db using _id
  const contact = await collection.findOne({
    _id: new ObjectId(req.params.id),
  });

  // response
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

//@description Update a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  console.log("Req received for update: ", req.params.id, req.body);

  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    throw new Error("no udpate field given");
  }

  // db connection
  const db = await connectToDB();
  const collection = db.collection("Contact");

  // fetch contacts from db using _id
  const id = new ObjectId(req.params.id);
  const contact = await collection.findOne({
    _id: id,
  });

  if (!contact) {
    res.status(404);
    throw new Error("no contact with given id");
  }

  // field values to update
  if (name) {
    contact.name = name;
  }
  if (email) {
    contact.email = email;
  }
  if (phone) {
    contact.phone = phone;
  }

  // update in DB
  const result = await collection.updateOne(
    { _id: id },
    {
      $set: contact,
    }
  );

  console.log({
    acknowledged: result.acknowledged,
    modifiedCount: result.modifiedCount,
  });
  res.status(200).json(contact);
});

//@description Delete a contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  console.log("Req received for delete: ", req.params.id);

  // db connection
  const db = await connectToDB();
  const collection = db.collection("Contact");

  // delete contact from db using _id
  const id = new ObjectId(req.params.id);
  const result = await collection.deleteOne({ _id: id });

  console.log(result);
  res.status(200).json(result);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
