import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <div className="flex">
      <input
        className="w-full p-1"
        placeholder="Search Posts, People, anything"
      />
      <button className="p-2 border-blue-400 bg-blue-200 hover:opacity-75">
        <SearchIcon />
      </button>
    </div>
  );
};

export { SearchBar };
