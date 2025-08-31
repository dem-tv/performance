import type { TableColumn, TableRow } from '../types.ts';
import { memo, type ReactNode, useMemo } from 'react';

type Props = {
  columns: TableColumn[];
  rows: TableRow[];
  addColumn?: ReactNode;
  trackBy: string;
};

const TableComp = (props: Props) => {
  const columns = props.columns.map((column) => (
    <th className={'p-2 border text-left'} key={column.field}>
      {column.title}
    </th>
  ));

  const rows = useMemo(
    () =>
      props.rows.map((row) => {
        return (
          <tr className={'border'} key={row[props.trackBy]}>
            {props.columns.map((column) => (
              <td className={'p-2 border'} key={column.field}>
                {row[column.field] || 'N/A'}
              </td>
            ))}
          </tr>
        );
      }),
    [props.rows, props.columns, props.trackBy]
  );

  return (
    <table>
      <thead>
        <tr>
          {columns}
          {props.addColumn ? (
            <th className={'border p-2'}>{props.addColumn}</th>
          ) : null}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export const Table = memo(TableComp);
