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
            test('GetFile',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetFile");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            for (const id of data.InvoiceFileServiceID) {
                test('GetFile by id = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetFile?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            };

            test('GetAll',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetAll");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            test('Get',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/Get");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            for (const id of data.InvoiceFileServiceID) {
                test('Get by id = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/Get?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            };
        });
    });

    test.describe('Validation', () => {
        test.describe('GET', () => {
            test('GetFile by id = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetFile?Id=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });

            test('Get by id = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/Get?Id=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            });

            for (const id of data.ValidationIDDATA) {
                test('GetFile by id = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetFile?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            };

            for (const id of data.ValidationIDDATA) {
                test('Get by id = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/Get?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            };
        });
    });  
});

test.describe('Unauthorized', () => {
    test.describe('GET', () => {
        test('GetFile',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetFile");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        for (const id of data.InvoiceFileServiceID) {
            test('GetFile by id = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetFile?Id="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        };

        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetAll");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        test('Get',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/Get");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        for (const id of data.InvoiceFileServiceID) {
            test('Get by id = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/Get?Id="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        };
    });
});