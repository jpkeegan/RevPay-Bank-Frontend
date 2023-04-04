
import nock from "nock";
import { TransactionFormState } from "../reducers/transaction-form-reducer";
import { createTransaction, deleteTransaction, editTransaction, getTransactionById } from "../requests/transaction-requests";

/*

describe("Transaction API requests", () => {
    const url = "http://127.0.0.1:8080";

    let testTransaction: TransactionFormState;
  
    beforeAll(async () => {
      const testTransactionData = { transactionId: "1", amount: "400", send: true, accountId: "1", senderAccountId: 2, accountEmail: "asd@gmail.com", dateTime: "1" };
      nock(url)
        .post("/transaction")
        .reply(201, { ...testTransactionData });
  
      testTransaction = await createTransaction(testTransactionData);
    });
  
    afterAll(async () => {
      nock(url).delete(`/transaction/${testTransaction.transactionId}`).reply(200);
      await deleteTransaction(Number(testTransaction.transactionId));
    });
  
    test("getTransactionbyid", async () => {
      const expectedTransaction = { transactionId: "1", amount: "400", send: true, accountId: "1",senderAccountId: 2, accountEmail: "asd@gmail.com", dateTime: "1" };
      nock(url).get("/transaction/1").reply(200, expectedTransaction);
  
      const transaction = await getTransactionById(1);
  
      expect(transaction).toEqual(expectedTransaction);
    });
  
    test("create transaction", async () => {
      const newTransaction = { transactionId: "2", amount: "800", send: true, accountId: "2", senderAccountId: 2, accountEmail: "asd@gmail.com", dateTime: "1" };
      const expectedTransaction = {...newTransaction };
      nock(url).post("/transaction", newTransaction).reply(201, expectedTransaction);
  
      const transaction = await createTransaction(newTransaction);
  
      expect(transaction).toEqual(expectedTransaction);
    });

    test("should update wallet", async () => {
        const updatedTransaction = { transactionId: "1", amount: "1600", send: true, accountId: "2", senderAccountId: 2, accountEmail: "asd@gmail.com", dateTime: "1" };
        const expectedTransaction = {...updatedTransaction };
        nock(url)
          .put(`/transaction/${updatedTransaction.transactionId}`, updatedTransaction)
          .reply(200, expectedTransaction);
    
        const transaction = await editTransaction(updatedTransaction);
    
        expect(transaction).toEqual(expectedTransaction);
      });
    
      test("should delete wallet", async () => {
        
        nock(url).delete(`/wallets/1}`).reply(204);
    
        const deleted = await deleteTransaction(1);
    
        expect(deleted).toBeTruthy();
      });
});
*/