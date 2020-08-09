/*
  src: 
    https://www.npmjs.com/package/helmet
    https://ponyfoo.com/articles/content-security-policy-in-express-apps
    https://stackoverflow.com/questions/59592929/content-security-policy-in-react-app-didnt-block-online-script
    https://stackoverflow.com/questions/42369075/adding-google-fonts-fonts-googleapis-com-to-csp-header
    https://stackoverflow.com/questions/40360109/content-security-policy-img-src-self-data 
*/
module.exports = directives = {
  defaultSrc: [`'self'`],
  styleSrc: [
    `'self'`,
    `'unsafe-inline'`,
    `http://localhost:8080/`,
    `https://fonts.googleapis.com/`,
  ],
  scriptSrc: [`'self'`, `http://localhost:8080/`, `'self'`],
  objectSrc: [`'none'`],
  imgSrc: [`'self'`, `'data: image/png'`],
  baseUri: [`'http://localhost:8080/'`],
  fontSrc: [`self`, `https://fonts.gstatic.com/`, `'data:'`],
  connectSrc: [
    `ws://localhost:8080/sockjs-node`,
    `http://localhost:3000/login/session-check`,
    `http://localhost:3000/`,
    `http://localhost:8080/`,
  ],
};
