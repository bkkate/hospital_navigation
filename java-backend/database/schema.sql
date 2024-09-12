BEGIN TRANSACTION;

DROP TABLE IF EXISTS direction, appointment, imaging, location CASCADE;

CREATE TABLE location (
    main_location_id SERIAL PRIMARY KEY,
    main_location_name varchar(50) NOT NULL

);
CREATE TABLE imaging (
    appointment_type int PRIMARY KEY,
    appointment_name varchar(25),
    main_location_id int,
    floor varchar(5) NOT NULL,
    suite varchar(15) NULL,

    CONSTRAINT FK_appointment_type FOREIGN KEY (main_location_id) REFERENCES location(main_location_id)
);

CREATE TABLE appointment (
    scheduler_id int NOT NULL,
    appointment_type int NOT NULL,
    appointment_time time,

    CONSTRAINT PK_scheduler_id_appointment_type PRIMARY KEY (scheduler_id, appointment_type),
    CONSTRAINT FK_appointment_type FOREIGN KEY (appointment_type) REFERENCES imaging(appointment_type)
);

-- start to end point of big landmarks
CREATE TABLE direction (
    start_point int NOT NULL,
    end_point int NOT NULL,
    instruction varchar(800),

    CONSTRAINT PK_start_end PRIMARY KEY (start_point, end_point),
    CONSTRAINT FK_start_point FOREIGN KEY (start_point) REFERENCES location(main_location_id),
   	CONSTRAINT FK_end_point FOREIGN KEY (end_point) REFERENCES location(main_location_id)
);

COMMIT TRANSACTION;
