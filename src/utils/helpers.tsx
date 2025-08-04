import moment from 'moment';
import type { FavoritesTypes } from '../types/Favorites.types';
import { jsPDF } from 'jspdf';
import autoTable, { type CellInput } from 'jspdf-autotable';

// Helper function to display year from date
export const formatDate = (dateString: string | Date) => {
    return moment(dateString).locale("en").format('YYYY');
};

// Helper function to generate token
export function generateToken(length: number = 64): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

// Helper function to export XLSX files
const saveAsExcelFile = (buffer: ArrayBuffer | Uint8Array, fileName: string) => {
    import('file-saver').then((module) => {
        if (module && module.default) {
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });

            module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        }
    });
};

export const exportExcel = (data: FavoritesTypes[], fileName: string) => {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        saveAsExcelFile(excelBuffer, fileName);
    });
};

// Helper function to export PDF files
export const exportPdf = (
    columns: { header: string; dataKey: string }[],
    rows: FavoritesTypes[],
    fileName: string
) => {
    const doc = new jsPDF();

    const sanitizedRows: { [key: string]: CellInput }[] = rows.map((row) => {
        const sanitizedRow: { [key: string]: CellInput } = {};

        for (const key in row) {
            const value = row[key as keyof FavoritesTypes];

            sanitizedRow[key] =
                value instanceof Date
                    ? value.toLocaleDateString()
                    : (value as CellInput);
        }

        return sanitizedRow;
    });

    autoTable(doc, {
        columns,
        body: sanitizedRows,
        startY: 20,
        headStyles: { fillColor: [41, 128, 185] },
        margin: { top: 10 },
        styles: {
            fontSize: 10,
            cellPadding: 10,
            overflow: 'linebreak',
        },
    });

    doc.save(`${fileName}.pdf`);
};

