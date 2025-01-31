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
            for (const id of data.DonationServiceID) {
                test('Get by ID = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DonationService/Get?id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            };

            test('GetAll',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DonationService/GetAll");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            for (const years of data.DonationServiceYEAR) {
                test('GetAllIn = ' + years,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DonationService/GetAllIn?year="+ years);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })}
        });

        test.describe('POST', () => {
            //Subaccountid statyczne 15, jak bedzie wywalac błąd to przez brak takiego subaccount prawdopodobnie
            test('Create with description "' + data.DonationServicePOSTDATA.description + "'", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/DonationService/Create",data.DonationServicePOSTDATA );
                const body = status[1] 
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
            });
        }); 
        
        test.describe('PUT', () => {
            test('Put with template 1', async({request}) =>{
                const query = new DepartmentFinancesAPI(request);   
                    const post_status = await query.PostRequest(tokenValueADMIN, "services/app/DonationService/Create", data.DonationServicePOSTDATA);
                    const body = post_status[1]
                    expect(post_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body);
                    const id = body.result
                    const put_status = await query.PutRequest(tokenValueADMIN, "services/app/DonationService/Update", 
                    {
                        "subAccountId": 15,
                        "amount": 200,
                        "description": "PutTEST",
                        "id": id
                    },);
                    const body2 = put_status[1]
                    expect(put_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body2);
            }); 
        }); 
    })
    test.describe('Validation', () => {
        test.describe('GET', () => {
            test('Get by ID = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DonationService/Get?id=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });  
            
            test('GetAllIn = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DashboardService/GetInYear?year=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });

            for (const id of data.ValidationIDDATA) {
                test('Get by ID = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DonationService/Get?id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            };

            for (const years of data.ValidationNUMBERDATA) {
                test('GetAllIn = ' + years,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DonationService/GetAllIn?year="+ years);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })}
        }); 
    });
});

test.describe('Unauthorized', () => {
    test.describe('GET', () => {
        for (const id of data.DonationServiceID) {
            test('Get by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DonationService/Get?id="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        };

        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DonationService/GetAll");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        for (const years of data.DonationServiceYEAR) {
            test('GetAllIn = ' + years,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/DonationService/GetAllIn?year="+ years);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        })}
    });

    test.describe('POST', () => {
        //Subaccountid statyczne 15, jak bedzie wywalac błąd to przez brak takiego subaccount prawdopodobnie
        test('Create with description "' + data.DonationServicePOSTDATA.description + "'", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/DonationService/Create",data.DonationServicePOSTDATA );
            const body = status[1] 
            expect(status[0]).toBe(data.STATUS_NONAUTHORIZED);
            console.log(body);
        });
    }); 
    
    test.describe('PUT', () => {
        test('Put with template 1', async({request}) =>{
            const query = new DepartmentFinancesAPI(request);   
                const post_status = await query.PostRequest(tokenValueADMIN, "services/app/DonationService/Create", data.DonationServicePOSTDATA);
                const body = post_status[1]
                expect(post_status[0]).toBe(data.STATUS_NONAUTHORIZED);
                console.log(body);
                const id = body.result
                const put_status = await query.PutRequest(tokenValueADMIN, "services/app/DonationService/Update", 
                {
                    "subAccountId": 15,
                    "amount": 200,
                    "description": "PutTEST",
                    "id": id
                },);
                const body2 = put_status[1]
                expect(put_status[0]).toBe(data.STATUS_NONAUTHORIZED);
                console.log(body2);
        }); 
    }); 
})