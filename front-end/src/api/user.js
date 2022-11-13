import { post } from '@/utils/request';

export const reqAddressInfo = (data) => post({ url: `8080/api/sync`, data });

export const userlogin = (data) => post({ url: `8080/api/login`, data });
