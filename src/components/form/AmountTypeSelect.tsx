type OptionType = 'bruto' | 'neto' | 'tooandjakulu';

interface RadioProps {
    name: string,
    value: string,
    onChange: (option: OptionType) => void,
}

const inputOptions: {value: string, label: string}[] = [ 
    {value: 'bruto', label: 'Brutopalk'},
    {value: 'neto', label: 'Netopalk'},
    {value: 'tooandjakulu', label: 'Tööandja kulu'},
];

const AmountTypeSelect: React.FC<RadioProps> = ({name, value, onChange}) => {
    return (
        <div className="flex w-full">
        {inputOptions.map(option => (
            <div key={option.value}>
                <input type="radio"
                className="peer sr-only"
                value={option.value}
                id={name + option.value}
                checked={value === option.value}
                onChange={e => onChange(e.target.value as OptionType)}
                /> <label htmlFor={name + option.value} className="flex py-2 px-4 border-b border-[#2d0606]/60 cursor-pointer text-sm peer-checked:border-b-2 peer-checked:border-[#2d0606]">{option.label}</label>
            </div>
        ))}
        </div>
    )
}

export default AmountTypeSelect;