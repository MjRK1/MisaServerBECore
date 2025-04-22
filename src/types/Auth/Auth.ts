export interface ILoginResponse {
  id: string | number,
  username: string,
  displayName: string,
  roles: string[],
  accessToken?: string,
  refreshToken?: string,
};
