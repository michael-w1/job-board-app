// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import Jobs from "./pages/Jobs.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import EditJobPost from "./pages/EditJobPost.tsx"


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthCallbackPage from './pages/AuthCallBackPage.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


function App() {
  return (
    <div>
      <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route path="/" element={<Jobs />} />
            <Route path="/jobs" element={<Jobs />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> */}
            {/* <Route path="/editjobpost" element={<EditJobPost />} /> */}
            <Route path="/auth-callback" element = {<AuthCallbackPage />} />
          </Routes>
        </Auth0ProviderWithNavigate>
        </QueryClientProvider>
      </Router>
    </div>



  )
}

export default App

