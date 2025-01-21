import { APIRequestContext, expect} from '@playwright/test';


const baseUrl = "http://localhost:483/api/";

export class DepartmentFinancesAPI{
    constructor(private request: APIRequestContext){};

    async GetRequest(token,getRequest)
    {
        const response =  await this.request.get(baseUrl +getRequest,
        {
            headers: {'Authorization': `Bearer ${token}`}
        });
        
        return await this.Response(response);
    };

    async PostAuthRequest(PostData){
        const response = await this.request.post(baseUrl+"TokenAuth/Authenticate", 
        {
            data: PostData
        });
        let body   
        try {
            body = await response.json();
        } catch (e) {
            body = await response.text();
        }
        return body.result.accessToken
    };

    async Response(res)
    {   
        const status_code = await res.status();  

        let body;
        try {
            body = await res.json();
            console.log(body)
        } catch (e) {
            body = await res.text();
            console.log(body)
        }
        return [status_code, body];
    
    };
}