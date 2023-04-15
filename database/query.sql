-- 1. Return the brand, model, and original location of the vehicles
SELECT bm.brand, bm.model, v.originalLocation
FROM "CARPOOLDB".Vehicle v
JOIN "CARPOOLDB".BrandModel bm ON v.brand = bm.brand AND v.model = bm.model;

-- 2. Return the brand, model, and original location of the vehicles including the brands and models that do not have a location
SELECT bm.brand, bm.model, v.originalLocation
FROM "CARPOOLDB".BrandModel bm
LEFT JOIN "CARPOOLDB".Vehicle v ON bm.brand = v.brand AND bm.model = v.model;

-- 3. Return the locations without vehicles
SELECT l.name
FROM "CARPOOLDB".Location l
LEFT JOIN "CARPOOLDB".Vehicle v ON l.name = v.originalLocation
WHERE v.plate IS NULL;

-- 4. Return all vehicles whose home is located in the city of Montreal
SELECT v.plate
FROM "CARPOOLDB".Vehicle v
WHERE v.originalLocation = 'Montreal';

-- 5. Return the locations and the number of hybrid cars at each location
SELECT l.name, COUNT(v.plate) as num_hybrid_cars
FROM "CARPOOLDB".Location l
LEFT JOIN "CARPOOLDB".Vehicle v ON l.name = v.originalLocation AND v.type = 'Hybrid'
GROUP BY l.name;

-- 6. Return the license plates of vehicles that have been used (not just reserved)
SELECT DISTINCT r.vehiclePlate
FROM "CARPOOLDB".Reservation r
JOIN "CARPOOLDB".Usage u ON r.reservationID = u.reservationID;

-- 7. Return all information of the members (individuals) living in a city with a location that has hybrid cars
SELECT m.*
FROM "CARPOOLDB".Member m
WHERE m.postalCode IN (
	SELECT l.postalCode
	FROM "CARPOOLDB".Location l
	JOIN "CARPOOLDB".Vehicle v ON l.name = v.originalLocation
	WHERE v.type = 'Hybrid'
	GROUP BY l.postalCode
);

-- 8. Return all information of the vehicles at the Montreal location that are free on 23/01/2023 at 10:00
SELECT v.*
FROM "CARPOOLDB".Vehicle v
WHERE v.originalLocation = 'Montreal' AND v.plate NOT IN (
	SELECT r.vehiclePlate
	FROM "CARPOOLDB".Reservation r
	WHERE (r.startDate, r.endDate) OVERLAPS ('2023-01-23 10:00:00', '2023-01-23 10:00:00')
);

-- 9. Return the license plates and the number of reservations of each vehicle (including those without reservation, i.e., the number of reservations is 0)
SELECT v.plate, COUNT(r.reservationID) as num_reservations
FROM "CARPOOLDB".Vehicle v
LEFT JOIN "CARPOOLDB".Reservation r ON v.plate = r.vehiclePlate
GROUP BY v.plate;

-- 10. Which vehicle has the highest fuel consumption?
SELECT v.plate
FROM "CARPOOLDB".Vehicle v
ORDER BY v.gasMileage DESC
LIMIT 1;

-- 11. Return the maximum, average, and minimum fuel consumption per vehicle category
SELECT v.type, MAX(v.gasMileage) as max_consumption, AVG(v.gasMileage) as avg_consumption, MIN(v.gasMileage) as min_consumption
FROM "CARPOOLDB".Vehicle v
GROUP BY v.type;

-- 12. Return all members who have booked a vehicle at a location other than
-- their original location even if the type of vehicle exists at their original location
SELECT DISTINCT m.*
FROM "CARPOOLDB".Member m
JOIN "CARPOOLDB".Reservation r ON m.memberNum = r.memberNum
JOIN "CARPOOLDB".Vehicle v ON r.vehiclePlate = v.plate
WHERE m.favoriteLocation <> v.originalLocation;






