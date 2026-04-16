import { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';

interface StepButtonProps {
  label?: string;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function StepButtonPrime({
  label = 'MV GAP',
  value,
  step = 0.01,
  min,
  max,
  onChange,
}: StepButtonProps) {
  const [internalValue, setInternalValue] = useState<number>(value ?? 0.01);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value! : internalValue;

  const clamp = (val: number) => {
    if (min !== undefined && val < min) return min;
    if (max !== undefined && val > max) return max;
    return val;
  };

  const updateValue = (val: number | null) => {
    if (val === null || isNaN(val)) return;

    const newVal = parseFloat(clamp(val).toFixed(2));

    if (!isControlled) {
      setInternalValue(newVal);
    }

    onChange?.(newVal);
  };

  const increment = () => updateValue(currentValue + step);
  const decrement = () => updateValue(currentValue - step);

  return (
    <div className="flex items-center bg-green-500 rounded-full px-4 py-2 gap-3 w-fit">
      <span className="font-semibold text-black tracking-wide">{label}</span>

      <div className="flex items-stretch border-2 border-black bg-white overflow-hidden">
        <InputNumber
          value={currentValue}
          onValueChange={(e) => updateValue(e.value)}
          min={min}
          max={max}
          step={step}
          mode="decimal"
          minFractionDigits={2}
          maxFractionDigits={2}
          useGrouping={false}
          inputClassName="w-20 text-center outline-none border-0"
        />

        <div className="flex flex-col border-l-2 border-black">
          <button type="button" onClick={increment} className="px-2 leading-none hover:bg-gray-200">
            ▲
          </button>
          <button type="button" onClick={decrement} className="px-2 leading-none hover:bg-gray-200">
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}
