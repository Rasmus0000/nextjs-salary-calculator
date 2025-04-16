interface CheckBoxProps {
  check: boolean;
  onChange: () => void;
  text: string;
  name: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({check, onChange, text, name}) => {

  return (
    <div className='flex justify-start gap-x-2'>
      <input type="checkbox" id={name} checked={check} aria-describedby={`${name}-checkbox`} onChange={onChange} className='accent-[#2d0606] cursor-pointer'/>
      <label htmlFor={name} className='text-sm'>{text}</label>
    </div>
  );
};

export default CheckBox;
