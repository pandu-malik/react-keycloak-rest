const REALMS = "IAM_BFI_TEST";

const HOST = "https://keycloak-host.com";

const KEYCLOAK = {
    CLIENT_ID:'CLIENT NAME',
    CLIENT_SECRET:'CLIENT SECRET',
    LOGIN_URL:`${HOST}/auth/realms/${REALMS}/protocol/openid-connect/token`,
    SESSION_CHECK:`${HOST}/auth/realms/${REALMS}/protocol/openid-connect/userinfo`,
    GET_MENU:`${HOST}/auth/realms/${REALMS}/authz/protection/resource_set`,
    GET_RESOURCE_ACCESS:`${HOST}/auth/realms/${REALMS}/protocol/openid-connect/token`,
}

export {KEYCLOAK};