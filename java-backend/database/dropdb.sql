-- **************************************************************
-- This script destroys the database and associated users
-- **************************************************************

-- The following line terminates any active connections to the database so that it can be destroyed
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'hospital_nav';

DROP DATABASE hospital_nav;

DROP USER hospital_nav_owner;
DROP USER hospital_nav_app_user;
