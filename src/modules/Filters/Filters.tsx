import { Input } from '../../components/Input.tsx';
import { Button } from '../../components/Button.tsx';
import type { FormEvent } from 'react';
import type { FilterModel } from './Filters.types.ts';
import { Radio } from '../../components/Radio.tsx';

type Props = {
  onSubmmit: (searchParams: FilterModel) => void;
  defaultFilters: FilterModel;
};

const years: number[] = new Array(274).fill(0).map((_, i) => i + 1750);

export function Filters(props: Props) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const formModel = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          [key]: value instanceof File ? [value] : value,
        };
      },
      {}
    ) as FilterModel;

    props.onSubmmit(formModel);
  }

  return (
    <form className={'flex flex-col gap-3 items-start'} onSubmit={onSubmit}>
      <div className={'flex items-end gap-2'}>
        <Input label={'Search by country'} name={'country'} />
        <select
          className={
            'min-h-10 bg-white border border-gray-300 rounded outline-none ' +
            'hover:border-gray-400 focus-visible:border-gray-900 px-4 p-y2 ' +
            'dark:bg-neutral-800 dark:border-gray-800 dark:focus-visible:bg-neutral-950 dark:focus-visible:border-pink-400'
          }
          defaultValue={props.defaultFilters.year}
          name={'year'}
        >
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <fieldset>
          <legend>Sort direction</legend>
          <Radio
            label={'Ascending'}
            name={'sortDirection'}
            id={'sortDirection-asc'}
            value={'asc'}
          />
          <Radio
            label={'Descending'}
            name={'sortDirection'}
            id={'sortDirection-desc'}
            value={'desc'}
          />
          <Radio
            label={'None'}
            name={'sortDirection'}
            id={'sortDirection-none'}
            value={'none'}
          />
        </fieldset>
        <fieldset>
          <legend>Sort field</legend>
          <Radio
            label={'Name'}
            name={'columnSort'}
            id={'columnSort-name'}
            value={'country'}
          />
          <Radio
            label={'Population'}
            name={'columnSort'}
            id={'columnSort-population'}
            value={'population'}
          />
          <Radio
            label={'None'}
            name={'columnSort'}
            id={'columnSort-none'}
            value={'none'}
          />
        </fieldset>
      </div>
      <Button type={'submit'}>Apply changes</Button>
    </form>
  );
}
