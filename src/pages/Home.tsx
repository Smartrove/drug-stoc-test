import { useEffect, useState } from "react";
import Input from "../components/UI/Input";
import { useGetBooksQuery } from "../redux/api/apiSlice";
import Pagination from "../components/UI/Pagination";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState("");
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [bookList, setBookList] = useState<any[]>([]);

  const booksPerPage = 20;

  const navigate = useNavigate();
  const { data, error, isLoading } = useGetBooksQuery(
    query
      ? `${query}&startIndex=${
          (page - 1) * booksPerPage
        }&maxResults=${booksPerPage}`
      : "",
    {
      skip: query === null,
    }
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooks(e.target.value);
  };

  const handleNavigation = (book: any) => {
    navigate("/bookdetails", { state: book });
  };
  const handleSearch = () => {
    setPage(1);
    setBookList([]);
    setQuery(books);
  };

  const handleClear = () => {
    setBooks("");
    setQuery(null);
    setPage(1);
    setBookList([]);
  };

  const shortTitle = (title: string | undefined) => {
    if (!title) return null;
    return title.length > 50 ? title.substring(0, 50) + "..." : title;
  };

  const totalPages = data ? Math.ceil(data?.totalItems / booksPerPage) : 0;

  useEffect(() => {
    if (data && data?.items) {
      setBookList((prevBooks) => {
        const newBooks = data?.items.filter(
          (item) => !prevBooks.some((prevItem) => prevItem.id === item.id)
        );
        return [...newBooks];
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Input
        placeholder="Search book"
        name="book"
        onChange={onChange}
        type="text"
        value={books}
        className="border p-2 rounded-md"
      />

      <div className="relative left-[80px] md:left-[280px] bottom-[25px] cursor-[pointer]">
        <img
          src="/assets/Shortcut.svg"
          width={16}
          height={16}
          alt=""
          onClick={handleClear}
        />
      </div>
      {books === "" ? (
        <button className="mt-2 border p-1" disabled>
          Search
        </button>
      ) : (
        <button className="border mt-2 p-2 rounded-md" onClick={handleSearch}>
          Search
        </button>
      )}
      {isLoading && (
        <img
          src="/assets/spinner.png"
          width={30}
          height={30}
          alt="spinner"
          className="mt-4 animate-spin"
        />
      )}
      {/* handle loading error */}
      {error && (
        <div className="mt-4 text-red-500">
          <p className="text-xs">
            Error loading {books} books. Please try again.
          </p>
        </div>
      )}
      {bookList.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Your Search Result</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 grid-rows-3 mt-2 ">
            {bookList?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col border rounded-md cursor-[pointer]"
                onClick={() => handleNavigation(item)}
              >
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={item?.volumeInfo?.imageLinks?.thumbnail}
                    className="w-[250px] h-[300px]"
                    alt="image"
                  />
                  <p className="text-xs mt-[5px] w-[200px]">
                    {shortTitle(
                      item.volumeInfo.title ?? <p className="text-xs"></p>
                    )}
                  </p>
                  <p className="font-semibold mt-[5px] w-[150px]">
                    {shortTitle(item?.volumeInfo?.authors?.join(", "))}
                  </p>
                  <p className="text-xs font-medium">
                    {item?.volumeInfo?.publishedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!data?.items ? null : (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage: any) => setPage(newPage)}
        />
      )}
    </div>
  );
};

export default Home;
