import {auth} from 'google-auth-library';
// import creds from '../resources/google-sheet-credentials.json';

const creds = require('../resources/google-sheet-credentials.json')
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
    const url:string = 'https://www.googleapis.com/auth/spreadsheets';
    const sheetId = '1xNOKicQ7FvnfvP11wvyeInsPK2y2Alfa4hscZ5ZwV48';
    const res = await client.request({url});
    console.log(res.data);
}

main().catch(console.error)