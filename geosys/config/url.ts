 
// Url for Extract sans retour(/geodata) Get
export const urlgeoDataGet: string = `data`;

// Url for planned extract(/geodata/{identifiant}) Get
export const urlgeoDatGetId: string = `data/`;

// Url for the login(/securite/login) Get
//export const urlLoginGet: string = `securite/login`;

// Url for the id working unit(/suivi-prod/unite-travail/id/theme/actif/{theme}) Get
export const urlgetidWu: string = `suivi-prod/unite-travail/id/theme/actif/`;

// Send planning to the API(/suivi-prod/planification) Post
export const urlPlaniPost: string = `suivi-prod/planification`;

// Url getting environnement(/systeme/envs) Get
export const urlEnvList: string = `systeme/envs`;

// Url getting list of classes(/systeme/ressources) Get
export const urlClassesList: string = `systeme/ressources-recherche`;

// Url getting the list of working type for theme(/suivi-prod/type-travail/theme/{theme}) Get
export const urlWorkingType: string = `suivi-prod/type-travail/theme/`;

// Url for delivery(Insert)(/geodata/{identifiant}) Post
export const urlDeliveryInsert: string = `geodata/`;

// Url for delivery(Update)(/geodata/{identifiant}) Put
export const urlDeliveryUpdate: string = `geodata/`;

// Url for creating MD(/geosys/creer-md) Post
export const urlCreateMD: string = `geosys/creer-md`;

// Url for validating MD(/geosys/valider-md) Post
export const urlValidateMD: string = `geosys/valider-md`;

// Url for getting all the info for a code(/suivi-prod/codes/{code}) Get
export const urlGetCode: string = `suivi-prod/codes/`;

// Url for cleaning a working unit id (/suivi-prod/unite-travail/{identifiant}) Delete
export const urlDeleteClean: string = `suivi-prod/unite-travail/`

// Url for cancelling for step for a theme (/suivi-prod/etape-ut/{identifiant}) Delete
export const urlCancelStep:string = `suivi-prod/etape-ut/`;

// Url for testing a file manager 
export const urlListFile:string = `systeme/liste-contenants-fichiers?contenant_url=`;

// Url Download/Delete File
export const urlFileAction: string = `systeme/fichiers?fichier_url=`;

// Url Upload File
export const urlFileActionUpload: string = `systeme/fichiers?contenant_url=`;

// Url Create/Download/Delete Folder
export const urlFolderAction: string = `systeme/contenants?contenant_url=`;

// Url to send a query to the API
export const urlQuery: string = `suivi-prod/requete-bd`;