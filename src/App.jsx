import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
 import { Provider } from "react-redux"
 import store from "./store";

export default function App() {
  return (
      <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="*" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter >
  </Provider>
  );
}