const { GoogleSpreadsheets } = require('google-spreadsheet');
import { JWT } from 'google-auth-library';

const RESPONSE_SHEET_ID = '1xNOKicQ7FvnfvP11wvyeInsPK2y2Alfa4hscZ5ZwV48';

const fstc = require('fs')

// Carga las credenciales de forma asíncrona
const loadCredentials = async () => {
    const credentials = await fstc.readFile('../resources/google-sheet-credentials.json');
    return JSON.parse(credentials.toString());
};

const getRows = async (country: string) => {
    // Crea una nueva instancia del documento
    const doc = new GoogleSpreadsheets(RESPONSE_SHEET_ID, await loadCredentials());

    // Carga las credenciales
    const credentials = await loadCredentials();

    // Autentica con las credenciales
    const serviceAccountAuth =  new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes:[
            'https://www.googleapis.com/auth/spreadsheets',
        ],
    });

    // Carga la información del documento
    await doc.loadInfo();

    // Obtiene la hoja por índice
    const sheet = doc.sheetsByIndex[0];

    // Obtiene todas las filas
    const rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row.country === country) {
            console.log(row.name);
            console.log(row.label);
        }
    }
};

getRows('country');
