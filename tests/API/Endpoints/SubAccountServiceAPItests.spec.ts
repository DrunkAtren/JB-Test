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
        test('Get',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/Get");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('Get by Id = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/Get?id=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const id of data.SubAccountServiceID) {
            test('Get by Id = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/Get?id="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetProjectsYears',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetProjectsYears");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAll");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllIn',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllIn");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllIn by year = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllIn?year=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const year of data.SubAccountServiceYEAR) {
            test('GetAllIn by year = ' + year,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllIn?year="+ year);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllPostcard',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllPostcard");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllInPaginated',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllInPaginated by pageNumber = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?pageNumber=1");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const number of data.SubAccountServicePAGENUMBER) {
            test('GetAllInPaginated by pageNumber = ' + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?pageNumber=1"+ number);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllInPaginated by pageSize = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?pageSize=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const number of data.SubAccountServicePAGESIZE) {
            test('GetAllInPaginated by pageSize = ' + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?pageSize="+ number);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllInPaginated by Year = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?year=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const year of data.SubAccountServiceYEAR) {
            test('GetAllInPaginated by Year = ' + year,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?year="+ year);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllInPaginated by pageNumber = Empty and pageSize = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?pageNumber=&pageSize=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const number1 of data.SubAccountServicePAGENUMBER) {
            for (const number2 of data.SubAccountServicePAGESIZE) 
            test('GetAllInPaginated by pageNumber = ' + number1 + " and pageSize = " + number2,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?pageNumber=" + number1 + "&pageSize="+ number2);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllInPaginated by pageNumber = Empty and pageSize = Empty and Year = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?pageNumber=&pageSize=&year=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const number1 of data.SubAccountServicePAGENUMBER) {
            for (const number2 of data.SubAccountServicePAGESIZE) {
                for (const year of data.SubAccountServiceYEAR){
            test('GetAllInPaginated by pageNumber = ' + number1 + " and pageSize = " + number2 + " and year = " + year,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/SubAccountService/GetAllInPaginated?pageNumber=" + number1 + "&pageSize="+ number2 + "&year=" + year);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })};
            }}});
    test.describe('POST', () => {
        test("Create with name '"+data.SubAccountServicePOSTDATA.name+"'", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/SubAccountService/Create",data.SubAccountServicePOSTDATA);
            const body = status[1] 
            expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            console.log(body);
        });

        for (const id of data.SubAccountServicePOSTID) {
            test("ValidateSubAccount with Id = '"+ id + "'", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/SubAccountService/ValidateSubAccount?subAccountId="+id,"");
                const body = status[1] 
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
            });
        };
        test("ValidateSubAccount with Id = Empty", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/SubAccountService/ValidateSubAccount?subAccountId=","");
            const body = status[1] 
            expect(status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            console.log(body);
        });

        for (const id of data.SubAccountServicePOSTID) {
            test("ChangeIsActive with Id = '"+ id + "'", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/SubAccountService/ChangeIsActive?projectId="+id,"");
                const body = status[1] 
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
            });
        };

        test("ChangeIsActive with Id = Empty", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/SubAccountService/ChangeIsActive?projectId=","");
            const body = status[1] 
            expect(status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            console.log(body);
        });
    });   
});
