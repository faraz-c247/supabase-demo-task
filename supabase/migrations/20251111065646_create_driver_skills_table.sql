CREATE TABLE IF NOT EXISTS public.driver_skills (
    driver_id INT NOT NULL REFERENCES public.drivers(id) ON DELETE CASCADE,
    skill_id INT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    PRIMARY KEY (driver_id, skill_id)  -- Composite primary key
);
