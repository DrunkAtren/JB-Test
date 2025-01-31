import {test, expect} from '@playwright/test';
import { DepartmentFinancesAPI } from "../../../functions/DepartmentFinancesAPI"

import fs from 'fs'

let tokenValueADMIN
const data = JSON.parse(fs.readFileSync('data/API/APIdata.json', 'utf-8'));

test.describe('Authorized', () => {
    test.beforeEach("Token Auth", async ({ request }) => {
        const query = new DepartmentFinancesAPI(request);
        const accessToken = await query.PostAuthRequest(data.AuthAdmin)
        tokenValueADMIN = accessToken        
    });

    test.describe('Functional', () => {
        test.describe('GET', () => {
            test('Get',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/Get");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            for (const id of data.EstimatedExpenseServiceID) {
                test('Get by ID = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/Get?id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            };

            test('GetAll',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetAll");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            test('GetEstimatedExpenseHistory',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            for (const id of data.EstimatedExpenseServiceID) {
                test('GetEstimatedExpenseHistory by subAccountId = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?subAccountId="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            };

            for (const id of data.EstimatedExpenseServiceID) {
                test('GetEstimatedExpenseHistory by group = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?group="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            };

            for (const id of data.EstimatedExpenseServiceID) {
                for (const id2 of data.EstimatedExpenseServiceGROUP) 
                test('GetEstimatedExpenseHistory by subAccountId = ' + id + " and group = " + id2,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?subAccountId=" + id + "&group="+ id2);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            };

            test('GetGroupsForSubAccount',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetGroupsForSubAccount");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            for (const id of data.EstimatedExpenseServiceSUBACCOUNTID) {
                test('GetGroupsForSubAccount by subAccountId = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetGroupsForSubAccount?subAccountId="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            };

            test('GetLatestEstimatedExpensesForSubAccount',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetLatestEstimatedExpensesForSubAccount");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            for (const id of data.EstimatedExpenseServiceSUBACCOUNTID) {
                test('GetLatestEstimatedExpensesForSubAccount by subAccountId = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetLatestEstimatedExpensesForSubAccount?subAccountId="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            };
        });
        test.describe('POST', () => {
            //Subaccountid statyczne 15, jak bedzie wywalac błąd to przez brak takiego subaccount prawdopodobnie
            test("Create", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/Create",data.EstimatedExpenseServicePOSTDATA );
                const body = status[1] 
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
            });   
        });

        test.describe('PUT', () => {
            test('Put with template 1', async({request}) =>{
                const query = new DepartmentFinancesAPI(request);   
                    const post_status = await query.PostRequest(tokenValueADMIN, "services/app/EstimatedExpenseService/Create", data.EstimatedExpenseServicePUTPOSTDATA);
                    const body = post_status[1]
                    expect(post_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body);
                    const put_status = await query.PutRequest(tokenValueADMIN, "services/app/EstimatedExpenseService/UpdateOrAddMany?group=101", 
                    [{
                        "group": 101,
                        "amount": 40000,
                        "subAccountId": 15,
                        "costTypeId": 1
                    }],);
                    const body2 = put_status[1]
                    expect(put_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body2);
            }); 
        }); 
    });
    test.describe('Validation', () => {
        test.describe('GET', () => {
            test('Get by ID = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/Get?id=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });

            test('GetEstimatedExpenseHistory by subAccountId = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?subAccountId=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });

            test('GetEstimatedExpenseHistory by group = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?group=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });

            test('GetEstimatedExpenseHistory by subAccountId = empty and group = empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?subAccountId=&group=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });

            test('GetGroupsForSubAccount by subAccountId = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetGroupsForSubAccount?subAccountId=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });

            test('GetLatestEstimatedExpensesForSubAccount by subAccountId = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetLatestEstimatedExpensesForSubAccount?subAccountId=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });

            for (const id of data.ValidationIDDATA) {
                test('Get by ID = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/Get?id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            };

            for (const id of data.ValidationIDDATA) {
                test('GetEstimatedExpenseHistory by subAccountId = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?subAccountId="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            };

            for (const id of data.ValidationSTRINGDATA) {
                test('GetEstimatedExpenseHistory by group = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?group="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            };

            for (const id of data.ValidationIDDATA) {
                for (const id2 of data.ValidationSTRINGDATA) 
                test('GetEstimatedExpenseHistory by subAccountId = ' + id + " and group = " + id2,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?subAccountId=" + id + "&group="+ id2);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            };

            for (const id of data.ValidationIDDATA) {
                test('GetGroupsForSubAccount by subAccountId = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetGroupsForSubAccount?subAccountId="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            };

            for (const id of data.ValidationIDDATA) {
                test('GetLatestEstimatedExpensesForSubAccount by subAccountId = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetLatestEstimatedExpensesForSubAccount?subAccountId="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            };
        });
    });
});

test.describe('Unauthorized', () => {
    test.describe('GET', () => {
        test('Get',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/Get");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        for (const id of data.EstimatedExpenseServiceID) {
            test('Get by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/Get?id="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        };

        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetAll");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        test('GetEstimatedExpenseHistory',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        for (const id of data.EstimatedExpenseServiceID) {
            test('GetEstimatedExpenseHistory by subAccountId = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?subAccountId="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        };

        for (const id of data.EstimatedExpenseServiceID) {
            test('GetEstimatedExpenseHistory by group = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?group="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        };

        for (const id of data.EstimatedExpenseServiceID) {
            for (const id2 of data.EstimatedExpenseServiceGROUP) 
            test('GetEstimatedExpenseHistory by subAccountId = ' + id + " and group = " + id2,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetEstimatedExpenseHistory?subAccountId=" + id + "&group="+ id2);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        };

        test('GetGroupsForSubAccount',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetGroupsForSubAccount");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        for (const id of data.EstimatedExpenseServiceSUBACCOUNTID) {
            test('GetGroupsForSubAccount by subAccountId = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetGroupsForSubAccount?subAccountId="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        };

        test('GetLatestEstimatedExpensesForSubAccount',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetLatestEstimatedExpensesForSubAccount");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        for (const id of data.EstimatedExpenseServiceSUBACCOUNTID) {
            test('GetLatestEstimatedExpensesForSubAccount by subAccountId = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/GetLatestEstimatedExpensesForSubAccount?subAccountId="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        };
    });
    test.describe('POST', () => {
        //Subaccountid statyczne 15, jak bedzie wywalac błąd to przez brak takiego subaccount prawdopodobnie
        test("Create", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/EstimatedExpenseService/Create",data.EstimatedExpenseServicePOSTDATA );
            const body = status[1] 
            expect(status[0]).toBe(data.STATUS_NONAUTHORIZED);
            console.log(body);
        });   
    });

    test.describe('PUT', () => {
        test('Put with template 1', async({request}) =>{
            const query = new DepartmentFinancesAPI(request);   
                const post_status = await query.PostRequest(tokenValueADMIN, "services/app/EstimatedExpenseService/Create", data.EstimatedExpenseServicePUTPOSTDATA);
                const body = post_status[1]
                expect(post_status[0]).toBe(data.STATUS_NONAUTHORIZED);
                console.log(body);
                const put_status = await query.PutRequest(tokenValueADMIN, "services/app/EstimatedExpenseService/UpdateOrAddMany?group=101", 
                [{
                    "group": 101,
                    "amount": 40000,
                    "subAccountId": 15,
                    "costTypeId": 1
                }],);
                const body2 = put_status[1]
                expect(put_status[0]).toBe(data.STATUS_NONAUTHORIZED);
                console.log(body2);
        }); 
    }); 
});