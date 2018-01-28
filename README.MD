#REFERENCES:
  https://ionicframework.com/docs/v1/guide/publishing.html

  https://www.npmjs.com/package/angularfire2

  https://github.com/angular/angularfire2/blob/HEAD/docs/ionic/v3.md


#ISSUES REFERENCES:
  #FirebaseListObservable
       https://stackoverflow.com/questions/47183979/type-angularfirelist-is-not-assignable-to-type-firebaselistobservableany


#NOTES:

  #AngularFire2
   1. import AngularFireDatabase and FirebaseListObservables from "angularfire2/database-deprecated" not from "angularfire2/database"


#Generate APK:

1. run "ionic cordova build --release android".

2. It generates the unsigned apk file.

#Sign The Apk:

1. Check Keytool in cmd, if working no problem, otherwise install jdk and add the jdk bin path to the path Environment Variable.(C:\Program Files\Java\jdk1.7.0_79\bin)

2. Then run "keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000"

    Note: Give any password as your wish.

3. After running the above cmd it will generate "my-release-key.keystore" file inside the application folder.

4. Next To sign the unsigned APK, run the "jarsigner" tool which is also included in the JDK.

5. Move the Unsign build apk to the main folder.

6. After run the cmd "jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore <appname>.apk alias_name".

7. Enter the password same as given before as in step 2.
