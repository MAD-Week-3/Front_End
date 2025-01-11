interface DropdownProps {
    options: string[];
    onSelect: (value: string) => void;
  }
  
  export default function Dropdown({ options, onSelect }: DropdownProps) {
    return (
      <select onChange={(e) => onSelect(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  