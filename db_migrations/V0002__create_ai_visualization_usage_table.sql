CREATE TABLE IF NOT EXISTS t_p86877169_stretch_ceiling_site.ai_visualization_usage (
    client_id VARCHAR(64) PRIMARY KEY,
    generations_count INTEGER NOT NULL DEFAULT 0,
    ip_address VARCHAR(64),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);