const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Note = require("./models/note");
const loger = require("./loger");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const password = process.argv[2];

const url = process.env.MONGODB_CONNECTION_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// get
app.get("/", async (request, response) => {
  loger(request);
  response.send("Full Stack Assignment");
});

app.get("/notes", async (request, response) => {
  try {
    loger(request);
    const notes = await Note.find({});
    if (notes) {
      response.json(notes);
    } else {
      response.status(404).send("Notes not found");
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Server error" });
  }
});

app.get("/notes/page", async (request, response) => {
  try {
    loger(request);
    const activePage = parseInt(request.query._page) || 1;
    const notesPerPage = parseInt(request.query._per_page) || 10;

    const notes = await Note.find()
      .skip((activePage - 1) * notesPerPage)

      .limit(notesPerPage);
    if (notes) {
      response.json(notes);
      console.log(notes);
    } else {
      response.status(404).send("Notes not found");
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Server error" });
  }
});

app.get("/notes/total_notes", async (request, response) => {
  try {
    loger(request);
    const totalNotes = await Note.countDocuments({});
    response.json(totalNotes);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Server error" });
  }
});

app.get("/notes/:id", async (request, response) => {
  try {
    loger(request);
    const note = await Note.findOne({ id: request.params.id });

    if (note) {
      response.json(note);
    } else {
      response.status(404).send("Note not found");
    }
  } catch (error) {
    console.error(error);
    response.status(400).send("Bad request");
  }
});

// post
app.post("/notes", async (request, response) => {
  try {
    loger(request);
    const tempNote = await Note.findOne({}, "id").sort({ id: -1 }).exec();
    const lastId = tempNote ? tempNote.id : 0;
    const note = new Note({
      id: lastId + 1,
      title: request.body.title,
      author: {
        name: request.body.authorName,
        email: request.body.authorEmail,
      },
      content: request.body.content,
    });

    const savedNote = await note.save();
    if (savedNote) {
      response.json(savedNote);
    } else {
      response.status(404).json({ error: "Note not posted" });
    }
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: "Failed to post note" });
  }
});

// put
app.put("/notes/:id", async (request, response) => {
  try {
    loger(request);
    const updatedNote = await Note.findOneAndUpdate(
      { id: request.params.id },
      { content: request.body.content },
      { new: true }
    );
    if (updatedNote) {
      response.json(updatedNote);
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "Failed to update note" });
  }
});

// delete
app.delete("/notes/:id", async (request, response) => {
  try {
    loger(request);
    const deletedNote = await Note.deleteOne({ id: request.params.id });

    if (deletedNote) {
      response.status(204).json({ message: "Note deleted Successfully" });
    } else {
      response.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "Failed to delete note" });
  }
});
