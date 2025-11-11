-- ======================================
-- Seeder: seed_skills_contractors_depots.sql
-- ======================================

-- Clear existing data
TRUNCATE TABLE 
    public.skills,
    public.contractors,
    public.depots,
    public.drivers
RESTART IDENTITY CASCADE;

-- -------------------------------
-- Insert data into skills
-- -------------------------------
INSERT INTO public.skills (name)
VALUES 
    ('aviation'),
    ('pump'),
    ('retail');

-- -------------------------------
-- Insert data into contractors
-- -------------------------------
INSERT INTO public.contractors (name)
VALUES
    ('Agency'),
    ('CoreFuels'),
    ('RL Ellesmere Port'),
    ('RL Kingsbury'),
    ('RL Magna Park'),
    ('RL Manchester'),
    ('RL Purfleet');

-- -------------------------------
-- Insert data into depots
-- -------------------------------
INSERT INTO public.depots (name, location)
VALUES
    ('RL Ellesmere Port', 'RL Ellesmere Port'),
    ('RL Kingsbury', 'RL Kingsbury'),
    ('RL Magna Park', 'RL Magna Park'),
    ('RL Manchester', 'RL Manchester'),
    ('RL Purfleet', 'RL Purfleet');


-- -------------------------------
-- Insert data into drivers
-- -------------------------------


INSERT INTO public.drivers (name)
VALUES
    ('Kevin Morrissey'),
    ('Leonard McLoughlin'),
    ('Michael Wilson'),
    ('John Connell'),
    ('Ian Cogan'),
    ('Dave Kenny'),
    ('Damien Wall'),
    ('John Barrett'),
    ('Patrick Murphy'),
    ('Paul Harrington'),
    ('Noel O''Burke'),
    ('Kevin Byrne'),
    ('Dominic Dent'),
    ('Lee Brady'),
    ('Zanis Kreilis'),
    ('Michael Heffernan'),
    ('Dariusz Brykala'),
    ('Philip Cantwell'),
    ('Maris Vancans'),
    ('Mariusz Sacrowski');