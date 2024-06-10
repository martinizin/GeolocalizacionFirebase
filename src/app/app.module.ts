import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// geolocation and native-geocoder
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { environment } from '../environments/environment';

import {AngularFireModule} from '@angular/fire/compat'
import{AngularFireAuthModule} from'@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireAuthModule,AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"prueba-30416","appId":"1:1068318007469:web:5cf8691fd1c37d59f0a624","storageBucket":"prueba-30416.appspot.com","apiKey":"AIzaSyB9ilgdgujz3btFf7Fkx7hqQGJ__UNZnLg","authDomain":"prueba-30416.firebaseapp.com","messagingSenderId":"1068318007469","measurementId":"G-11CQ8W33GK"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())],
  bootstrap: [AppComponent],
})
export class AppModule {}