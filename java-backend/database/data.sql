DO $$
DECLARE
    jeffToBridge VARCHAR := 'From the entrance door, cross the bridge until you hit the intersection.';
    bridgeToMain VARCHAR := 'Turn right and continue walking down the hallway until you see the main lobby/waiting area and Starbucks.';
    mainToWest VARCHAR := 'Turn left at Starbucks and go straight until you see the cafeteria. The West Tower will be on your left.';
    preadmitToMain VARCHAR:= 'As you exit the office door, turn left and walk straight for a short distance until you see the waiting area and starbucks.';
    preadmitSign VARCHAR := 'Look for the office door with "Preadmission Clinic" written in large letters.';
BEGIN

    INSERT INTO location (main_location_id, main_location_name) VALUES ( 1, 'Jefferson Tower');
    INSERT INTO location (main_location_id, main_location_name) VALUES ( 2, 'Preadmission Clinic');
    INSERT INTO location (main_location_id, main_location_name) VALUES ( 3, 'Main Lobby');
    INSERT INTO location (main_location_id, main_location_name) VALUES ( 4, 'West Tower');

    INSERT INTO imaging (appointment_type, appointment_name, main_location_id, floor, suite) VALUES (1, 'X-ray', 3, 'B', null);
    INSERT INTO imaging (appointment_type, appointment_name, main_location_id, floor, suite) VALUES (2, 'CT', 3, 'A', null);
    INSERT INTO imaging (appointment_type, appointment_name, main_location_id, floor, suite) VALUES (3, 'Registration', 3, '1st', 'Room 159c');
    INSERT INTO imaging (appointment_type, appointment_name, main_location_id, floor, suite) VALUES (4, 'Doppler (Swedish)', 4, '4th', null);
    INSERT INTO imaging (appointment_type, appointment_name, main_location_id, floor, suite) VALUES (5, 'Doppler (Pacific Vasc)', 1, '2nd', 'Suite 201');
    INSERT INTO imaging (appointment_type, appointment_name, main_location_id, floor, suite) VALUES (6, 'Teaching', 1, '1st', 'Suite 110');
    INSERT INTO imaging (appointment_type, appointment_name, main_location_id, floor, suite) VALUES (7, 'Update H&P', 1, '1st', 'Suite 110');


    INSERT INTO direction (start_point, end_point, instruction) VALUES (1, 2, jeffToBridge || ' ' || 'Turn right and continue walking down the hallway. The Preadmission Clinic office will be on your left. ' || preadmitSign);
    INSERT INTO direction (start_point, end_point, instruction) VALUES (1, 3, jeffToBridge || ' ' || bridgeToMain);
    INSERT INTO direction (start_point, end_point, instruction) VALUES (1, 4, jeffToBridge || ' ' || bridgeToMain || mainToWest);
    INSERT INTO direction (start_point, end_point, instruction) VALUES (4, 1, 'Walk towards Starbucks and turn right when you reach it. Continue straight past the main lobby and down the hallway until you reach the intersection. Turn left and cross the bridge.');
    INSERT INTO direction (start_point, end_point, instruction) VALUES (3, 1, 'From the main lobby area, turn right and walk down the hallway until you hit the intersection/sky bridge. Turn left and cross the bridge.');
    INSERT INTO direction (start_point, end_point, instruction) VALUES (2, 1, 'As you exit the office door, turn right and walk straight. At the intersection, turn left and cross the bridge.');
    INSERT INTO direction (start_point, end_point, instruction) VALUES (2, 3, preadmitToMain);
    INSERT INTO direction (start_point, end_point, instruction) VALUES (2, 4, preadmitToMain || ' ' || mainToWest);
    INSERT INTO direction (start_point, end_point, instruction) VALUES (4, 2, 'Walk towards Starbucks and turn right when you reach it. Continue straight past the main lobby and as you walk down the hallway, the Preadmission Clinic office will be on your right. ' || preadmitSign);
    INSERT INTO direction (start_point, end_point, instruction) VALUES (4, 3, 'Walk towards Starbucks. Once you see Starbucks, the main lobby/waiting area will be on your right.');
    INSERT INTO direction (start_point, end_point, instruction) VALUES (3, 2, 'From the main lobby area, turn right and walk a short distance down the hallway. The Preadmission Clinic office will be on your right. ' || preadmitSign);

END $$;