import { User } from "@/app/types";


type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>

}
 type RegisterInput = {
    name : string,
    email : string,
    password : string
 }

class ApiClient {

    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}): Promise<T> {
        const { method = "GET", body, headers = {} } = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const response = await fetch(`/api/${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body) : undefined
        })
        if (!response.ok) {
            throw new Error(await response.text());

        }

        return response.json();



    }

    async getUser() {
        return this.fetch<{ users: Pick<User, "id" | "name" | "email" | "role" | "createdAt">[] }>("/user")
    }
    async register(data:RegisterInput) {
        return this.fetch<{ name: string; email: string, password:string  }>("/auth/register", {
            method: "POST",
            body: data,
        });
    }
    async search(query:string) : Promise<any> {
        return this.fetch<{ query : string  }>("/search", {
            method: "POST",
            body: { query },
        });
    }


}

export const apiClient = new ApiClient();