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

    test.describe('GET', () => {
        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAll");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllWithOutOrder',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllWithOutOrder");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        test('GetAllWithOutOrderBySubAccountId',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllWithOutOrderBySubAccountId");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })
        
        test('GetAllWithOutOrderBySubAccountId by subAccountId = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllWithOutOrderBySubAccountId?subAccountId=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })
        
        for (const id of data.InvoiceServiceID) {
            test("GetAllWithOutOrderBySubAccountId by subAccountId = " + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllWithOutOrderBySubAccountId?subAccountId="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetOne',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetOne");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })
        
        test('GetOne by Id = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetOne?id=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })
        
        for (const id of data.InvoiceServiceGetOneID) {
            test("GetOne by Id = " + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetOne?id="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetOrderInvoices',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetOrderInvoices");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })
        
        test('GetOrderInvoices by orderId = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetOrderInvoices?orderId=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })
        
        for (const id of data.InvoiceServiceORDERID) {
            test("GetOrderInvoices by orderId = " + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetOrderInvoices?orderId="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllMain',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllMain");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })
        
        test('GetAllMain by orderId = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllMain?orderId=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })
        
        for (const id of data.InvoiceServiceORDERID) {
            test("GetAllMain by orderId = " + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllMain?orderId="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllObjectsToDelete',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllObjectsToDelete");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })
        
        test('GetAllObjectsToDelete by Id = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllObjectsToDelete?ids=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })
        
        for (const id of data.InvoiceServiceID) {
            test("GetAllObjectsToDelete by Id = " + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceService/GetAllObjectsToDelete?ids="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }
    });
    test.describe('POST', () => {
        test("CreateInvoice with template '"+data.InvoiceServicePOSTDATA.description+"'", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/InvoiceService/CreateInvoice",data.InvoiceServicePOSTDATA);
            const body = status[1] 
            const id = body.result
            expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
            const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/InvoiceService/DeleteOne?id="+ id);
            expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        });

        test("CreateMultiple", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/InvoiceService/CreateInvoice",data.InvoiceServiceMULTIPLEPOSTDATA);
            const body = status[1] 
            const id = body.result
            expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
            const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/InvoiceService/DeleteOne?id="+ id);
            expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        });
    });

    test.describe('DELETE', () => {
        test("DeleteOne", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/InvoiceService/CreateInvoice",data.InvoiceServiceMULTIPLEPOSTDATA);
            const body = status[1] 
            const id = body.result
            expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
            const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/InvoiceService/DeleteOne?id="+ id);
            expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        });

        test("DeleteMultiple", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/InvoiceService/CreateInvoice",data.InvoiceServiceMULTIPLEPOSTDATA);
            const body = status[1] 
            const id = body.result
            expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
            const status3 = await query.PostRequest(tokenValueADMIN,"services/app/InvoiceService/CreateInvoice",data.InvoiceServiceMULTIPLEPOSTDATA);
            const body2 = status3[1]
            const id2 = body2.result
            expect(status3[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
            const status4 = await query.DeleteRequest(tokenValueADMIN,"services/app/InvoiceService/DeleteMultiple?ids="+ id + "&ids=" +id2);
            expect(status4[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        });
    });       
});