ALTER TABLE user_sessions
RENAME COLUMN token_hash TO refresh_token_hash;

ALTER TABLE user_sessions
ADD COLUMN revoked_at TIMESTAMPTZ;