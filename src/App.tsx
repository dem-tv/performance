import { useCallback, useMemo, useState } from 'react';
import { Button } from './components/Button.tsx';
import data from './api/owid-co2-data.json';
import { Co2Modal } from './modules/Co2/Co2Modal.tsx';
import { Filters } from './modules/Filters/Filters.tsx';
import type { FilterModel } from './modules/Filters/Filters.types.ts';
import type { TableColumn } from './types.ts';
import { Table } from './components/Table.tsx';
import { Icon } from './components/Icon.tsx';
import type { CO2Item } from './api/owid-co2-data.types';

const requiredColumns = new Set([
  'country',
  'year',
  'population',
  'co2',
  'co2_per_capita',
]);

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    ...requiredColumns,
  ]);
  const [searchParams, setSearchParams] = useState<FilterModel>({
    country: '',
    year: '2023',
    columnSort: 'none',
    sortDirection: 'none',
  });

  const closeModal = useCallback(() => setShowModal(false), []);
  const openModal = useCallback(() => setShowModal(true), []);

  const onSubmitSelectedColumns = useCallback((selected: string[]) => {
    setShowModal(false);
    setSelectedColumns(selected);
  }, []);

  const onSubmitFilters = useCallback((params: FilterModel) => {
    setSearchParams(params);
  }, []);

  const columns = useMemo<TableColumn[]>(() => {
    return selectedColumns.map((name) => ({
      field: name,
      title: name,
    }));
  }, [selectedColumns]);

  const dataList: [string, CO2Item][] = useMemo(() => Object.entries(data), []);

  const tableRows = useMemo(() => {
    const searchYear = Number(searchParams.year);

    return dataList
      .map(([countryName, d]) => ({
        country: countryName,
        iso_code: d.iso_code,
        ...d.data.find((item) => item.year === searchYear),
      }))
      .filter((item) => item.year);
  }, [dataList, searchParams.year]);

  const tableRowsFiltered = useMemo(() => {
    const searchCountry = searchParams.country.toLowerCase();
    return tableRows.filter((row) => {
      const rowCountry = row.country.toLowerCase();

      return rowCountry.includes(searchCountry);
    });
  }, [tableRows, searchParams.country]);

  const tableRowsFilteredSorted = useMemo(() => {
    const { sortDirection, columnSort } = searchParams;

    if (sortDirection === 'none') {
      return tableRowsFiltered;
    }

    return tableRowsFiltered.toSorted((a, b) => {
      if ((a[columnSort as never] || '') < (b[columnSort as never] || '')) {
        return sortDirection === 'desc' ? 1 : -1;
      }

      return sortDirection === 'desc' ? -1 : 1;
    });
  }, [tableRowsFiltered, searchParams.columnSort, searchParams.sortDirection]);

  const addButton = useMemo(
    () => (
      <Button onClick={openModal}>
        <Icon name={'close'} rotate={'45'} />
      </Button>
    ),
    []
  );

  return (
    <div className={'flex flex-col gap-6 m-4'}>
      <Filters defaultFilters={searchParams} onSubmmit={onSubmitFilters} />
      <Table
        trackBy={'country'}
        addColumn={addButton}
        columns={columns}
        rows={tableRowsFilteredSorted}
      />
      <Co2Modal
        requiredColumns={requiredColumns}
        onSubmit={onSubmitSelectedColumns}
        close={closeModal}
        show={showModal}
      />
    </div>
  );
}
