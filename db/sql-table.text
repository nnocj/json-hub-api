CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    folder TEXT NOT NULL,
    owner TEXT NOT NULL,
    passkey_hash TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS unique_document_identity
ON documents (title, folder, owner);

-- Speed up folder listing
CREATE INDEX IF NOT EXISTS idx_owner_folder
ON documents (owner, folder);
