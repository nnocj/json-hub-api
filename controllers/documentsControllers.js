import pool from "../db/index.js";
import bcrypt from "bcrypt";

import pool from "../db/index.js";
import bcrypt from "bcrypt";

/* =====================================================
   INTERNAL AUTH FUNCTION
===================================================== */

const authenticateDocument = async (title, folder, owner, secret_passkey) => {
  const result = await pool.query(
    `SELECT * FROM documents
     WHERE title = $1 AND folder = $2 AND owner = $3`,
    [title, folder, owner]
  );

  if (result.rows.length === 0) return null;

  const document = result.rows[0];

  const match = await bcrypt.compare(secret_passkey, document.passkey_hash);
  if (!match) return null;

  return document;
};


/* =====================================================
   CREATE DOCUMENT
===================================================== */

export const createDocument = async (req, res) => {
  try {
    const { title, folder, owner, secret_passkey, data } = req.body;

    if (!title || !folder || !owner || !secret_passkey || !data) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const hash = await bcrypt.hash(secret_passkey, 10);

    const result = await pool.query(
      `INSERT INTO documents (title, folder, owner, passkey_hash, data)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, folder, owner, data, created_at`,
      [title, folder, owner, hash, data]
    );

    res.status(201).json({
      success: true,
      document: result.rows[0]
    });

  } catch (err) {

    // Handle duplicate identity cleanly
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Document with same title, folder, and owner already exists"
      });
    }

    console.error("Create error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* =====================================================
   FETCH SINGLE DOCUMENT (SECURE)
===================================================== */

export const fetchDocument = async (req, res) => {
  try {
    const { title, folder, owner, secret_passkey } = req.body;

    if (!title || !folder || !owner || !secret_passkey) {
      return res.status(400).json({
        success: false,
        message: "All authentication fields are required"
      });
    }

    const existingDoc = await authenticateDocument(
      title,
      folder,
      owner,
      secret_passkey
    );

    if (!existingDoc) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed"
      });
    }

    const { passkey_hash, ...safeDocument } = existingDoc;

    res.status(200).json({
      success: true,
      document: safeDocument
    });

  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* =====================================================
   UPDATE DOCUMENT (FULL FLEXIBLE UPDATE)
===================================================== */

export const updateDocument = async (req, res) => {
  try {
    const { current, update } = req.body;

    if (!current || !update) {
      return res.status(400).json({
        success: false,
        message: "current and update objects are required"
      });
    }

    const existingDoc = await authenticateDocument(
      current.title,
      current.folder,
      current.owner,
      current.secret_passkey
    );

    if (!existingDoc) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed"
      });
    }

    const newTitle = update.title ?? existingDoc.title;
    const newFolder = update.folder ?? existingDoc.folder;
    const newOwner = update.owner ?? existingDoc.owner;
    const newData = update.data ?? existingDoc.data;

    let newHash = existingDoc.passkey_hash;

    if (update.new_secret_passkey) {
      newHash = await bcrypt.hash(update.new_secret_passkey, 10);
    }

    await pool.query(
      `UPDATE documents
       SET title = $1,
           folder = $2,
           owner = $3,
           passkey_hash = $4,
           data = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6`,
      [newTitle, newFolder, newOwner, newHash, newData, existingDoc.id]
    );

    res.status(200).json({
      success: true,
      message: "Document updated successfully"
    });

  } catch (err) {

    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Another document with same title, folder, and owner already exists"
      });
    }

    console.error("Update error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


/* =====================================================
   DELETE DOCUMENT
===================================================== */

export const deleteDocument = async (req, res) => {
  try {
    const { title, folder, owner, secret_passkey } = req.body;

    if (!title || !folder || !owner || !secret_passkey) {
      return res.status(400).json({
        success: false,
        message: "All authentication fields are required"
      });
    }

    const existingDoc = await authenticateDocument(
      title,
      folder,
      owner,
      secret_passkey
    );

    if (!existingDoc) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed"
      });
    }

    await pool.query(
      `DELETE FROM documents WHERE id = $1`,
      [existingDoc.id]
    );

    res.status(200).json({
      success: true,
      message: "Document deleted successfully"
    });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


/* =====================================================
   LIST DOCUMENTS BY OWNER + FOLDER (SECURE)
===================================================== */

export const listDocumentsByOwnerAndFolder = async (req, res) => {
  try {
    const { owner, folder, title, secret_passkey } = req.body;

    if (!owner || !folder || !title || !secret_passkey) {
      return res.status(400).json({
        success: false,
        message: "owner, folder, title and secret_passkey are required"
      });
    }

    // Authenticate using a real document
    const existingDoc = await authenticateDocument(
      title,
      folder,
      owner,
      secret_passkey
    );

    if (!existingDoc) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed"
      });
    }

    const result = await pool.query(
      `SELECT id, title, folder, owner, data, created_at, updated_at
       FROM documents
       WHERE owner = $1 AND folder = $2
       ORDER BY created_at DESC`,
      [owner, folder]
    );

    res.status(200).json({
      success: true,
      total: result.rows.length,
      documents: result.rows
    });

  } catch (error) {
    console.error("List error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
