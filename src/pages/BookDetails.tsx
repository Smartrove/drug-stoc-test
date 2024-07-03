import { useLocation, useNavigate } from "react-router-dom";

const BookDetails = () => {
  const location = useLocation();
  const book = location.state;

  const navigate = useNavigate();

  if (!book) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xs">No book data available.</p>
        <button
          className="border rounded mt-4 p-1"
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-start max-w-[800px] mx-auto min-h-screen p-4">
      <div className="flex gap-8 justify-start items-start">
        <div>
          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt="Book Thumbnail"
            className="w-[250px] h-[250px] object-cover"
          />
        </div>
        <div className="text-left">
          <button
            className="border rounded mt-4 p-1 text-xs"
            onClick={() => navigate("/")}
          >
            &larr; Home
          </button>
          <h2 className="text-lg font-bold mt-4">{book.volumeInfo.title}</h2>
          <p className="font-semibold mt-2">
            {book.volumeInfo.authors?.join(", ")}
          </p>
          <div className="mt-8">
            <p className="text-xs font-medium">
              Published by: {book.volumeInfo.publisher}
            </p>
            <p className="text-xs font-medium mt-2">
              Publication date: {book.volumeInfo.publishedDate}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-left font-[Montserrat] text-xs leading-loose">
        {book.volumeInfo.description}
      </p>
    </div>
  );
};

export default BookDetails;
