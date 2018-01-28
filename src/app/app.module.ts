import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireDatabase } from "angularfire2/database-deprecated";

import { MyApp } from './app.component';
import { FIREBASE_CREDENTIALS } from "./firebase.credentials";

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // Initialize AngularFire with credentials from dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    // Import the AngularFireDatabaseModule to use database interactions
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
