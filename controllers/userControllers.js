const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { connectToDB } = require("../config/dbConnection");

//@description Register the user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  console.log("Req received for register: ", req.body);

  //   check for empty values in the request
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("empty fields!");
  }

  // db connection
  const db = await connectToDB();
  const collection = db.collection("User");

  // check if user already exists
  const availableUser = await collection.findOne({
    $or: [{ username }, { email }],
  });
  if (availableUser) {
    console.log("found user with _id: ", availableUser._id);
    res.status(400);
    throw new Error("User already exists with given email!");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert in DB
  const user = await collection.insertOne({
    username,
    email,
    password: hashedPassword,
  });
  console.log("user registered successfully!");

  // send response
  if (user) {
    res.status(201).json({ _id: user.insertedId, username, email });
  } else {
    throw new Error("Error creating user, Please try again later!");
  }
});

//@description User login
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  console.log("Req received for login:", req.body);

  // db connection
  const db = await connectToDB();
  const collection = db.collection("User");

  //   check for empty values in the request
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("empty fields!");
  }

  // User verification and respond with access token
  const user = await collection.findOne({ email });
  if (user && bcrypt.compare(password, user.password)) {
    console.log("user login verified");
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Wrong email or password");
  }
});

//@description Current user info
//@route POST /api/users/info
//@access private
const userInfo = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, userInfo };
