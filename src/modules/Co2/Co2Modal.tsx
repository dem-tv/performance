import { Modal } from '../../components/Modal.tsx';
import { Button } from '../../components/Button.tsx';
import { Checkbox } from '../../components/Checkbox.tsx';
import { type FormEvent, useState } from 'react';

type Props = {
  show: boolean;
  onSubmit: (selectedColumns: string[]) => void;
  close: () => void;
  requiredColumns: Set<string>;
};

const availableColumns = [
  'country',
  'year',
  'population',
  'co2',
  'co2_per_capita',
  'cement_co2_per_capita',
  'cement_co2',
  'co2_growth_abs',
  'co2_growth_prct',
  'co2_including_luc',
  'co2_including_luc_growth_abs',
  'co2_including_luc_growth_prct',
  'co2_including_luc_per_capita',
  'co2_including_luc_per_unit_energy',
  'co2_per_capita',
  'co2_per_unit_energy',
  'coal_co2',
  'coal_co2_per_capita',
  'cumulative_cement_co2',
  'cumulative_co2',
  'cumulative_co2_including_luc',
  'cumulative_coal_co2',
  'cumulative_flaring_co2',
  'cumulative_gas_co2',
  'cumulative_luc_co2',
  'cumulative_oil_co2',
  'energy_per_capita',
  'flaring_co2',
  'flaring_co2_per_capita',
  'gas_co2',
  'gas_co2_per_capita',
  'ghg_excluding_lucf_per_capita',
  'ghg_per_capita',
  'land_use_change_co2',
  'land_use_change_co2_per_capita',
  'methane',
  'methane_per_capita',
  'nitrous_oxide',
  'nitrous_oxide_per_capita',
  'oil_co2',
  'oil_co2_per_capita',
  'primary_energy_consumption',
  'share_global_cement_co2',
  'share_global_co2',
  'share_global_co2_including_luc',
  'share_global_coal_co2',
  'share_global_cumulative_cement_co2',
  'share_global_cumulative_co2',
  'share_global_cumulative_co2_including_luc',
  'share_global_cumulative_coal_co2',
  'share_global_cumulative_flaring_co2',
  'share_global_cumulative_gas_co2',
  'share_global_cumulative_luc_co2',
  'share_global_cumulative_oil_co2',
  'share_global_flaring_co2',
  'share_global_gas_co2',
  'share_global_luc_co2',
  'share_global_oil_co2',
  'share_of_temperature_change_from_ghg',
  'temperature_change_from_ch4',
  'temperature_change_from_co2',
  'temperature_change_from_ghg',
  'temperature_change_from_n2o',
  'total_ghg',
  'total_ghg_excluding_lucf',
];

export const Co2Modal = (props: Props) => {
  const [checkedColumns, setCheckedColumns] = useState<string[]>([
    ...props.requiredColumns,
  ]);

  const onSelectItem = (name: string) => {
    if (checkedColumns.includes(name)) {
      setCheckedColumns((prevState) =>
        prevState.filter((selectedName) => selectedName !== name)
      );
      return;
    }

    setCheckedColumns((prevState) => [...prevState, name]);
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    props.onSubmit(checkedColumns);
  }

  const renderCheckbox = (name: string) => {
    const required = props.requiredColumns.has(name);
    const checked = checkedColumns.includes(name);

    return (
      <Checkbox
        key={name}
        name={name}
        checked={required || checked}
        disabled={required}
        onChange={() => onSelectItem(name)}
        label={name}
      />
    );
  };

  return (
    <Modal
      onSubmit={onSubmit}
      footerButtons={<Button type={'submit'}>Save preferences</Button>}
      close={props.close}
      show={props.show}
    >
      {availableColumns.map(renderCheckbox)}
    </Modal>
  );
};
