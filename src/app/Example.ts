
//read the credentials
const { GoogleSpreadsheet } = require('google-spreadsheet');

const RESPONSES_SHEET_ID = '1xNOKicQ7FvnfvP11wvyeInsPK2y2Alfa4hscZ5ZwV48';

const fs = require('fs');
const {GoogleAuth} = require("google-auth-library");

//create new document
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

//Credentials
const CREDENTIALS = JSON.parse(fs.readFileSync( '../resources/google-sheet-credentials.json'));

const getRow = async (country:string) => {
    await  doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    // load the documents info
    await doc.loadInfo();

    // Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    // Get all the rows
    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row.country == country) {
            console.log(row.name);
            console.log(row.label);
        }
    }
}

getRow('country');