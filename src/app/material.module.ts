import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatDialogModule
} from "@angular/material";

const MATERIAL_MODULES: any = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...MATERIAL_MODULES
  ]
})
export class MaterialModule { }
