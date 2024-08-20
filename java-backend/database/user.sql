-- ********************************************************************************
-- This script creates the database users and grants them the necessary permissions
-- ********************************************************************************

CREATE USER hospital_nav_owner
WITH PASSWORD 'hospitalnavadmin';

GRANT ALL
ON ALL TABLES IN SCHEMA public
TO hospital_nav_owner;

GRANT ALL
ON ALL SEQUENCES IN SCHEMA public
TO hospital_nav_owner;

CREATE USER hospital_nav_app_user
WITH PASSWORD 'hospitalnavgeneral';

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO hospital_nav_app_user;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO hospital_nav_app_user;