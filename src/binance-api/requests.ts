import { API } from "./axios-instance";

export async function pairs(): Promise<any> {
 return API.get('/exchangeInfo');
}