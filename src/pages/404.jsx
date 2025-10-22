import { Link, useNavigate } from "react-router";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-9xl font-semibold text-sky-600">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button onClick={() => navigate("/")} className="btn">
              Go back home
            </button>
            <Link href="#" className="btn link">
              Contact support
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
