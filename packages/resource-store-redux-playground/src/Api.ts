import { ApiMap } from "resource-store-redux-thunk";
import axios from "axios";

export enum Resource {
	SampleGet = "sampleGet",
	SamplePost = "samplePost"
}

export const api: ApiMap = {
	[Resource.SampleGet]: () => axios.get("https://httpbin.org/get"),
	[Resource.SamplePost]: () => axios.post("https://httpbin.org/post")
};
