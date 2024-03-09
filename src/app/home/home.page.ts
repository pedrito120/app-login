import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  opcion: string;
  valor: number;
  nombre : string;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private service: HomeService,
    private router: Router
  ) { }

  async enviar() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando datos...'
    });
    await loading.present();

    
   this.service.setData2(this.nombre,this.opcion,this.valor).subscribe((response: any) => {
        loading.dismiss();
        if (response.success) {
          this.showAlert('Exito', response.message);
        } else {
          this.showAlert('Error', response.message);
        }
      }, (error) => {
        loading.dismiss();
        this.showAlert('Error', 'Ocurrio un error al enviar los datos. Por favor, intenta de nuevo.');
      });
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}