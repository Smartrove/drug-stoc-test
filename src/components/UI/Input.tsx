const Input = ({
  label,
  type,
  value,
  onChange,
  name,
  error,
  touched,
  fieldProps,
  placeholder,
  accept,
  disabled,
  defaultValue,
  className,
}: {
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: any;
  error?: string;
  touched?: any;
  fieldProps?: any;
  placeholder?: string;
  accept?: string;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
}) => {
  const inputBorderColor = touched && error ? "input-error" : "";
  return (
    <div className="flex w-full justify-center items-center flex-col gap-2">
      {label && <p className="font-bold text-sm">{label}</p>}
      <label
        className={`input input-md input-bordered w-2/4 rounded-[4px] flex justify-center items-center gap-2 ${inputBorderColor}`}
      >
        <input
          disabled={disabled}
          name={name}
          onChange={onChange}
          type={type}
          value={value}
          defaultValue={defaultValue}
          accept={accept}
          dateFormat="dd-MM-yyyy"
          className={`grow text-sm ${className}`}
          {...fieldProps}
          placeholder={placeholder}
        />
      </label>
      {touched && error && (
        <div className="text-error flex gap-1 justify-left items-center">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
