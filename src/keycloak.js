import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://192.168.1.9/', // URL ของ Keycloak
    realm: 'affiliate',
    clientId: 'affiliate',
    checkLoginIframe: false // ปิดการตรวจสอบ iframe เพื่อลดการใช้ Cookie
});

export default keycloak;
