import { VAxios } from './http/Axios';
const defhttp = new VAxios({});
defhttp.setupResponseRetryInterceptor();
export default defhttp;
