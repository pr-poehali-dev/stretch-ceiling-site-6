CREATE TABLE IF NOT EXISTS visitor_counter (
  id SERIAL PRIMARY KEY,
  count BIGINT NOT NULL DEFAULT 0
);

INSERT INTO visitor_counter (count) SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM visitor_counter);
