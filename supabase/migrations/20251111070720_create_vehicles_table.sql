-- ======================================
-- Enum type for vehicle type
-- ======================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'vehicle_type') THEN
        CREATE TYPE vehicle_type AS ENUM ('truck', 'trailer');
    END IF;
END$$;

-- ======================================
-- Table: vehicles
-- ======================================
CREATE TABLE IF NOT EXISTS public.vehicles (
    id SERIAL PRIMARY KEY,                       -- Unique vehicle identifier
    registration VARCHAR(20) NOT NULL UNIQUE,   -- Vehicle registration plate
    contractor_id INT REFERENCES public.contractors(id), -- Linked contractor, nullable
    depot_id INT NOT NULL REFERENCES public.depots(id), -- Vehicle home depot
    type vehicle_type NOT NULL,                 -- Type of vehicle
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP      -- Record creation timestamp
);
