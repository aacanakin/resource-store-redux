import { ApiMap } from "resource-store-redux-thunk";
import axios from "axios";

export enum Resource {
	SampleGet = "sampleGet",
	SamplePost = "samplePost",
	SampleFailure = "sampleFailure"
}

const baseUrl = "https://httpbin.org";

export const api: ApiMap = {
	[Resource.SampleGet]: () => axios.get(`${baseUrl}/get`),
	[Resource.SamplePost]: (body: any) => axios.post(`${baseUrl}/post`, body),
	[Resource.SampleFailure]: () => axios.post(`${baseUrl}/status/500`)
};
