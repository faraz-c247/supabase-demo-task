CREATE TABLE IF NOT EXISTS public.customers (
    id SERIAL PRIMARY KEY,                  -- Unique customer identifier
    name VARCHAR(150) NOT NULL,             -- Customer name
    email VARCHAR(150),                      -- Contact email (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Record creation timestamp
);
