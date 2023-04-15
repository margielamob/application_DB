CREATE OR REPLACE FUNCTION trigger_func_avendre()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.odometer >= (SELECT odometerLimit FROM "CARPOOLDB".VehicleType WHERE type = NEW.type) THEN
        CREATE TABLE IF NOT EXISTS "CARPOOLDB".AVENDRE (
            plate VARCHAR(6) PRIMARY KEY,
            commissioningDate DATE,
            gasMileage NUMERIC(3,1),
            odometer INT,
            "type" "CARPOOLDB".type,
            brand VARCHAR(20),
            model VARCHAR(20),
            originalLocation VARCHAR(50)
        );
        
        INSERT INTO "CARPOOLDB".AVENDRE (plate, commissioningDate, gasMileage, odometer, type, brand, model, originalLocation)
        VALUES (NEW.plate, NEW.commissioningDate, NEW.gasMileage, NEW.odometer, NEW.type, NEW.brand, NEW.model, NEW.originalLocation);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER avendre_trigger
AFTER INSERT OR UPDATE ON "CARPOOLDB".Vehicle
FOR EACH ROW
EXECUTE FUNCTION trigger_func_avendre();

