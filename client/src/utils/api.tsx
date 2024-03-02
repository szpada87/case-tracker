import { DataApi, SearchApi } from "../shared/api/axios-client";

const BASE_PATH = "https://case-tracker.dev";

export const dataApi = new DataApi(undefined, BASE_PATH)

export const searchApi = new SearchApi(undefined, BASE_PATH);