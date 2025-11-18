-- ======================================
-- Enum type for vehicle servicing status
-- ======================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'servicing_status_type') THEN
        CREATE TYPE servicing_status_type AS ENUM ('VOR', 'Servicing');
    END IF;
END$$;

-- ======================================
-- Table: vehicle_status
-- ======================================
CREATE TABLE IF NOT EXISTS public.vehicle_status (
    id SERIAL PRIMARY KEY,                             -- Unique status record ID
    vehicle_id INT NOT NULL REFERENCES public.vehicles(id), -- Vehicle reference
    status_type servicing_status_type NOT NULL,       -- Status type
    start_date DATE NOT NULL,                          -- Status start date
    end_date DATE,                                     -- Status end date (nullable)
    notes TEXT,                                        -- Optional notes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- Record update timestamp
);

-- ======================================
-- Trigger to update `updated_at` on row modification
-- ======================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.vehicle_status;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.vehicle_status
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
