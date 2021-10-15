import { Component, OnInit } from '@angular/core';
/**importar librerías */
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { MarcadorI } from '../model/Marcador.interface';
declare var google;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //coordenadas: (Lat: 53.46319946467559, Lng: -2.291306490754285)
  lat: number = 53.46319946467559;
  lng: number = -2.291306490754285;
  map = null;

  constructor(
    private geoLoca: Geolocation,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.cargarMapa();
  }

  async cargarMapa() {
    const cargar = await this.loadingCtrl.create({
      message: "Cargando mapa..."
    });
    await cargar.present();
    const ubicacion = {
      lat: this.lat,
      lng: this.lng
    };
    const mapaHtml: HTMLElement = document.getElementById("map");
    this.map = new google.maps.Map(mapaHtml, {
      center: ubicacion,
      zoom: 20
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      cargar.dismiss();

      const marcador = new google.maps.Marker({
        position: {
          lat: ubicacion.lat,
          lng: ubicacion.lng
        },
        zoom: 8,
        map: this.map,
        title: 'Old Trafford'
      });
      this.cargarMarcadores();
    });
  }

  ///////////////////////////////////////////////////////
  cargarMarcadores() {
    this.listaMarcadores.forEach(item => {
      this.agregarMarcadores(item);
    })
  }

  agregarMarcadores(ubicacion: MarcadorI) {
    const marcador = new google.maps.Marker({
      position: {
        lat: ubicacion.position.lat,
        lng: ubicacion.position.lng
      },
      zoom: 8,
      map: this.map,
      title: ubicacion.title
    });
  }

  listaMarcadores: MarcadorI[] = [
    {
      position: {
        lat: 53.46709966529158,
        lng: -2.2949973568121584
      },
      title: 'Car Park'
    },
    {
      position: {
        lat: 53.4690783348864,
        lng: -2.2810199388163097
      },
      title: 'Craven DR 5'
    }]
}
