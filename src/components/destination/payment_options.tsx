type PaymentOptionProps = {
  value: string;
  title: string;
  discountText?: string;
  description?: string;
  payTodayText: string;
  checked: boolean;
  onChange: () => void;
};

const PaymentOption: React.FC<PaymentOptionProps> = ({
  value,
  title,
  discountText,
  description,
  payTodayText,
  checked,
  onChange,
}) => {
  return (
    <label
      className={`cursor-pointer block border rounded-xl p-4 transition
        ${checked ? "border-primary bg-primary/5" : "border-gray-300"}
      `}
    >
      <div className="flex items-start gap-3">
        <input
          type="radio"
          name="paymentPlan"
          value={value}
          checked={checked}
          onChange={onChange}
          className="mt-1"
        />

        <div>
          <p className="font-semibold leading-none">
            {title}
            {discountText && (
              <span className="text-green-700 ml-1">
                {discountText}
              </span>
            )}
          </p>

          {description && (
            <p className="text-xs text-gray-600 mt-1">
              {description}
            </p>
          )}

          <p className="text-sm font-medium mt-1">
            {payTodayText}
          </p>
        </div>
      </div>
    </label>
  );
};

export default PaymentOption;
