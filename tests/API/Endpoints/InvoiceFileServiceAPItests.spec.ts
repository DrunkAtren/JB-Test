import {test, expect} from '@playwright/test';
import { DepartmentFinancesAPI } from "../../../functions/DepartmentFinancesAPI"

import fs from 'fs'

let tokenValueADMIN
const data = JSON.parse(fs.readFileSync('data/API/APIdata.json', 'utf-8'));
const fileContent = fs.readFileSync('data/apple.png');

test.describe('Authorized', () => {
    test.beforeEach("Token Auth", async ({ request }) => {
        const query = new DepartmentFinancesAPI(request);
        const accessToken = await query.PostAuthRequest(data.AuthAdmin)
        tokenValueADMIN = accessToken        
    });

    test.describe('GET', () => {
        test('GetFile',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetFile");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetFile by id = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetFile?Id=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })
    
        for (const id of data.InvoiceFileServiceID) {
            test('GetFile by id = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetFile?Id="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/GetAll");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('Get',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/Get");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('Get by id = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/Get?Id=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })
    
        for (const id of data.InvoiceFileServiceID) {
            test('Get by id = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/InvoiceFileService/Get?Id="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }
    });  

    // test.describe('POST', () => {
    //     test("Create", async({request}) => {  
    //         const query = new DepartmentFinancesAPI(request);
    //         const status = await query.PostRequest(tokenValueADMIN,"services/app/InvoiceFileService/AddFileBytesFormFile",{
    //             InvoiceId:"28",
    //             multipart: {
    //                 Content: {
    //                 name: 'apple.png',
    //                 mimeType: 'text/plain',
    //                 buffer: fileContent,
    //               },}
    //           });
    //         const body = status[1] 
    //         expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
    //         console.log(body);
    //     });
    // });      
});