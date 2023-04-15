import { injectable } from "inversify";
import format = require("pg-format")
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "CARPOOL",
    password: "2512",
    port: 5432,          
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

   // ======= X TABLE =======
   public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM "CARPOOLDB".${tableName};`);
    client.release();
    return res;
  }

  // ======= MEMBER BY NAME =======
  public async searchMembersByName(name: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    try {
      const query = `SELECT * FROM "CARPOOLDB".Member WHERE name ILIKE $1;`;
      const result = await client.query(query, [`%${name}%`]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  // ======= CREATE RESERVATION =======
  public async createReservation(reservation: {
    reservationid: string;
    vehicleplate: string;
    startdate: Date;
    enddate: Date;
    requirements: string;
    membernum: string;
  }): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    console.log(reservation);
    const query = `
      INSERT INTO "CARPOOLDB".Reservation (reservationid, vehicleplate, startdate, enddate, requirements, membernum)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;
  
    const values = [
      reservation.reservationid,
      reservation.vehicleplate,
      reservation.startdate,
      reservation.enddate,
      reservation.requirements,
      reservation.membernum,
    ];
  
    const res =  await client.query(query, values);
    client.release();
    return res;
  }

  public async getAllVehiclePlateBrandModel(startDate: string, endDate: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const query = format(`
      SELECT DISTINCT plate, brand, model
      FROM "CARPOOLDB".Vehicle
      WHERE plate NOT IN (
        SELECT vehiclePlate
        FROM "CARPOOLDB".Reservation
        WHERE NOT (enddate <= %L OR startdate >= %L)
      );
    `, startDate, endDate);
  
    try {
      const res = await client.query(query);
      return res;
    } catch (e) {
      console.error(e.stack);
      throw e;
    } finally {
      client.release();
    }
  }
  
}
