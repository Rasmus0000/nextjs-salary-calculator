interface AmountProps {
  amount: number;
  onChange: (value: number) => void;
}

const AmountInput: React.FC<AmountProps> = ({ onChange }) => {
  return (
    <div className="w-full relative flex items-center">
      <input
        className="w-full bg-gray-100 pl-8 py-1.5 rounded-lg text-lg focus:outline-0 focus:bg-gray-200"
        type="number"
        inputMode="numeric"
        id="amount"
        aria-describedby="amount-currency"
        placeholder="0.00"
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <span className="absolute left-2 font-bold text-gray-500">€</span>
    </div>
  );
};

export default AmountInput;
