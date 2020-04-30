class Auth0 {

    /**
     * 
     * @param {DatabaseInterface} driver : driver to make actions in database
     * @param {string} modelName : name to representate the object
     * @param {HouseSchema} houseSchema : valid schema for create model
     */
    constructor(jwt, jwksRsa, authInfo){
      this.jwt = jwt;
      this.jwksRsa = jwksRsa;
      this.authMiddleware = this.createAuthMiddleware(authInfo);
    }

    createAuthMiddleware({ domain, clientId, audience }){
        return this.jwt({
            secret: this.jwksRsa.expressJwtSecret({
              cache: true,
              rateLimit: true,
              jwksRequestsPerMinute: 5,
              jwksUri: `https://${domain}/.well-known/jwks.json`
            }),
          
            audience: audience,
            issuer: `https://${domain}/`,
            algorithm: ["RS256"]
          });
    }

}

module.exports = Auth0;


// Set up Auth0 configuration
// const authConfig = {
//   "domain": "apparriendos.auth0.com",
//   "clientId": "dhXmTUed463UHjuXTIGbhcueTTCT8rCQ",
//   "audience": "https://dikki.com/api/v3/"
// };

//---------------------------------------------------------------------
// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN

// const checkJwt = containerDependency.get('Auth0').authMiddleware;
// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
//   }),

//   audience: authConfig.audience,
//   issuer: `https://${authConfig.domain}/`,
//   algorithm: ["RS256"]
// });

// Define an endpoint that must be called with an access token
// app.get("/api/external", checkJwt, (req, res) => {
// app.get("/api/external", checkJwt, (req, res) => {
//   res.send({
//     msg: "Your Access Token was successfully validated!"
//   });
// });
//---------------------------------------------------------------------

// containerDependency.get('mongooseDriver').connect();