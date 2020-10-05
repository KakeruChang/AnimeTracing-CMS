# AnimeTracing-CMS

AnimeTracing-CMS is the CMS of AnimeTracing App to CRUD the firebase store.

## Installation

```
yarn install
```

## Usage

Create a firebase project and add `key.ts` with the firebaseConfig to `/src/firebase`

```js
export default {
  apiKey: KEY.apiKey,
  authDomain: KEY.authDomain,
  databaseURL: KEY.databaseURL,
  projectId: KEY.projectId,
  storageBucket: KEY.storageBucket,
  messagingSenderId: KEY.messagingSenderId,
  appId: KEY.appId,
  measurementId: KEY.measurementId
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
