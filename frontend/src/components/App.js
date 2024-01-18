import GlobalStyles from "./GlobalStyles";
import Profile from "./Profile";
import Header from "./Header";
import TopAnimes from "./TopAnimes";
import HomePage from "./HomePage";
import SeasonalAnime from "./SeasonalAnime";
import AnimeDetails from "./AnimeDetails";
import Library from "./Library";
import SearchResult from "./SearchResult";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
 return (
  <BrowserRouter>
   <GlobalStyles />
   <Header />
   <Routes>
    <Route path="/Profile" element={<Profile />}></Route>
    <Route path="/TopAnimes" element={<TopAnimes />}></Route>
    <Route path="/SeasonalAnime" element={<SeasonalAnime />}></Route>
    <Route path="/" element={<HomePage />}></Route>
    <Route path="/Anime/:mal_id" element={<AnimeDetails />}></Route>
    <Route path="/Library" element={<Library />}></Route>
    <Route
     path="/Anime/SearchResult/:searchedInfo"
     element={<SearchResult />}
    ></Route>
   </Routes>
  </BrowserRouter>
 );
};

export default App;
