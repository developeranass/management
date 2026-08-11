import { error } from "console";
import { register } from "module";

class ApiClient{

    type FetchOptions = {
        method? : "GET" | "POST" | "PUT" | "DELETE";
        body? : any;
        headers? : Record <string , string>

    }

    private async fetch<T>(
        endpoint: string, 
        options : FetchOptions = {}) : Promise<T>
    {
        const {method = "GET", body, headers = {}} = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const response =await fetch(`/api/${endpoint}`,{
         method,
         headers: defaultHeaders,
         body: body ? JSON.stringify(body) : undefined
        })
        if(!response.ok)
        {
           throw new Error(await response.text());

        }

        return response.json();
        


    }

    async getVideos()
    {
        return this.fetch("/users")


    }

    
}