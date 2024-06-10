import { Component, NgZone, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  latitude: any = 0; // latitude
  longitude: any = 0; // longitude
  address: string;

  constructor(
    private platform: Platform,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private firestore: AngularFirestore,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getCurrentCoordinates();
  }

  // geolocation options
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600,
  };

  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    if (this.platform.is('hybrid')) {
      // Usar plugins nativos en dispositivos móviles
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          this.ngZone.run(() => {
            console.log(resp);
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            this.getAddress(this.latitude, this.longitude);
            this.saveCoordinatesToFirestore(this.latitude, this.longitude);
          });
        })
        .catch((error) => {
          console.log('Error getting location', error);
        });
    } else if (navigator.geolocation) {
      // Usar la API del navegador en la web
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.ngZone.run(() => {
            console.log(position);
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.getAddress(this.latitude, this.longitude);
            this.saveCoordinatesToFirestore(this.latitude, this.longitude);
          });
        },
        (error) => {
          console.log('Error getting location', error);
        },
        this.options
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  // geocoder options
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  // get address using coordinates
  getAddress(lat: any, long: any) {
    if (this.platform.is('hybrid')) {
      // Usar plugins nativos en dispositivos móviles
      this.nativeGeocoder
        .reverseGeocode(lat, long, this.nativeGeocoderOptions)
        .then((res: NativeGeocoderResult[]) => {
          this.ngZone.run(() => {
            this.address = this.pretifyAddress(res[0]);
          });
        })
        .catch((error: any) => {
          alert('Error getting location' + JSON.stringify(error));
        });
    } else {
      // En la web, puedes usar un servicio de geocodificación basado en la web
      // Por ejemplo, usando una API de geocodificación de un servicio externo
      console.log('Geocoding not implemented for web platform');
    }
  }

  // address
  pretifyAddress(address: any) {
    let obj = [];
    let data = '';
    for (let key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length) data += obj[val] + ', ';
    }
    return data.slice(0, -2); // corregir el recorte de la dirección
  }

  saveCoordinatesToFirestore(latitude: number, longitude: number) {
    const timestamp = new Date().toISOString();
    const data = {
      latitude,
      longitude,
      timestamp,
    };

    this.firestore
      .collection('locations')
      .add(data)
      .then(() => {
        console.log('Coordinates saved to Firestore successfully');
      })
      .catch((error: any) => {
        console.error('Error saving coordinates to Firestore: ', error);
      });
  }
}
