import {
  NavigationAside,
  NavigationBottom,
  Navbar,
  NavigationDrawer,
  SearchBar,
} from "./components/index";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "./features/bookmark/bookmarkSlice";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchBookmarks({ token: token }));
    }
  }, [token]);

  return (
    <div
      className="min-h-screen grid bg-blue-100
    grid-cols-1 grid-rows-[1fr_auto_1fr] 
    sm:grid-cols-[3fr_7fr] sm:grid-rows-[1fr_auto]
    lg:grid-cols-[2fr_5fr_3fr]"
    >
      <header className="sticky top-0 sm:col-start-1 sm:col-end-4 sm:row-start-1 sm:row-end-2">
        <Navbar />
      </header>

      <nav className="hidden sm:block sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-end-3">
        <NavigationDrawer />
      </nav>

      <nav
        className="hidden max-h-[calc(100vh-4rem)] sm:col-start-3 sm:col-end-4 sm:row-start-2 sm:row-end-3 lg:block
                      lg:row-start-2 row-end-3 m-4"
      >
        <div className="sticky top-[5rem]">
          <SearchBar />
        </div>
        <NavigationAside />
      </nav>

      <main className="min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-4rem)] ">
        <div className="lg:hidden m-2 sm:m-4">
          <SearchBar />
        </div>
        <div className="m-2 sm:m-4">
          <Outlet />
        </div>
      </main>

      <nav className="sticky bottom-0 sm:hidden row-start-3 row-end-4">
        <NavigationBottom />
      </nav>
    </div>
  );
}

export default App;
