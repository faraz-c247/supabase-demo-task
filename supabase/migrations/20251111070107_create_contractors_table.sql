-- ======================================
-- Table: contractors
-- ======================================
CREATE TABLE IF NOT EXISTS public.contractors (
    id SERIAL PRIMARY KEY,              -- Unique contractor identifier
    name VARCHAR(150) NOT NULL,         -- Contractor or company name
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Record creation timestamp
);
