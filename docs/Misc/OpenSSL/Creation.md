---
title: OpenSSL - SSL Creation
---

- Create Private Key
```bash
openssl genpkey -algorithm RSA -out sample.key -pkeyopt rsa_keygen_bits:2048
```

- Create Encrypted Private Key
```bash
openssl genpkey -algorithm RSA -out sample.key -pkeyopt rsa_keygen_bits:2048 -aes-128-cbc
```

- See Private key details
```bash
openssl pkey -in fd-priv.key -text -noout
```

- Extract Public key from Private Key file
```bash
openssl pkey -in fd-priv.key -pubout -out out-pub.key
```

- Create Certificate Signing Request
```bash
openssl req -new -config sample.cnf -key fd.key -out fd.csr
```
  - Sample `cnf` file
  ```text
      [req]
      prompt = no
      distinguished_name = dn
      req_extensions = crt
      input_password = .
      
      [dn]
      CN = www.samplecert.com
      emailAddress = nikhil@samplecert.com
      O = Sample Cert Company
      L = London
      C = GB
      
      [ext]
      subjectAltName = DNS:www.samplecert.com,DNS:samplecert.com
  ```