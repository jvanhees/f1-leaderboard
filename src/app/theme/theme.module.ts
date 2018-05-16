import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatIconModule,
  MatTooltipModule,
  MatListModule,
  MatCardModule,
  MatPaginatorModule,
  MatChipsModule,
  MatProgressSpinnerModule
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
    MatPaginatorModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
})
export class ThemeModule { }
