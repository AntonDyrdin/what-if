import { EXMO_API } from "./axios-instance";

export async function pairs(): Promise<any> {
 return EXMO_API.get('/exchangeInfo');
}