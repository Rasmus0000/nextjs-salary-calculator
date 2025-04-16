interface SelectProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
  name: string;
}

const PensionPercentSelect: React.FC<SelectProps> = ({value, onChange, options, name}) => {

  return (
      <select
      className='appearance-none border text-sm focus:outline-0 ml-5 py-1 px-3 rounded-sm w-1/3'
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {`${opt}%`}
          </option>
        ))}
      </select>
  );
};

export default PensionPercentSelect;
