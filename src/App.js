import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
// import Homepage from "./pages/homepage";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Data from "./pages/data";
import Example from "./pages/example";

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
        redirectUri: "http://localhost:3000/",
        pkceMethod: "S256",
      }}
    >
      <Homepage />
    </ReactKeycloakProvider>
  );
}

export default App;
