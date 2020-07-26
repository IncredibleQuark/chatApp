
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
  ]
})
export class AppMaterialModule {
}
