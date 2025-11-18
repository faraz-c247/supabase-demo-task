-- ======================================
-- Enum type for delivery status
-- ======================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'delivery_status_type') THEN
        CREATE TYPE delivery_status_type AS ENUM ('Scheduled','In Progress','Completed','Cancelled');
    END IF;
END$$;

-- ======================================
-- Table: deliveries
-- ======================================
CREATE TABLE IF NOT EXISTS public.deliveries (
    id SERIAL PRIMARY KEY,                           -- Unique delivery identifier
    shift_id INT NOT NULL REFERENCES public.driver_shifts(id) ON DELETE CASCADE, -- Driver shift reference
    destination_city VARCHAR(100) NOT NULL,         -- Delivery destination city
    customer_id INT REFERENCES public.customers(id), -- Optional customer reference
    status delivery_status_type DEFAULT 'Scheduled', -- Current delivery status
    notes TEXT,                                      -- Optional notes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Record update timestamp
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

DROP TRIGGER IF EXISTS set_updated_at_deliveries ON public.deliveries;

CREATE TRIGGER set_updated_at_deliveries
BEFORE UPDATE ON public.deliveries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
