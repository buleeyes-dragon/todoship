const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // console.log("handler");
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }

    case "POST": {
      return addPost(req, res);
    }

    case "PUT": {
      return updatePost(req, res);
    }

    case "DELETE": {
      return deletePost(req, res);
    }
  }
}

async function addPost(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase(req.query.URL);
    // add the post
    await db.collection("workflow").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "Add it! Refresh the page!",
      success: true,
    });
    console.log("addPost!");
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function getPosts(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase(req.query.URL);
    // fetch the posts
    let posts = await db
      .collection("workflow")
      .find({})
      .sort({ published: -1 })
      .toArray();
    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function updatePost(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase(req.query.URL);
    console.log("updatePost");
    console.log(typeof req.body);
    let body = JSON.parse(req.body);
    console.log(body);
    // update the published status of the post
    let g = await db.collection("workflow").updateOne(
      {
        _id: new ObjectId(body.id),
      },
      { $set: { iList: body.iList } }
    );
    console.log(g);
    console.log("updatePost Good!");
    console.log(res.message);
    let posts = await db
      .collection("workflow")
      .find({
        _id: new ObjectId(body.id),
      })
      .toArray();
    console.log(posts);
    // return a message
    return res.json({
      message: "Add it! Refresh the page!",
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function deletePost(req, res) {
  try {
    // Connecting to the database
    let { db } = await connectToDatabase(req.query.URL);

    // Deleting the post
    await db.collection("workflow").deleteOne({
      _id: new ObjectId(req.body),
    });

    // returning a message
    return res.json({
      message: "Delete it! Refresh the page!",
      success: true,
    });
  } catch (error) {
    // returning an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
