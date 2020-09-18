import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { SecureComponent } from "./pages/secure/secure.component";
import { LoginComponent } from "./pages/login";

export const routes: Routes = [
    { path: "",  component: LoginComponent, pathMatch: "full" },
    { path: "secure", component: SecureComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
