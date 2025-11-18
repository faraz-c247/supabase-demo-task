-- ======================================
-- Enum types for driver shifts
-- ======================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'shift_type_enum') THEN
        CREATE TYPE shift_type_enum AS ENUM ('AM','PM','Rest');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'driver_shift_status') THEN
        CREATE TYPE driver_shift_status AS ENUM ('Assigned','Unassigned');
    END IF;
END$$;

-- ======================================
-- Table: driver_shifts
-- ======================================
CREATE TABLE IF NOT EXISTS public.driver_shifts (
    id SERIAL PRIMARY KEY,                       -- Unique shift identifier
    driver_id INT NOT NULL REFERENCES public.drivers(id) ON DELETE CASCADE, -- Driver reference
    vehicle_id INT REFERENCES public.vehicles(id), -- Default assigned truck, if any
    depot_id INT NOT NULL REFERENCES public.depots(id), -- Driver’s home depot
    shift_date DATE NOT NULL,                    -- Date of the shift
    shift_type shift_type_enum NOT NULL,        -- Type of shift assigned
    status driver_shift_status DEFAULT 'Assigned', -- Whether the driver is allocated or resting
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Record creation timestamp
);
