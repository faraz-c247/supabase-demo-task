-- ======================================
-- Table: customer_shift_demands
-- ======================================
CREATE TABLE IF NOT EXISTS public.customer_shift_demands (
    id SERIAL PRIMARY KEY,                        -- Unique demand record ID
    customer_id INT NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE, -- Customer reference
    start_date DATE NOT NULL,                     -- Start date of demand period
    end_date DATE NOT NULL,                       -- End date of demand period
    mon_fri_am INT DEFAULT 0,                     -- Monday-Friday AM shifts
    mon_fri_pm INT DEFAULT 0,                     -- Monday-Friday PM shifts
    sat_am INT DEFAULT 0,                         -- Saturday AM shifts
    sat_pm INT DEFAULT 0,                         -- Saturday PM shifts
    sun_am INT DEFAULT 0,                         -- Sunday AM shifts
    sun_pm INT DEFAULT 0,                         -- Sunday PM shifts
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

DROP TRIGGER IF EXISTS set_updated_at_customer_shift ON public.customer_shift_demands;

CREATE TRIGGER set_updated_at_customer_shift
BEFORE UPDATE ON public.customer_shift_demands
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
