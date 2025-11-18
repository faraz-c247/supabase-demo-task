-- ======================================
-- Table: drivers
-- ======================================
CREATE TABLE IF NOT EXISTS public.drivers (
    id SERIAL PRIMARY KEY,              -- Unique driver identifier
    name VARCHAR(150) NOT NULL,         -- Driver’s full name
    is_active BOOLEAN DEFAULT TRUE,     -- Whether the driver is currently employed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Record creation timestamp
);
