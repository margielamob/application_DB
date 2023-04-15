import {Router, Request, Response, NextFunction} from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import * as pg from "pg";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();
    // ======= GENERAL ROUTES =======
    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.get("/members/search/:name", (req: Request, res: Response, next: NextFunction) => {
      this.databaseService
        .searchMembersByName(req.params.name)
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get(
      "/vehicles/plate-brand-model",
      (req: Request, res: Response, next: NextFunction) => {
        const startDate = req.query.start_date as string;
        const endDate = req.query.end_date as string;
    
        if (!startDate || !endDate) {
          res.status(400).json({ error: "start_date and end_date query parameters are required" });
          return;
        }
    
        this.databaseService
          .getAllVehiclePlateBrandModel(startDate, endDate)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.status(500).json({ error: "An error occurred while fetching available vehicles" });
          });
      }
    );
    

    router.post("/reservations", async (req: Request, res: Response) => {
      try {
        const reservation = req.body;
        await this.databaseService.createReservation(reservation);
        res.status(201).send();
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while creating the reservation." });
      }
    });

    return router;
  }
}
