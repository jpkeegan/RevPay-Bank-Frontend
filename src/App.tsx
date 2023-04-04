import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddBusinessPage } from './pages/add-business';
import { BankAccountForm } from './pages/bank-account-form';
import { HomePage } from './pages/home-page';
import { LogOut } from './pages/log-out-page';
import { PayRequestPage } from './pages/pay-request-page';
import { PersonalRegistrationPage } from './pages/personal-account-registration-page';
import { SignInPage } from './pages/sign-in-page';
import { WalletPage } from './pages/wallet-page';
import { AccountSettings } from './pages/account-settings';
import { BusinessPage } from './pages/business-page';
import { CreateBusinessLoanPage } from './pages/create-business-loan-page';
import { UpdateBusinessPage } from './pages/update-business-page';
import { AddMoneyToWalletPage } from './pages/add-money-to-wallet-page';
import { PasswordResetPage } from './pages/password-reset-page';

const queryClient = new QueryClient();

function App() {
  return <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>

          <Route path={'/transaction'} element={<PayRequestPage />} />
          <Route path={'/home'} element={<HomePage />} />
          <Route path={'/business/new'} element={<AddBusinessPage />} />
          <Route path={'/business/:id'} element={<UpdateBusinessPage />} />
          <Route path={'/businesses/:id'} element={<BusinessPage />} />
          <Route path={'/'} element={<SignInPage />} />
          <Route path={'/registration'} element={<PersonalRegistrationPage />} />
          <Route path={'/loan'} element={<CreateBusinessLoanPage />} />
          <Route path={'/wallet'} element={<WalletPage />} />
          <Route path={'/wallet/add'} element={<AddMoneyToWalletPage />} />
          <Route path='/logout' element={<LogOut />} />
          <Route path='/settings' element={<AccountSettings />} />
          <Route path={'/bankaccount/add'} element={<BankAccountForm />} />
          <Route path={'/passwordreset'} element={<PasswordResetPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </>
}

export default App;
