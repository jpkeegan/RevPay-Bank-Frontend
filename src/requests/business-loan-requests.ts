import { connectUrl } from "./types";

export type BusinessLoan = {
    loanId: number,
    amount: number,
    summary: string,
    businessId: number
};

export type BusinessLoanForm = {
    amount: number,
    summary: string,
    businessId: number
}

const url = connectUrl;

export async function createBusinessLoan(newBusinessLoan: BusinessLoanForm): Promise<BusinessLoan> {
    const httpResponse = await fetch(url + "/businessloans", {
        method: "POST",
        body: JSON.stringify(newBusinessLoan),
        headers: {
            "Content-Type":"application/json"
        }
    });

    const businessLoan: BusinessLoan = await httpResponse.json();
    return businessLoan;
}

export async function getAllBusinessLoans(): Promise<BusinessLoan[]> {
    const httpResponse = await fetch(url + "/businessloans");
    const businessLoans: BusinessLoan[] = await httpResponse.json();
    return businessLoans;
}

export async function getBusinessLoanById(businessLoanId: number): Promise<BusinessLoan> {
    const httpResponse = await fetch(url + "/businessloans/" + businessLoanId);
    const businessLoan: BusinessLoan = await httpResponse.json();
    return businessLoan;
}

export async function updateBusinessLoan(businessLoan: BusinessLoan): Promise<BusinessLoan> {
    const httpResponse = await fetch(url + "/businessloans", {
        method: "PUT",
        body: JSON.stringify(businessLoan),
        headers: {
            "Content-Type":"application/json"
        }
    });
    const updatedBusinessLoan: BusinessLoan = await httpResponse.json();
    return updatedBusinessLoan;
}

export async function deleteBusinessLoan(businessLoanId: number): Promise<boolean> {
    const httpResponse = await fetch(url + "/businessloans/" + businessLoanId, {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        }
    });
    const bool: boolean = await httpResponse.json();
    return bool;
}

export async function getLoansByBusinessId(businessId: number): Promise<BusinessLoan[]> {
    const httpResponse = await fetch(url + "/businessloans/business/" + businessId);
    const businessLoans: BusinessLoan[] = await httpResponse.json();
    return businessLoans;
};