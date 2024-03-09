import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  email: string;
  password: string;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private service: AuthService
  ) { }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...'
    });
    await loading.present();
    const data = {
      email: this.email, 
      password: this.password 
    }
    console.log(data);
    this.service.login(data).subscribe((response:any) => {
      loading.dismiss();
      if (response.success) {
        this.service.setLoggedIn(response.token);
        this.router.navigateByUrl('/');
      } else {
        this.showAlert('Error', response.message);
      }
    }, (error) => {
      loading.dismiss();
      this.showAlert('Error', 'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.');
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
}

