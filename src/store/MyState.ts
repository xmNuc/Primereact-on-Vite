import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { flow, makeObservable, observable } from 'mobx';

export class MyState {
  private static _instance?: MyState;
  apiData: [] | undefined = undefined;
  apiStatus = undefined;

  constructor() {
    makeObservable(this, { apiData: observable, sendRequest: flow.bound });
  }

  static get Instance(): MyState {
    return this._instance || (this._instance = new this());
  }

  sendRequest = flow(function* (
    this: MyState,
    recordId?: string | null,
    payload?: [],
    sendMethod: IMethod = IMethod.get
  ) {
    if (!recordId && sendMethod !== IMethod.get) {
      console.error('Error: Missing recordId for method', sendMethod);
      return;
    }

    const endpointUrl =
      ApiConfig.getEndpointUrl('TraderTeamAddr') + (recordId ? `/${recordId}` : '');

    try {
      this.apiStatus = EnumApiStatus.loading;
      const requestConfig: AxiosRequestConfig = {
        url: endpointUrl,
        method: sendMethod,
        ...(payload && sendMethod !== IMethod.delete ? { data: payload } : {}),
      };

      const response: AxiosResponse = yield ApiService.API.request(requestConfig);
      this.apiStatus = EnumApiStatus.success;

      if (response.status === 200) {
        successMsg(
          `Success! Record ${sendMethod === IMethod.delete ? 'deleted' : 'updated'}.`,
          5000
        );
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      this.apiStatus = EnumApiStatus.error;
      errorMsg(`Error: ${axiosError.response?.status}`, 4000);
    }
  });
}
