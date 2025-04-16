interface ResultsCardProps {
    results: { text: string, value: number }[],
}

const ResultsCard: React.FC<ResultsCardProps> = ({ results }) => {
    return (
        <div className="bg-[#2d0606] text-white rounded-lg p-4 flex flex-col gap-y-1">
            {results.map((result, index) => {
                const isBold = index === 0 || index === 3 || index === 7;
                return (
                    <div key={result.text} className="flex justify-between gap-x-8 items-end">
                        <span className={isBold ? "font-bold" : "text-sm text-white/70"}>{result.text}</span>
                        <span className={isBold ? "font-bold" : "text-sm text-white/70"}>{result.value}€</span>
                    </div>
                );
            })}
        </div>
    );
}

export default ResultsCard;
