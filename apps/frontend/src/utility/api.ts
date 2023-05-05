import { GlobalRef } from "./GlobalRef";
import axios from "axios";
import {
  CreateUserRequest,
  CreateUserResponse,
  JWTToken,
  LogInRequest,
} from "types";

const URL = process.env.backendBaseURL ?? "";

export class APIClient {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";
  }

  public async register(req: CreateUserRequest): Promise<CreateUserResponse> {
    return await axios.post(this.baseURL + "auth/register", req);
  }

  public async login(req: LogInRequest): Promise<JWTToken> {
    return await axios.post(this.baseURL + "auth/login", req);
  }
}

const apiClientRef = new GlobalRef<APIClient>("apiClient");
if (!apiClientRef.value && typeof window !== "undefined") {
  apiClientRef.value = new APIClient(URL);
}
export const apiClient = apiClientRef.value;
