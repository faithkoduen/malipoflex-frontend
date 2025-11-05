interface Option {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function FilterDropdown({
  options,
  value,
  onChange,
  placeholder,
  className,
}: FilterDropdownProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label={placeholder}
      className={`min-w-[150px] border border-gray-300 rounded px-2 py-1 outline-none
        focus:border-[#075D74]
        ${value ? "text-[#F6A704]" : ""}
        ${className || ""}`}
      style={value ? { color: "#075D74" } : {}}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}