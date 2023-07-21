import { NgModule }         from '@angular/core';
import { MatIconModule }    from '@angular/material/icon';
import { MatInputModule }   from '@angular/material/input';
import { CommonModule }     from '@angular/common';
import { MatCardModule }    from '@angular/material/card';
import { MatButtonModule }  from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule}from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ScrollingModule} from '@angular/cdk/scrolling';
const materialModules = [
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTabsModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  ScrollingModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules
  ] , 
  exports: [...materialModules],
  // providers: [MatSnackBarModule]
})
export class MaterialModule { }
