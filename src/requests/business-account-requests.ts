import { connectUrl } from "./types";

  
export type Business = {
  businessId: number;
  bin: string;
  ein: string;
  forProfit: boolean;
  accountId: number;
};
  
const url = connectUrl;
  
export async function createBusinessAccount(businessAccount: Business): Promise<Business> {
  const response = await fetch(`${url}/businesses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(businessAccount),
  });
  const business = await response.json();
  return business;
};
  
export async function getBusinessAccountById(id: number): Promise<Business> {
  const response = await fetch(`${url}/businesses/account/${id}`);
  const business = await response.json();
  return business;
};

export async function getBusinessById(id: number): Promise<Business> {
  const response = await fetch(`${url}/businesses/${id}`);
  const business = await response.json();
  return business;
};
  
export async function updateBusinessAccount(business: Business): Promise<Business> {
  const response = await fetch(`${url}/businesses`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(business),
  });
  const updatedBusiness = await response.json();
  return updatedBusiness;
};
  
export async function deleteBusinessAccount(id: number): Promise<boolean> {
  const response = await fetch(`${url}/businesses/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  });
  return response.ok;
};