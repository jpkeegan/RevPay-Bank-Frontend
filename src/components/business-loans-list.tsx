import { useNavigate } from "react-router";
import { BusinessLoan, getLoansByBusinessId } from "../requests/business-loan-requests"
import { useEffect, useState } from "react";
import { Business, getBusinessAccountById, getBusinessById } from "../requests/business-account-requests";

export function BusinessLoansList() {
    const router = useNavigate();
    const [businessLoans, setBusinessLoans] = useState<BusinessLoan[]>([]);
    const [businessAccount, setBusinessAccount] = useState<Business | null>(null);
  
    useEffect(() => {
      const accountId = localStorage.getItem("accountId");
  
      const fetchBusinessAccountAndLoans = async () => {
        const businessAccount = await getBusinessAccountById(Number(accountId));
        setBusinessAccount(businessAccount);
        const loans = await getLoansByBusinessId(businessAccount.businessId);
        setBusinessLoans(loans);
      };
  
      fetchBusinessAccountAndLoans();
    }, []);

    const handleLoanButton = () => {
        router("/loans")
    };

    return (
        <>
          {businessLoans.length === 0 ? (
            <p>You have no business loans</p>
          ) : (
            <ul>
              {businessLoans.map((loan) => (
                <li key={loan.loanId}>
                  Amount: {loan.amount} <br />
                  Summary: {loan.summary} <br />
                </li>
              ))}
            </ul>
          )}
      
          {businessAccount && (
            <button onClick={handleLoanButton}>Create Business Loan</button>
          )}
        </>
      );

}