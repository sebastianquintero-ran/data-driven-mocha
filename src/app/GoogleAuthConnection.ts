const { auth } = require('google-auth-library');
const creds: JSON = require('../resources/google-sheet-credentials.json');


/** Esta línea se puede usar para reemplazar variables de entorno*/
// const keysEnvVar = process.env['CREDS']
const keysEnvVar = creds
if (!keysEnvVar){
    throw new Error('The creds environment variable was not found!');
}

/** Se crea esta constante para parsear la variable a JSON*/
// const keys = JSON.parse(keysEnvVar);
const keys = creds;

async function main(){
    const client = auth.fromJSON(keys);
    client.scopes = ['https://www.googleapis.com/auth/spreadsheets'];
    const sheetId = '1xNOKicQ7FvnfvP11wvyeInsPK2y2Alfa4hscZ5ZwV48';
    const res = await client.request({sheetId});
    console.log(res.data);
}

main().catch(console.error)