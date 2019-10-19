import { WebTypedCallInfo } from './webTypedCallInfo';
export abstract class WebTypedInvoker {
    public abstract invoke<TParameters, TResult>(
        //Call infos
        info: WebTypedCallInfo<TParameters, TResult>,
        //Base Api
        api: string,
        //Base action
        action: string,
        //Post,Get,Put,Delete...
        httpMethod: string,
        //Body
        body?: any,
        //Query params
        search?: any,
        //Expected return type (a promise? an observable? an array?)
        expects?: any 
    ): any;
}
