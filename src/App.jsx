import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
    getIdTokenClaims,
    getAccessTokenSilently,
  } = useAuth0();

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  // for decoding:
  const decodeToken = async () => {
    const idTokenClaims = await getIdTokenClaims();

    console.log("Info:", {
      name: idTokenClaims.name,
      email: idTokenClaims.email,
      picture: idTokenClaims.picture,
      email_verified: idTokenClaims.email_verified,
    });
  };

  return (
    <div className="container">
      {isAuthenticated ? (
        <div>
          <h2>Welcome to the page, {user?.name}</h2>

          {/* by clicking the button we will get user info: */}
          <button className="button" onClick={decodeToken}>
            Decode Token
          </button>

          <button
            className="button"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
        </div>
      ) : (
        <button className="button" onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}
    </div>
  );
}

export default App;
