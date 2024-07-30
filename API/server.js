const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');

const app = express();
const port = 8000;

app.use(cors());

app.get('/data', (req, res) => {
    const workbook = xlsx.readFile('./Tags.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    const uniqueColumn3 = [...new Set(data.map(item => item['Business Area']))];
    const column4ByColumn3 = uniqueColumn3.reduce((acc, col3) => {
        acc[col3] = [...new Set(data.filter(item => item['Business Area'] === col3).map(item => item['_BusinessSegmentDescription']))];
        return acc;
    }, {});

    res.json({ uniqueColumn3, column4ByColumn3 });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
