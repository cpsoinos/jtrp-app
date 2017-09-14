export const AUTH_CONFIG = {
  clientId: '7nlM2w74KDXsf98n5kVM3VA2axvbNaJ2',
  domain: 'jtrp.auth0.com',
  callbackUrl: 'http://localhost:8080/callback',
  // apiUrl: 'http://localhost:3000/api/v1'
  responseType: 'token id_token',
  audience: 'http://localhost:3000',
  redirectUri: 'http://localhost:8080/callback',
  scope: 'openid profile email read:items write:items'
}
