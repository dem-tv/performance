import { useState } from 'react';
import { Button } from './components/Button.tsx';
import data from './api/owid-co2-data.json';
import { Co2Modal } from './modules/Co2/Co2Modal.tsx';
import { Filters } from './modules/Filters/Filters.tsx';
import type { FilterModel } from './modules/Filters/Filters.types.ts';
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

  const onSubmitSelectedColumns = (selected: string[]) => {
    setShowModal(false);
    setSelectedColumns(selected);
  };

  const onSubmitFilters = (params: FilterModel) => {
    setSearchParams(params);
  };

  const columns = selectedColumns.map((name) => ({
    field: name,
    title: name,
  }));

  const dataList: [string, CO2Item][] = Object.entries(data);

  const searchYear = Number(searchParams.year);
  const tableRows = dataList
    .map(([countryName, d]) => ({
      country: countryName,
      iso_code: d.iso_code,
      ...d.data.find((item) => item.year === searchYear),
    }))
    .filter((item) => item.year);

  const searchCountry = searchParams.country.toLowerCase();
  const tableRowsFiltered = tableRows.filter((row) => {
    const rowCountry = row.country.toLowerCase();

    return rowCountry.includes(searchCountry);
  });

  const { sortDirection, columnSort } = searchParams;
  const tableRowsFilteredSorted =
    sortDirection === 'none'
      ? tableRowsFiltered
      : tableRowsFiltered.toSorted((a, b) => {
          if ((a[columnSort as never] || '') < (b[columnSort as never] || '')) {
            return sortDirection === 'desc' ? 1 : -1;
          }

          return sortDirection === 'desc' ? -1 : 1;
        });

  return (
    <div className={'flex flex-col gap-6 m-4'}>
      <Filters defaultFilters={searchParams} onSubmmit={onSubmitFilters} />
      <Table
        trackBy={'country'}
        addColumn={
          <Button onClick={() => setShowModal(true)}>
            <Icon name={'close'} rotate={'45'} />
          </Button>
        }
        columns={columns}
        rows={tableRowsFilteredSorted}
      />
      <Co2Modal
        requiredColumns={requiredColumns}
        onSubmit={onSubmitSelectedColumns}
        close={() => setShowModal(false)}
        show={showModal}
      />
    </div>
  );
}
