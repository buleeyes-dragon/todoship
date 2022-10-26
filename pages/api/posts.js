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
    await db.collection("posts").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "Post added successfully",
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
    console.log(req.query.URL);
    // connect to the database
    let { db } = await connectToDatabase(req.query.URL);
    // fetch the posts
    let posts = await db
      .collection("posts")
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

    // update the published status of the post
    await db.collection("posts").updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $set: { published: true } }
    );

    // return a message
    return res.json({
      message: "Post updated successfully",
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
    await db.collection("posts").deleteOne({
      _id: new ObjectId(req.body),
    });

    // returning a message
    return res.json({
      message: "Post deleted successfully",
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
