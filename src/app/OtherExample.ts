import * as path from "path";

(async () => {
    try {
        const { google } = require('googleapis')
        const auth = new google.auth.JWT({
            keyFile:'../resources/google-sheet-credentials.json',
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
        });

        const sheet = google.sheets("v4");

        // Verifica la autenticación antes de realizar la llamada a la API
        await auth.authorize();
        await sheet.spreadsheets.values.append({
            spreadsheetId: '1xNOKicQ7FvnfvP11wvyeInsPK2y2Alfa4hscZ5ZwV48',
            auth: auth,
            range: "Hoja 1",
            valueInputOption: "RAW",
            requestBody: {
                values: [["hello", "world"]]
            }
        });

        console.log("Datos agregados exitosamente.");
    } catch (error) {
        console.error("Error:", error);
    }
})();
