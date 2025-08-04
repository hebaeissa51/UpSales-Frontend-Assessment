import { BsFiletypeCsv } from "react-icons/bs";
import { BsFiletypeXls } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import type { FavoritesTypes } from "../types/Favorites.types";
import { exportExcel, exportPdf } from "../utils/helpers";
import { TextField } from "@mui/material";

type TableHeaderProps = {
    data: FavoritesTypes[];
    fileName: string;
    columns: { header: string; dataKey: string }[];
    rows: FavoritesTypes[];
    exportCSV: () => void;
    globalFilterValue?: string;
    onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isFiltered?: boolean;
};

export const TableHeader = ({
    data,
    fileName,
    columns,
    rows,
    exportCSV,
    globalFilterValue,
    onGlobalFilterChange,
    isFiltered = true
}: TableHeaderProps) => {
    return (
        <div className={`flex ${isFiltered ? "justify-between" : "justify-end"} items-center mb-4`}>
            {isFiltered &&
                <TextField
                    margin="none"
                    id="search_input"
                    label="Search"
                    type="text"
                    variant="standard"
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                />
            }
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    title="Export as CSV"
                    className="btn-export bg-[#06B7D3]"
                    onClick={exportCSV}
                    data-pr-tooltip="CSV"
                >
                    <BsFiletypeCsv />
                </button>
                <button
                    type="button"
                    title="Export as XLS"
                    className="btn-export bg-[#22C65C]"
                    onClick={() => exportExcel(data, fileName)}
                    data-pr-tooltip="XLS"
                >
                    <BsFiletypeXls />
                </button>
                <button
                    type="button"
                    title="Export as PDF"
                    className="btn-export bg-[#F87315]"
                    onClick={() => exportPdf(columns, rows, fileName)}
                    data-pr-tooltip="PDF"
                >
                    <BsFiletypePdf />
                </button>
            </div>
        </div>
    );
}

