import type { InputHTMLAttributes } from 'react';

type Props = {
  label: string;
  name: string;
  id?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Radio = (props: Props) => {
  const {
    label,
    name,
    id = name,
    disabled,
    defaultChecked,
    ...restProps
  } = props;

  return (
    <div className={'flex gap-2 items-center'}>
      <input
        {...restProps}
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        id={id}
        type="radio"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
