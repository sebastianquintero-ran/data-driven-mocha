
import chai, {expect} from 'chai';
import {test, describe, before, after} from 'mocha';
import {chromium} from 'playwright';
import {GoogleSpreadsheet} from 'google-spreadsheet';
// import * as creds from './resources/google-sheet-credentials.json' assert {type: "json"};

let browser: any;
let page: any;

before(async () => {
    // Inicializa el navegador y la página de Playwright antes de las pruebas
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
});

after(async () => {
    // Cierra el navegador después de las pruebas
    await browser.close();
});

describe('Ejemplo de integración con Google Sheets', () => {
    let spreadsheet: any;

    before(async () => {
        // Carga las credenciales de la hoja de cálculo de Google Sheets
        const creds: JSON = require('../resources/google-sheet-credentials.json');
        const {GoogleApiAuth} = require('google-auth-library');
        const auth = new GoogleApiAuth({
            keyFile: creds,
            scope: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Carga la hoja de cálculo por su ID
        spreadsheet = new GoogleSpreadsheet('1xNOKicQ7FvnfvP11wvyeInsPK2y2Alfa4hscZ5ZwV48', auth);

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

    test('Prueba de navegación con Playwright', async () => {
        // Utiliza Playwright para navegar a una página y realizar pruebas
        await page.goto('https://www.google.com');

        // Puedes agregar más código de prueba aquí utilizando Playwright
    });
});

// the emai to share with is testdata@testdata-405404.iam.gserviceaccount.com