"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const inversify_1 = require("inversify");
const format = require("pg-format");
const pg = require("pg");
require("reflect-metadata");
let DatabaseService = class DatabaseService {
    constructor() {
        this.connectionConfig = {
            user: "postgres",
            database: "CARPOOL",
            password: "2512",
            port: 5432,
            host: "127.0.0.1",
            keepAlive: true
        };
        this.pool = new pg.Pool(this.connectionConfig);
    }
    // ======= X TABLE =======
    getAllFromTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT * FROM "CARPOOLDB".${tableName};`);
            client.release();
            return res;
        });
    }
    // ======= MEMBER BY NAME =======
    searchMembersByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const query = `SELECT * FROM "CARPOOLDB".Member WHERE name ILIKE $1;`;
                const result = yield client.query(query, [`%${name}%`]);
                return result;
            }
            catch (error) {
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    // ======= CREATE RESERVATION =======
    createReservation(reservation) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
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
            const res = yield client.query(query, values);
            client.release();
            return res;
        });
    }
    getAllVehiclePlateBrandModel(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
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
                const res = yield client.query(query);
                return res;
            }
            catch (e) {
                console.error(e.stack);
                throw e;
            }
            finally {
                client.release();
            }
        });
    }
};
DatabaseService = __decorate([
    (0, inversify_1.injectable)()
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map