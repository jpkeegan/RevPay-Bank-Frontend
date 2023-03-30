import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddBusinessPage } from './pages/add-business';
import { HomePage } from './pages/home-page';
import { PersonalRegistrationPage } from './pages/personal-account-registration-page';
import { SignInPage } from './pages/sign-in-page';

const queryClient = new QueryClient();

function App() {
  return <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomePage/>}/>
          <Route path={'/business/new'} element={<AddBusinessPage/>}/>
          <Route path={'/login'} element={<SignInPage/>}/>
          <Route path={'/registration'} element={<PersonalRegistrationPage/>}/>
          {/* <Route path={'/loan'} element={<CreateBusinessLoanPage/>}/> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </>
}

export default App;
