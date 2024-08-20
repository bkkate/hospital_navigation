BEGIN TRANSACTION;

DROP TABLE IF EXISTS direction, appointment, imaging, location CASCADE;

CREATE TABLE location (
    location_id SERIAL PRIMARY KEY,
    location_name varchar(50) NOT NULL

);
CREATE TABLE imaging (
    appointment_type SERIAL PRIMARY KEY,
    appointment_name varchar(25),
    location_id int,
    floor varchar(5) NOT NULL,
    suite varchar(15) NULL,

    CONSTRAINT FK_appointment_type FOREIGN KEY (location_id) REFERENCES location(location_id)
);

CREATE TABLE appointment (
    user_id int PRIMARY KEY NOT NULL,
    appointment_type int NOT NULL,
    appointment_time time,

    CONSTRAINT FK_appointment_type FOREIGN KEY (appointment_type) REFERENCES imaging(appointment_type)
);

CREATE TABLE direction (
    start_point int NOT NULL,
    end_point int NOT NULL,
    instruction varchar(800),

    CONSTRAINT PK_start_end PRIMARY KEY (start_point, end_point),
    CONSTRAINT FK_start_point FOREIGN KEY (start_point) REFERENCES location(location_id),
   	CONSTRAINT FK_end_point FOREIGN KEY (end_point) REFERENCES location(location_id)
);

COMMIT TRANSACTION;


