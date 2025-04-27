import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://displayed-fwd-abroad-zum.trycloudflare.com', // URL ของ Keycloak
    realm: 'affiliate',
    clientId: 'affiliate',
    checkLoginIframe: false // ปิดการตรวจสอบ iframe เพื่อลดการใช้ Cookie
});

export default keycloak;
