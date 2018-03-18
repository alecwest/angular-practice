import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'more-info', component: MoreInfoComponent },
    { path: ':id', component: ProductComponent },
];

