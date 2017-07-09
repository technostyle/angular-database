import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule} from '@angular/http';
import { RequestService } from './request.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { RenderComponent } from './render/render.component';

@NgModule({
  declarations: [
    AppComponent,
    RenderComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule, 
    ReactiveFormsModule
  ],
  providers: [RequestService, HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
