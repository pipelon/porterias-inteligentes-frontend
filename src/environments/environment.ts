// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi: "http://localhost/porterias-inteligentes/web/",
  idUnidadResidencial: ["1", "2"],
  username: 'usarroyo',
  password: 'pwArroyo123',
  call: {
    urServerCall: "http://142.93.60.136:8083/residentes/call.php",
    CODEEXT: "2004",
    NAME_CUSTOMER: "omar",
    CODE_CUSTOMER: "4",
    CODEPREFIX: "200"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
