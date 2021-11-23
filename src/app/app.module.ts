import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
