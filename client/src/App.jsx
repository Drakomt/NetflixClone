import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import InfoPage from "./pages/InfoPage/InfoPage";
import WatchPage from "./pages/WatchPage/WatchPage";
import SearchPage from "./pages/SearchPage/SearchPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<HomePage type="movies" />} />
          <Route path="/series" element={<HomePage type="series" />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
