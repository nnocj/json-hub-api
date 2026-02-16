// routes.js
import express from "express";
import {
  createDocument,
  updateDocument,
  deleteDocument,
  fetchDocument,
  listDocumentsByOwnerAndFolder
} from "../controllers/documentsControllers.js"; // adjust path if needed

const documentsRouter = express.Router();

/**
 * @route   POST /documents
 * @desc    Create a new JSON document
 * @access  Public (requires owner + secret passkey)
 */
documentsRouter.post("/documents", createDocument);

/**
 * @route   PUT /documents
 * @desc    Update an existing document
 * @access  Public (requires owner + secret passkey)
 */
documentsRouter.put("/documents", updateDocument);

/**
 * @route   DELETE /documents
 * @desc    Delete an existing document
 * @access  Public (requires owner + secret passkey)
 */
documentsRouter.delete("/documents", deleteDocument);

/**
 * @route   POST /documents/fetch
 * @desc    Fetch a single document by title, folder, owner, passkey
 * @access  Public (requires owner + secret passkey)
 */
documentsRouter.post("/documents/fetch", fetchDocument);

/**
 * @route   POST /documents/list
 * @desc    List all documents under a folder for a specific owner
 * @access  Public (requires owner + folder)
 */
documentsRouter.post("/documents/list", listDocumentsByOwnerAndFolder);

export default documentsRouter;
