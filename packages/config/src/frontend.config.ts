/* eslint turbo/no-undeclared-env-vars: 0 */

export type FrontendConfig = {
  backendBaseURL: string;
};

export const loadFrontendConfig = (): FrontendConfig => ({
  backendBaseURL: process.env.BACKEND_BASE_URL ?? "",
});
