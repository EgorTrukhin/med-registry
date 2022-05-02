import "./SearchControl.css"

interface SearchControlProps {
  value: string;
  search: (text) => void;
}

export const SearchControl = (props: SearchControlProps) => {
  const {value, search} = props;
  return (
    <div className="search-control">
      <input 
        type="text" 
        placeholder="Поиск"
        value={value}
        onChange={event => search(event.target.value)}
      />
    </div>
  );
}