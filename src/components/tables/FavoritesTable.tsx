import { useState, useEffect, useRef } from 'react';
import { DataTable, type DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AlertDialog from '../dialogs/AlertDialog';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { TableHeader } from '../TableHeader';
import { fetchFavorites } from '../../store/slices/get/allFavoritesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { FavoritesTypes } from '../../types/Favorites.types';
import FormDialog from '../dialogs/FormDialog';
import { formatDate } from '../../utils/helpers';

function FavoritesTable() {
    const dt = useRef<DataTable<FavoritesTypes[]>>(null);
    const dispatch = useAppDispatch();
    const { data: favoritesData, loading } = useAppSelector((state) => state.favorites);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    useEffect(() => {
        initFilters();
    }, []);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };
        const globalFilter = _filters['global'];

        if ('value' in globalFilter) {
            globalFilter.value = value;
        }

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            type: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            director: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            budget: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            location: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            duration: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            year: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
        setGlobalFilterValue('');
    };

    const paginatorLeft = <p className='font-family text-[12px] font-medium me-1'>Items per page:</p>;

    const actionBodyTemplate = (rowData: FavoritesTypes) => {
        return (
            <div className='flex items-center gap-2'>
                <FormDialog
                    type="edit"
                    textBtn="Edit"
                    dialogTitle="Edit Movie/TV Show"
                    rowId={rowData.id}
                />
                <AlertDialog rowId={rowData.id!} />
            </div>
        );
    };

    const exportCSV = (selectionOnly: boolean) => {
        dt.current?.exportCSV({ selectionOnly });
    };

    const handleExportCSV = (): void => {
        exportCSV(false);
    };

    // Define columns (same as DataTable columns)
    const pdfColumns = [
        { header: "Title", dataKey: "title" },
        { header: "Type", dataKey: "type" },
        { header: "Director", dataKey: "director" },
        { header: "Budget", dataKey: "budget" },
        { header: "Location", dataKey: "location" },
        { header: "Duration", dataKey: "duration" },
        { header: "Year", dataKey: "year" },
    ];

    // Map rows to fit the data (ensure your permissions are displayed as a string)
    const pdfRows = favoritesData.map((fav) => ({
        title: fav.title,
        type: fav.type,
        director: fav.director,
        budget: fav.budget,
        location: fav.location,
        duration: fav.duration,
        year: fav.year,
    }));

    const renderHeader =
        <TableHeader
            data={favoritesData}
            fileName="Favorites Movies/TV Show"
            columns={pdfColumns}
            rows={pdfRows}
            exportCSV={handleExportCSV}
            globalFilterValue={globalFilterValue}
            onGlobalFilterChange={onGlobalFilterChange} />;

    return (
        <div className="general_tbl">
            <DataTable value={favoritesData} ref={dt} dataKey="id" stripedRows paginator rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink"
                currentPageReportTemplate={`{first}-{last} of {totalRecords} items`}
                paginatorLeft={paginatorLeft} emptyMessage={loading ? "Loading..." : "No records found"}
                filters={filters} header={renderHeader}
                globalFilterFields={['title', 'type', 'director', 'budget', 'location', 'duration', 'year']}>
                <Column field="title" header="Title"></Column>
                <Column field="type" header="Type"
                    body={(rowData: FavoritesTypes) => rowData.type === "movie" ? "Movie" : "TV Show"}></Column>
                <Column field="director" header="Director"></Column>
                <Column field="budget" header="Budget"
                    body={(rowData: FavoritesTypes) =>
                        <>${rowData.budget}{rowData.type === "movie" ? "M" : "M/ep"}</>
                    }></Column>
                <Column field="location" header="Location"></Column>
                <Column field="duration" header="Duration"
                    body={(rowData: FavoritesTypes) =>
                        <>{rowData.duration} {rowData.type === "movie" ? "min" : "min/ep"}</>
                    }></Column>
                <Column field="year" header="Year/Time"
                    body={(rowData: FavoritesTypes) => formatDate(rowData.year)}></Column>
                <Column
                    header="Actions"
                    body={actionBodyTemplate}
                    style={{ width: '20%' }}
                ></Column>
            </DataTable>
        </div>
    );
}

export default FavoritesTable;