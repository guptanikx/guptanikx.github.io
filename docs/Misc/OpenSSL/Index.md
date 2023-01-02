---
title: Keys/Certificates using OpenSSL
---


- If key starts with BEGIN ENCRYPTED PRIVATE KEY it is PKCS#8 format
  {: .msg-warn }

- If key starts with `BEGIN RSA PRIVATE KEY` it is `legacy` format
  {: .msg-warn }

- Private Key file also contains public key part which you can extract out seperately
  {: .msg-warn }

---
- Certificate Types
    - `Binary (DER)` - X509 in raw form using DER ASN.1 encoding
    - `ASCII (PEM)` - Base64 encoded DER. One Certificate per file
    - `Legacy OpenSSL key` - Private key in DER ASN.1 encoding
    - `ASCII (PEM) key` - Base64 encoded DER key with some additional metadata
    - `PKCS#7 certificate` - Signed or Encrypted data `.p7b` or `.p7c` extension with entire certificate chain
    - `PKCS#8 key` - New format for private key store
    - `PKCS#12 (PFX) key and Certificate` - Entire certificate chain with `.p12` or `.pfx` extension

---

- Examine a certificate
  ```bash
  openssl x509 -text -in fd.crt -noout
  ```

