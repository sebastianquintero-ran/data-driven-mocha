import { expect } from 'chai';
import { test, describe, before } from 'mocha';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as path from "path";

let page: any;

describe('Ejemplo de integración con Google Sheets', () => {
    let spreadsheet: any;

    before(async () => {
        // Carga las credenciales de la hoja de cálculo de Google Sheets
        const creds = path.join(__dirname,'../resources/google-sheet-credentials.json');
        const { GoogleAuth } = require('google-auth-library');

        const auth = new GoogleAuth({
            keyFile: creds,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Carga la hoja de cálculo por su ID
        spreadsheet = new GoogleSpreadsheet(
            '1xNOKicQ7FvnfvP11wvyeInsPK2y2Alfa4hscZ5ZwV48',
            auth.fromJSON(creds)
        );

        const authClient = await auth.getClient();
        await spreadsheet.useOAuth2Client(authClient);

        // Autentica con las credenciales
        await spreadsheet.auth(creds);

        // Carga la información de la hoja de cálculo
        await spreadsheet.loadInfo();
    });

    test('Verificar datos en Google Sheets', async () => {
        // Accede a la primera hoja de la hoja de cálculo
        const sheet = spreadsheet.sheetsByIndex[0];

        // Lee los datos de la hoja de cálculo
        const rows = await sheet.getRows();

        // Realiza las pruebas con los datos recuperados
        expect(rows.length).to.be.greaterThan(0);
    });
});

// the emai to share with is testdata@testdata-405404.iam.gserviceaccount.com
