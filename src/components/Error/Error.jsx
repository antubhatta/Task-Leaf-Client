import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import errorImage from '../../assets/icon/errorpage.jpg';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <img className="h-[300px] rounded-lg mb-6" src={errorImage} alt="" />
      <h2 className="text-4xl lg:text-6xl text-white font-bold mb-4">Oops! Something went wrong</h2>
      <p className="text-lg lg:text-xl text-white mb-8">
        We encountered an error while processing your request.
      </p>
      <p className="text-lg lg:text-xl text-white mb-8">
        Error message: {error.statusText || error.message}
      </p>
      <div className="flex justify-center">
        <Link to="/">
          <button className="text-lg lg:text-xl bg-white text-indigo-500 hover:bg-indigo-600 font-medium rounded-full px-8 py-4">
            Go to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
