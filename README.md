# npm install --global eas-cli && eas init --id 1a90abf8-c701-4c75-b690-f67a659953e4
<!-- npx expo-doctor -->
<!-- npx expo export -->
npx expo install --check
eas build -p android -e preview

npx expo start --tunnel

8081 public 
keytool -genkey -v -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -storepass 03184b046ee6c45286eedf2477e3a0a2 -keypass e7563d29cd13ba9d97e81aae513bda07 -alias 218a5b39aef5d2cfccc32adf11dfa290 -keystore release.keystore -dname "CN=com.vc1.sanatanaudits,OU=,O=,L=,S=,C=US"
keytool -genkey -v -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -storepass 03184b046ee6c45286eedf2477e3a0a2 -keypass e7563d29cd13ba9d97e81aae513bda07 -alias 218a5b39aef5d2cfccc32adf11dfa290 -keystore release.keystore -dname "CN=com.shree_bhandary.swastiaudits,OU=,O=,L=,S=,C=US"

{
  "android": {
    "keystore": {
      "keystorePath": "credentials/android/keystore.jks",
      "keystorePassword": "03184b046ee6c45286eedf2477e3a0a2",
      "keyAlias": "218a5b39aef5d2cfccc32adf11dfa290",
      "keyPassword": "e7563d29cd13ba9d97e81aae513bda07"
    }
  }
}


Old
keytool -genkey -v -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -storepass KEYSTORE_PASSWORD -keypass KEY_PASSWORD -alias KEY_ALIAS -keystore release.keystore -dname "CN=com.expo.your.android.package,OU=,O=,L=,S=,C=US"
com.shree_bhandary.swastiaudits
com.vc1.swastiaudits





keytool -genkey -v -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -storepass 2415660c362b3cc8217510c9a9bbdcd6 -keypass 5e09a8004a2a17fd40657156aab07623 -alias d1f03bd7a59745edf64eff172e227c08 -keystore release.keystore -dname "CN=com.vc1.sanatanaudits,OU=,O=,L=,S=,C=US"
{
  "android": {
    "keystore": {
      "keystorePath": "credentials/android/keystore.jks",
      "keystorePassword": "2415660c362b3cc8217510c9a9bbdcd6",
      "keyAlias": "d1f03bd7a59745edf64eff172e227c08",
      "keyPassword": "5e09a8004a2a17fd40657156aab07623"
    }
  }
}

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
