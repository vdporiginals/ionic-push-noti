import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // subscribe to a topic
      // this.fcm.subscribeToTopic('Deals');

      this.fcm.subscribeToTopic('marketing');

      this.fcm.getToken().then(token => {
        console.log(token);
      });

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

      this.fcm.hasPermission().then(hasPermission => {
        if (hasPermission) {
          console.log('Has permission!');
        }
      });

      this.fcm.clearAllNotifications();

      this.fcm.unsubscribeFromTopic('marketing');
    });
  }
}
