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
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAll");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllOrdersWithInvoicesId',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesId");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllOrdersWithInvoicesIdYear',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesIdYear");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllOrdersWithInvoicesIdYear by ID = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesIdYear?year=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const id of data.OrderServiceYEAR) {
            test('GetAllOrdersWithInvoicesIdYear by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesIdYear?year="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllOrdersWithInvoicesAndFilesPaginationYear',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllOrdersWithInvoicesAndFilesPaginationYear by pageNumber = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?pageNumber=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const number of data.OrderServicePAGENUMBER) {
            test('GetAllOrdersWithInvoicesAndFilesPaginationYear by pageNumber = ' + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?pageNumber="+ number);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllOrdersWithInvoicesAndFilesPaginationYear by pageSize = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?pageSize=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const number of data.OrderServicePAGESIZE) {
            test('GetAllOrdersWithInvoicesAndFilesPaginationYear by pageSize = ' + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?pageSize="+ number);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllOrdersWithInvoicesAndFilesPaginationYear by year = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?year=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const year of data.OrderServiceYEAR) {
            test('GetAllOrdersWithInvoicesAndFilesPaginationYear by year = ' + year,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?year="+ year);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllOrdersWithInvoicesAndFilesPaginationYear by pageNumber = Empty and pageSize = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?pageNumber=&pageSize=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const number of data.OrderServicePAGENUMBER) {
            for (const number2 of data.OrderServicePAGESIZE) 
            test('GetAllOrdersWithInvoicesAndFilesPaginationYear by pageNumber = = ' + number + " and pageSize = " + number2,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?pageNumber=" + number + "&pageSize="+ number2);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllOrdersWithInvoicesAndFilesPaginationYear by pageNumber = Empty and pageSize = Empty and Year = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?pageNumber=&pageSize=&year=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const number of data.OrderServicePAGENUMBER) {
            for (const number2 of data.OrderServicePAGESIZE) {
                for (const year of data.OrderServiceYEAR){
            test('GetAllOrdersWithInvoicesAndFilesPaginationYear by pageNumber = ' + number + " and  pageSize = " + number2 + " and Year = " + year,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersWithInvoicesAndFilesPaginationYear?pageNumber=" + number + "&pageSize="+ number2 + "&year=" + year);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }}}

        test('GetOneMain',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOneMain");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetOneMain by ID = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOneMain?id=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const id of data.OrderServiceID) {
            test('GetOneMain by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOneMain?id="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetDetails',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetDetails");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetDetails by ID = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetDetails?id=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const id of data.OrderServiceID) {
            test('GetDetails by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetDetails?id="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllOrdersByWirka',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersByWirka");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllOrdersByWirka by Wirka = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersByWirka?wirka=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const wirka of data.OrderServiceWIRKA) {
            test('GetAllOrdersByWirka by Wirka = ' + wirka,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllOrdersByWirka?wirka="+ wirka);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetAllInYear',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllInYear");
                expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
        })

        test('GetAllInYear by year = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllInYear?year=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const year of data.OrderServiceYEAR) {
            test('GetAllInYear by year = ' + year,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetAllInYear?year="+ year);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetOrdersBudget ',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOrdersBudget");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        test('GetOrdersBudget by projectId = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOrdersBudget?projectId=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const id of data.OrderServicePROJECTID) {
            test('GetOrdersBudget by projectId = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOrdersBudget?projectId="+ id);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetOrdersBudget by by year = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOrdersBudget?year=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const year of data.OrderServiceYEAR) {
            test('GetOrdersBudget by by year = ' + year,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOrdersBudget?year="+ year);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }

        test('GetOrdersBudget by projectId = Empty and year = Empty',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOrdersBudget?projectId=&year=");
                expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
        })

        for (const id of data.OrderServicePROJECTID) {
            for (const year of data.OrderServiceYEAR) 
            test('GetOrdersBudget by projectId = ' + id + " and year = " + year,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/OrderService/GetOrdersBudget?projectId=" + id + "&year="+ year);
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })
        }
    });     
});