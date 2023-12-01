var crypto = require("crypto");
var fs = require("fs");
//const publicKey = fs.readFileSync("/Users/raghavrastogi/Downloads/accountId_168011_public_key.pem", "utf8");
const g = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq+gwnr8tNQkISw9emQc1
P82/OeLIZ07LE+IiLNTNDFcLDd/s80CPJ3ic4RnbliAzXibapoYWF9ogNqI09X2k
0bh68c4704mxBv9LkXgzvtri5R249bMHr/tNqiCN4FoOzNB5xAHGE91fkw/+uy+K
i3K9x9RzL8VatOXgKKLruSIdWRA4eIagMNN5daP1LrM1kwqsutI8TsYcle0Rh62X
8CN4GQbS2D+py+IjjBGlxBuUb/qWQ21RaUvHh+p5V1Kjlosa2GnHpvoZzCom/XUp
tNUoc6HTC6o+EXu0Fbc26gekivjZ0hR5aiiEy8/5w4HVB6u2GuUzPoF5jACk59bR
3wIDAQAB
-----END PUBLIC KEY-----`
var curTimeStamp = Math.round(Date.now() / 1000);
var message = "CF438240CIR4MSJHSPJFOOSBU9CG" + "." + curTimeStamp;
console.log("MESSAGE ", message);
let buffer = Buffer.from(message);
//console.log(buffer)
let encrypted = crypto.publicEncrypt({
        key: g,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        encoding: "utf8"
}, buffer);

console.log(encrypted.toString("base64"))
