import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { UserProfileComponent ,UserEditForm} from './user-profile/user-profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HomePageComponent,UserDataSave} from './home-page/home-page.component'
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'angular-image-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  entryComponents: [UserEditForm,UserDataSave],
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    UserEditForm,
    UserDataSave

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,HttpClientModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
