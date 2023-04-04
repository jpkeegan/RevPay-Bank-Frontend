
const url = "http://127.0.0.1:8080";

export type Wallet = {
    walletId: number,
    balance: number,
    accountId: number
};

export const getWalletByAccountId = async (id: number) => {
    const response = await fetch(`${url}/wallet/${id}`);
    const wallet = await response.json();
    return wallet;
};
export type AddWalletType = {
    balance: number,
    accountId: number
}
export const addWallet = async (newWallet: AddWalletType) => {
    const response = await fetch(`${url}/wallets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWallet)
    });
    const wallet = await response.json();
    return wallet;
};

export const updateWallet = async (updatedWallet: Wallet) => {
    const response = await fetch(`${url}/wallet/${updatedWallet.walletId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedWallet)
    });
    const wallet = await response.json();
    return wallet;
};

export const deleteWallet = async (id: number) => {
    const response = await fetch(`${url}/wallets/${id}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    });
    return response.ok;
};