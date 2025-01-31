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
            test('GetRoles',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetRoles");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })

            for (const id of data.UserID) {
                test('Get by ID = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/Get?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            test('GetAll',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll");
                    expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            })

            for (const string of data.UserKEYWORD) {
                test('GetAll Keyword = ' + string,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword="+ string);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const toggle of data.UserSWITCH) {
                test('GetAll IsActive = ' + toggle,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive="+ toggle);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const number of data.RoleSKIPCOUNT) {
                test('GetAll SkipCount = ' + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const number of data.UserNUMBER) {
                test('GetAll MaxResultCount = ' + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?MaxResultCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const string of data.UserKEYWORD) {
                for (const toggle of data.UserSWITCH) 
                test('GetAll by Keyword = ' + string + " and IsActive = " + toggle,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=" + string + "&IsActive="+ toggle);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const number of data.UserNUMBER) {
                for (const toggle of data.UserSWITCH) 
                test('GetAll by IsActive = ' + toggle + " and SkipCount = " + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=" + toggle + "&SkipCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            } 
            
            for (const number of data.UserNUMBER)
                for (const number2 of data.RoleSKIPCOUNT) {
                test('GetAll by SkipCount = ' + number2 + " and MaxResultCount = " + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount=" + number2 + "&MaxResultCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }

            for (const string of data.UserKEYWORD) {
                for (const toggle of data.UserSWITCH) {
                    for (const number2 of data.RoleSKIPCOUNT){
                test('GetAll by Keyword = ' + string + " and IsActive = " + toggle + " and SkipCount = " + number2,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=" + string + "&IsActive="+ toggle + "&SkipCount=" + number2);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })
            }}}

            for (const toggle of data.UserSWITCH) {
                for (const number2 of data.RoleSKIPCOUNT) {
                    for (const number of data.UserNUMBER){
                test('GetAll by IsActive = ' + toggle + " and SkipCount = " + number2 + " and MaxResultCount = " + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=" + toggle + "&SkipCount="+ number2 + "&MaxResultCount=" + number);
                        expect(get_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                })};
            }}
        })

        test.describe('POST', () => {
            test("Create with name '"+data.UserPOSTDATA.name+"'", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/User/Create",data.UserPOSTDATA);
                const body = status[1] 
                const id = body.result.id
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
                const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/User/Delete?Id="+ id);
                expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            });

            for (const language of data.UserlANGUAGEPOST) {
                test("Change Language to'"+language+"'", async({request}) => {  
                    const query = new DepartmentFinancesAPI(request);
                    const status = await query.PostRequest(tokenValueADMIN,"services/app/User/ChangeLanguage",language);
                    const body = status[1] 
                    expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body);
            })};

            test("ChangePassword", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/User/ChangePassword",data.UserPASSWORDCHANGEDATA);
                const body = status[1] 
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
            });

            test("ResetPassword", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/User/ResetPassword",data.UserPASSWORDRESETDATA);
                const body = status[1] 
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
            });
        }); 
        
        test.describe('DELETE', () => {
            test("Delete with name '"+data.UserPOSTDATA.name+"'", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/User/Create",data.UserPOSTDATA);
                const body = status[1] 
                const id = body.result.id
                expect(status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                console.log(body);
                const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/User/Delete?Id="+ id);
                expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED); 
            });
        }); 
        
        test.describe('PUT', () => {
            test('Put with template 1', async({request}) =>{
                const query = new DepartmentFinancesAPI(request);   
                    const post_status = await query.PostRequest(tokenValueADMIN,"services/app/User/Create",data.UserPOSTDATA);
                    const body = post_status[1]
                    expect(post_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body);
                    const id = body.result.id
                    const put_status = await query.PutRequest(tokenValueADMIN, "services/app/User/Update", 
                    {
                        "userName": "PutTest",
                        "name": "PutTest",
                        "surname": "PutTest",
                        "emailAddress": "PutTest@example.com",
                        "isActive": true,
                        "fullName": "PutTest",
                        "lastLoginTime": "2025-01-31T01:51:35.888Z",
                        "creationTime": "2025-01-31T01:51:35.888Z",
                        "roleNames": [
                            "ADMIN"
                        ],
                        "id": id
                    },);
                    const body2 = put_status[1]
                    expect(put_status[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
                    console.log(body2);
                    const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/User/Delete?Id="+ id);
                    expect(status2[0]).toBe(data.GET_STATUS_POSITIVE_EXPECTED);
            }); 
        }); 
    })

    test.describe('Validation', () => {
        test.describe('GET', () => {
            test('Get by ID = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/Get?Id=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetAll Keyword = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetAll IsActive = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetAll SkipCount = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            test('GetAll MaxResultCount = Empty',async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?MaxResultCount=");
                    expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
            })

            for (const id of data.ValidationIDDATA) {
                test('Get by ID = ' + id,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/Get?Id="+ id);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const string of data.ValidationSTRINGDATA) {
                test('GetAll Keyword = ' + string,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword="+ string);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const toggle of data.ValidationSTRINGDATA) {
                test('GetAll IsActive = ' + toggle,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive="+ toggle);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const number of data.ValidationNUMBERDATA) {
                test('GetAll SkipCount = ' + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const number of data.ValidationNUMBERDATA) {
                test('GetAll MaxResultCount = ' + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?MaxResultCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const string of data.ValidationSTRINGDATA) {
                for (const toggle of data.ValidationSTRINGDATA) 
                test('GetAll by Keyword = ' + string + " and IsActive = " + toggle,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=" + string + "&IsActive="+ toggle);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const number of data.ValidationNUMBERDATA) {
                for (const toggle of data.ValidationSTRINGDATA) 
                test('GetAll by IsActive = ' + toggle + " and SkipCount = " + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=" + toggle + "&SkipCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            } 
            
            for (const number of data.ValidationNUMBERDATA)
                for (const number2 of data.ValidationNUMBERDATA) {
                test('GetAll by SkipCount = ' + number2 + " and MaxResultCount = " + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount=" + number2 + "&MaxResultCount="+ number);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }

            for (const string of data.ValidationSTRINGDATA) {
                for (const toggle of data.ValidationSTRINGDATA) {
                    for (const number2 of data.ValidationNUMBERDATA){
                test('GetAll by Keyword = ' + string + " and IsActive = " + toggle + " and SkipCount = " + number2,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=" + string + "&IsActive="+ toggle + "&SkipCount=" + number2);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })
            }}}

            for (const toggle of data.ValidationSTRINGDATA) {
                for (const number2 of data.ValidationNUMBERDATA) {
                    for (const number of data.ValidationNUMBERDATA){
                test('GetAll by IsActive = ' + toggle + " and SkipCount = " + number2 + " and MaxResultCount = " + number,async({request}) =>{
                    const query = new DepartmentFinancesAPI(request);
                        const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=" + toggle + "&SkipCount="+ number2 + "&MaxResultCount=" + number);
                        expect(get_status[0]).toBe(data.GET_STATUS_BAD_REQUEST_EXPECTED);
                })};
            }}
        })
    })  
});

test.describe('Unauthorized', () => {
    test.describe('GET', () => {
        test('GetRoles',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetRoles");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        })

        for (const id of data.UserID) {
            test('Get by ID = ' + id,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/Get?Id="+ id);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        test('GetAll',async({request}) =>{
            const query = new DepartmentFinancesAPI(request);
                const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll");
                expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
        })

        for (const string of data.UserKEYWORD) {
            test('GetAll Keyword = ' + string,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword="+ string);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const toggle of data.UserSWITCH) {
            test('GetAll IsActive = ' + toggle,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive="+ toggle);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const number of data.RoleSKIPCOUNT) {
            test('GetAll SkipCount = ' + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount="+ number);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const number of data.UserNUMBER) {
            test('GetAll MaxResultCount = ' + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?MaxResultCount="+ number);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const string of data.UserKEYWORD) {
            for (const toggle of data.UserSWITCH) 
            test('GetAll by Keyword = ' + string + " and IsActive = " + toggle,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=" + string + "&IsActive="+ toggle);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const number of data.UserNUMBER) {
            for (const toggle of data.UserSWITCH) 
            test('GetAll by IsActive = ' + toggle + " and SkipCount = " + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=" + toggle + "&SkipCount="+ number);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        } 
        
        for (const number of data.UserNUMBER)
            for (const number2 of data.RoleSKIPCOUNT) {
            test('GetAll by SkipCount = ' + number2 + " and MaxResultCount = " + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?SkipCount=" + number2 + "&MaxResultCount="+ number);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }

        for (const string of data.UserKEYWORD) {
            for (const toggle of data.UserSWITCH) {
                for (const number2 of data.RoleSKIPCOUNT){
            test('GetAll by Keyword = ' + string + " and IsActive = " + toggle + " and SkipCount = " + number2,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?Keyword=" + string + "&IsActive="+ toggle + "&SkipCount=" + number2);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })
        }}}

        for (const toggle of data.UserSWITCH) {
            for (const number2 of data.RoleSKIPCOUNT) {
                for (const number of data.UserNUMBER){
            test('GetAll by IsActive = ' + toggle + " and SkipCount = " + number2 + " and MaxResultCount = " + number,async({request}) =>{
                const query = new DepartmentFinancesAPI(request);
                    const get_status = await query.GetRequest(tokenValueADMIN,"services/app/User/GetAll?IsActive=" + toggle + "&SkipCount="+ number2 + "&MaxResultCount=" + number);
                    expect(get_status[0]).toBe(data.STATUS_NONAUTHORIZED);
            })};
        }}
    })

    test.describe('POST', () => {
        test("Create with name '"+data.UserPOSTDATA.name+"'", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/User/Create",data.UserPOSTDATA);
            const body = status[1] 
            // const id = body.result.id
            expect(status[0]).toBe(data.STATUS_NONAUTHORIZED);
            console.log(body);
            const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/User/Delete?Id=");
            expect(status2[0]).toBe(data.STATUS_NONAUTHORIZED);
        });

        for (const language of data.UserlANGUAGEPOST) {
            test("Change Language to'"+language+"'", async({request}) => {  
                const query = new DepartmentFinancesAPI(request);
                const status = await query.PostRequest(tokenValueADMIN,"services/app/User/ChangeLanguage",language);
                const body = status[1] 
                expect(status[0]).toBe(data.STATUS_NONAUTHORIZED);
                console.log(body);
        })};

        test("ChangePassword", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/User/ChangePassword",data.UserPASSWORDCHANGEDATA);
            const body = status[1] 
            expect(status[0]).toBe(data.STATUS_NONAUTHORIZED);
            console.log(body);
        });

        test("ResetPassword", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/User/ResetPassword",data.UserPASSWORDRESETDATA);
            const body = status[1] 
            expect(status[0]).toBe(data.STATUS_NONAUTHORIZED);
            console.log(body);
        });
    }); 
    
    test.describe('DELETE', () => {
        test("Delete with name '"+data.UserPOSTDATA.name+"'", async({request}) => {  
            const query = new DepartmentFinancesAPI(request);
            const status = await query.PostRequest(tokenValueADMIN,"services/app/User/Create",data.UserPOSTDATA);
            const body = status[1] 
            // const id = body.result.id
            expect(status[0]).toBe(data.STATUS_NONAUTHORIZED);
            console.log(body);
            const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/User/Delete?Id=");
            expect(status2[0]).toBe(data.STATUS_NONAUTHORIZED); 
        });
    }); 
    
    test.describe('PUT', () => {
        test('Put with template 1', async({request}) =>{
            const query = new DepartmentFinancesAPI(request);   
                const post_status = await query.PostRequest(tokenValueADMIN,"services/app/User/Create",data.UserPOSTDATA);
                const body = post_status[1]
                expect(post_status[0]).toBe(data.STATUS_NONAUTHORIZED);
                console.log(body);
                // const id = body.result.id
                const put_status = await query.PutRequest(tokenValueADMIN, "services/app/User/Update", 
                {
                    "userName": "PutTest",
                    "name": "PutTest",
                    "surname": "PutTest",
                    "emailAddress": "PutTest@example.com",
                    "isActive": true,
                    "fullName": "PutTest",
                    "lastLoginTime": "2025-01-31T01:51:35.888Z",
                    "creationTime": "2025-01-31T01:51:35.888Z",
                    "roleNames": [
                        "ADMIN"
                    ],
                    "id": ""
                },);
                const body2 = put_status[1]
                expect(put_status[0]).toBe(data.STATUS_NONAUTHORIZED);
                console.log(body2);
                const status2 = await query.DeleteRequest(tokenValueADMIN,"services/app/User/Delete?Id=");
                expect(status2[0]).toBe(data.STATUS_NONAUTHORIZED);
        }); 
    }); 
})