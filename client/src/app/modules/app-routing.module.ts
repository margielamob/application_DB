import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { MemberComponent } from "../components/member/member.component";
import { ReservationComponent } from "../components/reservation/reservation.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "member", component: MemberComponent },
  { path: "reservations", component: ReservationComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

 }
