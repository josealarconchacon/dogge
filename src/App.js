import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import FormBuilder from "./components/FormBuilder";
import Preview from "./components/Preview";
import SavedCards from "./components/SavedCards";
import Share from "./components/Share";
import { DoggeCardProvider } from "./context/DoggeCardContext";

function App() {
  return (
    <DoggeCardProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/builder" replace />} />
              <Route path="/builder" element={<FormBuilder />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/saved" element={<SavedCards />} />
              <Route path="/share/:cardId" element={<Share />} />
              <Route path="*" element={<Navigate to="/builder" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DoggeCardProvider>
  );
}

export default App;
