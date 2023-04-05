import {Business, createBusinessAccount, deleteBusinessAccount, getBusinessAccountById, updateBusinessAccount} from '../requests/business-account-requests';
import nock from 'nock';
import { connectUrl } from '../requests/types';

describe('Business Account Requests', () => {
    const url = connectUrl;
    let testBusinessAccount: Business;

    beforeAll(async () => {
        const testBusinessAccountData = {
            businessId: 1, 
            bin: '123456789', 
            ein: '123456789', 
            forProfit: true, 
            accountId: 1
        };
        testBusinessAccount = {...testBusinessAccountData};
    });

    test('should get business account by accountId', async () => {
        const accountId = 1;
        const expectedBusinessAccount = {...testBusinessAccount};
        nock(url)
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true',
        })
        .get(`/businesses/account/${accountId}`)
        .reply(200, expectedBusinessAccount);
        const businessAccount = await getBusinessAccountById(accountId);
        expect(businessAccount).toEqual(expectedBusinessAccount);
    });

    test('should add business account', async () => {
        const newBusinessAccount = {...testBusinessAccount};
        const expectedBusinessAccount = {...newBusinessAccount};
        nock(url)
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true',
        })
        .post('/businesses', newBusinessAccount)
        .reply(201, expectedBusinessAccount);
        const businessAccount = await createBusinessAccount(newBusinessAccount);
        expect(businessAccount).toEqual(expectedBusinessAccount);
    });

    test('should update business account', async () => {
        const updatedBusinessAccount = {...testBusinessAccount};
        const expectedBusinessAccount = {...updatedBusinessAccount};
        nock(url)
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true',
        })
        .persist()
        .options('/businesses')
        .reply(200);

        nock(url)
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true',
        })
        .put('/businesses', updatedBusinessAccount)
        .reply(200, expectedBusinessAccount);

        const businessAccount = await updateBusinessAccount(updatedBusinessAccount);
        expect(businessAccount).toEqual(expectedBusinessAccount);
    });

    test('should delete business account', async () => {
        const businessId = testBusinessAccount.businessId;
        nock(url)
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true',
        })
        .persist()
        .options(`/businesses/${businessId}`)
        .reply(200);

        nock(url)
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true',
        })
        .delete(`/businesses/${businessId}`)
        .reply(204);
        const deleted = await deleteBusinessAccount(businessId);
        expect(deleted).toBeTruthy();
    });
});