import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./pages/homepage";

function App() {
  const handleOnEvent = (event, error) => {
    console.log("onKeycloakEvent", event, error);
  };

  const loadingComponent = <div>กำลังโหลด Keycloak...</div>;

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={handleOnEvent}
      LoadingComponent={loadingComponent}
      initOptions={{
        checkLoginIframe: false,
        onLoad: "check-sso",
        redirectUri: "https://affiliate-service.vercel.app/",
        pkceMethod: "S256",
      }}
    >
      <Homepage />
    </ReactKeycloakProvider>
  );
}

export default App;
