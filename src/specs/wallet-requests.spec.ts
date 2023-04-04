import { addWallet, deleteWallet, getWalletByAccountId, updateWallet, Wallet } from '../requests/wallet-requests';
import nock from "nock";



describe("Wallet API requests", () => { 
  const url = "http://127.0.0.1:8080"; 
  let testWallet: Wallet; 
  beforeAll(async () => { 
   const testWalletData = {balance: 100, accountId: 1 }; 
   testWallet = {walletId: 1, ...testWalletData}; 
  }); 
  test("should get wallet by account id", async () => { 
    const accountId = 1; 
    const expectedWallet = { 
      walletId:testWallet.walletId, 
      balance: 100, 
      accountId 
    }; 
    nock(url)
    .defaultReplyHeaders({ 
      'access-control-allow-origin': '*', 
      'access-control-allow-credentials': 'true' 
    }) 
    .get(`/wallet/${accountId}`)
    .reply(200, expectedWallet); 
    const wallet = await getWalletByAccountId(accountId); 
    expect(wallet).toEqual(expectedWallet); 
  }); 

  test("should add wallet", async () => { 
    const newWallet = { balance: 100, accountId: 1 }; 
    const expectedWallet = { walletId:testWallet.walletId, ...newWallet }; 
    nock(url) .defaultReplyHeaders({ 
      'access-control-allow-origin': '*', 
      'access-control-allow-credentials': 'true' 
    })
    .post("/wallets", newWallet)
    .reply(201, expectedWallet); 
    const wallet = await addWallet(newWallet); 
    expect(wallet).toEqual(expectedWallet); 
  }); 
      
  test("should update wallet", async () => { 
    const updatedWallet = { 
      walletId:testWallet.walletId, 
      balance: 200, 
      accountId: 1 
    }; 
    const expectedWallet = { ...updatedWallet }; 
    nock(url) .defaultReplyHeaders({ 
      'access-control-allow-origin': '*', 
      'access-control-allow-credentials': 'true' 
    }) 
    .persist()  
    .options('/wallet') 
    .reply(200); 

    nock(url) 
    .defaultReplyHeaders({ 
      'access-control-allow-origin': '*', 
      'access-control-allow-credentials': 'true' 
    }) 
    .put(`/wallet`, updatedWallet) 
    .reply(200, expectedWallet); 
    const wallet = await updateWallet(updatedWallet); 
    expect(wallet).toEqual(expectedWallet); 
  }); 

  test("should delete wallet", async () => { 
    const walletId = testWallet.walletId; 
    nock(url) 
    .defaultReplyHeaders({ 
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true' 
    }) 
    .persist()   
    .options('/wallets/1')
    .reply(200); 
    
    nock(url) 
    .defaultReplyHeaders({ 
      'access-control-allow-origin': '*', 
      'access-control-allow-credentials': 'true' 
    })
    .delete(`/wallets/${walletId}`)
    .reply(204); 
    const deleted = await deleteWallet(walletId); 
    expect(deleted).toBeTruthy(); 
  }); 
});
