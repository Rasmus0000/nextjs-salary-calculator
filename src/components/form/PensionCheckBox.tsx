'use client'
import React, { useState } from 'react';
import CheckBox from './CheckBox';
import PensionPercentSelect from './PensionPercentSelect';

interface PensionCheckBoxProps {
  value: 2|4|6|false;
  onChange: (value: 2|4|6|false) => void;
  text: string;
  name: string;
}

const PensionCheckBox: React.FC<PensionCheckBoxProps> = ({value, onChange, text, name}) => {

  const [percentage, setPercentage] = useState<2|4|6>(2);

  const handleCheckBoxToggle = () => {
    if (value !== false) {
      onChange(false);
    } else {
      onChange(percentage);
    }
  }

  const handlePercentChange = (value: number) => {
    const validValue = value === 2 || value === 4 || value === 6 ? value : 2;
    setPercentage(validValue);
    onChange(validValue);
  };
  

  return (
    <div className='flex flex-col gap-y-2'>
    <CheckBox check={value !== false} onChange={handleCheckBoxToggle} text={text} name={name}/>
    {value !== false && <PensionPercentSelect value={value} options={[2,4,6]} onChange={handlePercentChange} name='kogumispensioni-protsent'/>}
    </div>
  );
};

export default PensionCheckBox;
