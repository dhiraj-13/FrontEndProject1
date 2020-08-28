import { HomePageComponent } from "./home-page/home-page.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", component: HomePageComponent, pathMatch: "full" },
  { path: "home", component: HomePageComponent, pathMatch: "full" },
  { path: "UserProfile/:id", component: UserProfileComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
