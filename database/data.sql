-- Populate VehicleType
INSERT INTO "CARPOOLDB".VehicleType (type, kilowatts, odometerLimit, hourlyPrice, kilometerPrice) VALUES
('Hybrid', 100, 150000, 5.00, 0.10),
('Sedan', NULL, 150000, 4.00, 0.15),
('Minivan', NULL, 150000, 6.00, 0.20);

-- Populate BrandModel
INSERT INTO "CARPOOLDB".BrandModel (brand, model) VALUES
('Toyota', 'Prius'),
('Honda', 'Civic'),
('Ford', 'Focus'),
('Dodge', 'Caravan');

-- Populate Location
INSERT INTO "CARPOOLDB".Location (name, postalCode, capacity, map) VALUES
('Montreal', 'H3B4G7', 10, '{"coordinates": [45.5017, -73.5673]}'),
('Toronto', 'M5G1Z8', 15, '{"coordinates": [43.6532, -79.3832]}'),
('Vancouver', 'V6B1A9', 12, '{"coordinates": [49.2827, -123.1207]}'),
('Laval', 'H8V9J0', 7, '{"coordinates": [45.9067, -73.8934]}');

-- Populate Vehicle
INSERT INTO "CARPOOLDB".Vehicle (plate, commissioningDate, gasMileage, odometer, type, brand, model, originalLocation) VALUES
('ABC123', '2019-01-01', 50.0, 30000, 'Hybrid', 'Toyota', 'Prius', 'Montreal'),
('DEF456', '2018-06-15', 30.0, 50000, 'Sedan', 'Honda', 'Civic', 'Vancouver'),
('GHI789', '2020-03-20', 25.0, 20000, 'Sedan', 'Ford', 'Focus', 'Toronto'),
('JKL012', '2017-08-12', 20.0, 80000, 'Minivan', 'Dodge', 'Caravan', 'Montreal');

-- Populate Insurance
INSERT INTO "CARPOOLDB".Insurance (number, startDate, dueDate, insurer, vehiclePlate) VALUES
('INS001', '2019-01-01', '2024-01-01', 'AllState', 'ABC123'),
('INS002', '2018-06-15', '2023-06-15', 'StateFarm', 'DEF456'),
('INS003', '2020-03-20', '2025-03-20', 'Geico', 'GHI789'),
('INS004', '2017-08-12', '2022-08-12', 'Progressive', 'JKL012');

-- Populate Member
INSERT INTO "CARPOOLDB".Member (memberNum, favoriteLocation, name, postalCode, email, driverLicence, bankNumber, bankName, password) VALUES
('M001', 'Montreal', 'Alice', 'H3B4G7', 'alice@example.com', 'D123456789', 'BN00123456', 'Bank of Montreal', 'password1'),
('M002', 'Toronto', 'Bob', 'M5G1Z8', 'bob@example.com', 'D987654321', 'BN00987654', 'Scotiabank', 'password2'),
('M003', 'Vancouver', 'Ralph', 'V6B1A9', 'ralph@example.com', 'E123456789', 'BN00345678', 'TD Canada Trust', 'password3');

-- Populate Reservation
INSERT INTO "CARPOOLDB".Reservation (reservationID, vehiclePlate, startDate, endDate, requirements, memberNum) VALUES
('R001', 'ABC123', '2023-04-01 10:00:00', '2023-04-10 14:30:00', 'Child seat', 'M001'),
('R002', 'DEF456', '2023-04-15 10:00:00', '2023-04-17 14:30:00', NULL, 'M002'),
('R003', 'ABC123', '2023-04-20 10:00:00', '2023-04-22 14:30:00', NULL, 'M001'),
('R004', 'DEF456', '2023-04-25 10:00:00', '2023-04-10 14:00:00', 'Roof rack', 'M002'),
('ROO5', 'JKL012', '2023-01-22 10:00:00', '2023-01-24 10:00:00', NULL, 'M001');

-- Populate Invoice
INSERT INTO "CARPOOLDB".Invoice (invoiceID, memberNum, invoiceDate, deadline, total, status) VALUES
('I001', 'M001', '2023-04-01', '2023-05-01', 100.00, 'Paid'),
('I002', 'M002', '2023-04-15', '2023-05-15', 150.00, 'Unpaid');

-- Populate CoopMember
INSERT INTO "CARPOOLDB".CoopMember (memberNum, amountShares) VALUES
('M001', 500.00);

-- Populate CarSharingMember
INSERT INTO "CARPOOLDB".CarSharingMember (memberNum, cotisation, lastAccident, birthDate, personhood) VALUES
('M002', 100.00, '2020-08-15', '1990-06-30', 'Physical'),
('M003', 150.00, NULL, '1985-12-15', 'Moral');

-- Populate Usage
INSERT INTO "CARPOOLDB".Usage (usageID, reservationID, invoiceID, initOdometer, finalOdometer, duration, distance) VALUES
('U001', 'R001', 'I001', 30000, 30100, '1 day', 100),
('U002', 'R002', 'I002', 50000, 50200, '2 days', 200),
('U003', 'R003', 'I001', 20000, 20100, '2 days', 100),
('U004', 'R004', 'I002', 80000, 80200, '2 days', 200);

