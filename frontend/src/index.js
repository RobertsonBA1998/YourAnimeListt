import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.js";

import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <Auth0Provider
  domain="dev-tyepa8oxh8yqhohe.us.auth0.com"
  clientId="YlpQm5DUAstqmfXRtHQov6oAxvJsU36w"
  authorizationParams={{
   redirect_uri: window.location.origin,
  }}
 >
  <App />
 </Auth0Provider>
);
