---
title: OpenSSL - Certificate Conversion
---

- Extract Public key from Private Key file
```bash
openssl pkey -in fd-priv.key -pubout -out out-pub.key
```

- PEM and DER
```bash
openssl x509 -inform PEM -in fd.pem -outform DER -out fd.der
openssl x509 -inform DER -in fd.der -outform PEM -out fd.pem
```

- To PKCS#12 (PFX)
```bash
 openssl pkcs12 -export -name "My Certificate" -out fd.p12 \
    -inkey fd.key -in fd.crt -certfile fd-chain.crt
```

- From PKCS#12 (PFX)
```bash
openssl pkcs12 -in fd.p12 -out fd.pem -nodes
```
***OR***
```bash
openssl pkcs12 -in fd.p12 -nocerts -out fd.key -nodes
openssl pkcs12 -in fd.p12 -nokeys -clcerts -out fd.crt
openssl pkcs12 -in fd.p12 -nokeys -cacerts -out fd-chain.crt
```

- FROM PEM to PKCS#7 and reverse
```bash
openssl crl2pkcs7 -nocrl -out fd.p7b -certfile fd.crt -certfile fd-chain.crt
openssl pkcs7 -in fd.p7b -print_certs -out fd.pem
```