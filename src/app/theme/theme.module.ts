import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatTooltipModule,
  MatListModule,
  MatCardModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule
  ],
})
export class ThemeModule { }
