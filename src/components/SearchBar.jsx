function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="search-box">

      <input
        type="text"
        placeholder="🔍 Search by Name, Email or Department..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

    </div>
  );
}

export default SearchBar;