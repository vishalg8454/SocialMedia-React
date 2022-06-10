import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <div className="flex rounded">
      <input
        className="w-full p-1 pl-4 outline-none rounded-l dark:bg-slate-500"
        placeholder="Search Posts, People, anything"
      />
      <button className=" rounded-r p-2 border-blue-400 bg-blue-200 hover:opacity-75">
        <SearchIcon />
      </button>
    </div>
  );
};

export { SearchBar };
