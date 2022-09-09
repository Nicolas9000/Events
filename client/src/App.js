import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import EventDetail from "./pages/Event/EventDetail";
import Authentification from "./pages/Auth/Authentification";
import UserProfile from "./pages/User/UserProfile";
import MainHome from "./pages/Home/MainHome";
import EventSortie from "./pages/Event/EventSortie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Authentification />} />

        <Route path="/" element={<MainHome />}>
          <Route path="/" element={<Home />} />
          <Route path="/event/:record_id" element={<EventDetail />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/eventSortie/:id" element={<EventSortie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
