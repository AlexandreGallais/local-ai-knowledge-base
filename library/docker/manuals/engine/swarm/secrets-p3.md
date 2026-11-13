---
title: "Manage sensitive data with Docker secrets (part 3 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/secrets.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage sensitive data with Docker secrets (part 3 of 5)

### Intermediate example: Use secrets with a Nginx service

This example is divided into two parts.
The first part is all about generating
the site certificate and does not directly involve Docker secrets at all, but
it sets up the second part, where you store
and use the site certificate and Nginx configuration as secrets.

#### Generate the site certificate

Generate a root CA and TLS certificate and key for your site. For production
sites, you may want to use a service such as `Let’s Encrypt` to generate the
TLS certificate and key, but this example uses command-line tools. This step
is a little complicated, but is only a set-up step so that you have
something to store as a Docker secret. If you want to skip these sub-steps,
you can use Let's Encrypt to
generate the site key and certificate, name the files `site.key` and
`site.crt`, and skip to
Configure the Nginx container.

1.  Generate a root key.

    ```console
    $ openssl genrsa -out "root-ca.key" 4096
    ```

2.  Generate a CSR using the root key.

    ```console
    $ openssl req \
              -new -key "root-ca.key" \
              -out "root-ca.csr" -sha256 \
              -subj '/C=US/ST=CA/L=San Francisco/O=Docker/CN=Swarm Secret Example CA'
    ```

3.  Configure the root CA. Edit a new file called `root-ca.cnf` and paste
    the following contents into it. This constrains the root CA to signing leaf
    certificates and not intermediate CAs.

    ```ini
    [root_ca]
    basicConstraints = critical,CA:TRUE,pathlen:1
    keyUsage = critical, nonRepudiation, cRLSign, keyCertSign
    subjectKeyIdentifier=hash
    ```

4.  Sign the certificate.

    ```console
    $ openssl x509 -req  -days 3650  -in "root-ca.csr" \
                   -signkey "root-ca.key" -sha256 -out "root-ca.crt" \
                   -extfile "root-ca.cnf" -extensions \
                   root_ca
    ```

5.  Generate the site key.

    ```console
    $ openssl genrsa -out "site.key" 4096
    ```

6.  Generate the site certificate and sign it with the site key.

    ```console
    $ openssl req -new -key "site.key" -out "site.csr" -sha256 \
              -subj '/C=US/ST=CA/L=San Francisco/O=Docker/CN=localhost'
    ```

7.  Configure the site certificate. Edit a new file  called `site.cnf` and
    paste the following contents into it. This constrains the site
    certificate so that it can only be used to authenticate a server and
    can't be used to sign certificates.

    ```ini
    [server]
    authorityKeyIdentifier=keyid,issuer
    basicConstraints = critical,CA:FALSE
    extendedKeyUsage=serverAuth
    keyUsage = critical, digitalSignature, keyEncipherment
    subjectAltName = DNS:localhost, IP:127.0.0.1
    subjectKeyIdentifier=hash
    ```

8.  Sign the site certificate.

    ```console
    $ openssl x509 -req -days 750 -in "site.csr" -sha256 \
        -CA "root-ca.crt" -CAkey "root-ca.key"  -CAcreateserial \
        -out "site.crt" -extfile "site.cnf" -extensions server
    ```

9.  The `site.csr` and `site.cnf` files are not needed by the Nginx service, but
    you need them if you want to generate a new site certificate. Protect
    the `root-ca.key` file.

#### Configure the Nginx container

1.  Produce a very basic Nginx configuration that serves static files over HTTPS.
    The TLS certificate and key are stored as Docker secrets so that they
    can be rotated easily.

    In the current directory, create a new file called `site.conf` with the
    following contents:

    ```nginx
    server {
        listen                443 ssl;
        server_name           localhost;
        ssl_certificate       /run/secrets/site.crt;
        ssl_certificate_key   /run/secrets/site.key;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
    }
    ```

2.  Create three secrets, representing the key, the certificate, and the
    `site.conf`. You can store any file as a secret as long as it is smaller
    than 500 KB. This allows you to decouple the key, certificate, and
    configuration from the services that use them. In each of these
    commands, the last argument represents the path to the file to read the
    secret from on the host machine's filesystem. In these examples, the secret
    name and the file name are the same.

    ```console
    $ docker secret create site.key site.key

    $ docker secret create site.crt site.crt

    $ docker secret create site.conf site.conf
    ```

    ```console
    $ docker secret ls

    ID                          NAME                  CREATED             UPDATED
    2hvoi9mnnaof7olr3z5g3g7fp   site.key       58 seconds ago      58 seconds ago
    aya1dh363719pkiuoldpter4b   site.crt       24 seconds ago      24 seconds ago
    zoa5df26f7vpcoz42qf2csth8   site.conf      11 seconds ago      11 seconds ago
    ```

3.  Create a service that runs Nginx and has access to the three secrets. The
    last part of the `docker service create` command creates a symbolic link
    from the location of the `site.conf` secret to `/etc/nginx.conf.d/`, where
    Nginx looks for extra configuration files. This step happens before Nginx
    actually starts, so you don't need to rebuild your image if you change the
    Nginx configuration.

    > **Note:**
    >
    > Normally you would create a Dockerfile which copies the `site.conf`
    > into place, build the image, and run a container using your custom image.
    > This example does not require a custom image. It puts the `site.conf`
    > into place and runs the container all in one step.

    Secrets are located within the `/run/secrets/` directory in the container
    by default, which may require extra steps in the container to make the
    secret available in a different path. The example below creates a symbolic
    link to the true location of the `site.conf` file so that Nginx can read it:

    ```console
    $ docker service create \
         --name nginx \
         --secret site.key \
         --secret site.crt \
         --secret site.conf \
         --publish published=3000,target=443 \
         nginx:latest \
         sh -c "ln -s /run/secrets/site.conf /etc/nginx/conf.d/site.conf && exec nginx -g 'daemon off;'"
    ```

    Instead of creating symlinks, secrets allow you to specify a custom location
    using the `target` option. The example below illustrates how the `site.conf`
    secret is made available at `/etc/nginx/conf.d/site.conf` inside the container
    without the use of symbolic links:

    ```console
    $ docker service create \
         --name nginx \
         --secret site.key \
         --secret site.crt \
         --secret source=site.conf,target=/etc/nginx/conf.d/site.conf \
         --publish published=3000,target=443 \
         nginx:latest \
         sh -c "exec nginx -g 'daemon off;'"
    ```

    The `site.key` and `site.crt` secrets use the short-hand syntax, without a
    custom `target` location set. The short syntax mounts the secrets in `/run/secrets/
    with the same name as the secret. Within the running containers, the following
    three files now exist:

    - `/run/secrets/site.key`
    - `/run/secrets/site.crt`
    - `/etc/nginx/conf.d/site.conf`

4.  Verify that the Nginx service is running.

    ```console
    $ docker service ls

    ID            NAME   MODE        REPLICAS  IMAGE
    zeskcec62q24  nginx  replicated  1/1       nginx:latest

    $ docker service ps nginx

    NAME                  IMAGE         NODE  DESIRED STATE  CURRENT STATE          ERROR  PORTS
    nginx.1.9ls3yo9ugcls  nginx:latest  moby  Running        Running 3 minutes ago
    ```

5.  Verify that the service is operational: you can reach the Nginx
    server, and that the correct TLS certificate is being used.

    ```console
    $ curl --cacert root-ca.crt https://localhost:3000

    <!DOCTYPE html>
    <html>
    <head>
    <title>Welcome to nginx!</title>
    <style>
        body {
            width: 35em;
            margin: 0 auto;
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
    </head>
    <body>
    <h1>Welcome to nginx!</h1>
    <p>If you see this page, the nginx web server is successfully installed and
    working. Further configuration is required.</p>

    <p>For online documentation and support. refer to
    <a href="https://nginx.org">nginx.org</a>.<br/>
    Commercial support is available at
    <a href="https://www.nginx.com">nginx.com</a>.</p>

    <p><em>Thank you for using nginx.</em></p>
    </body>
    </html>
    ```

    ```console
    $ openssl s_client -connect localhost:3000 -CAfile root-ca.crt

    CONNECTED(00000003)
    depth=1 /C=US/ST=CA/L=San Francisco/O=Docker/CN=Swarm Secret Example CA
    verify return:1
    depth=0 /C=US/ST=CA/L=San Francisco/O=Docker/CN=localhost
    verify return:1
    ---
    Certificate chain
     0 s:/C=US/ST=CA/L=San Francisco/O=Docker/CN=localhost
       i:/C=US/ST=CA/L=San Francisco/O=Docker/CN=Swarm Secret Example CA
    ---
    Server certificate
    -----BEGIN CERTIFICATE-----
    …
    -----END CERTIFICATE-----
    subject=/C=US/ST=CA/L=San Francisco/O=Docker/CN=localhost
    issuer=/C=US/ST=CA/L=San Francisco/O=Docker/CN=Swarm Secret Example CA
    ---
    No client certificate CA names sent
    ---
    SSL handshake has read 1663 bytes and written 712 bytes
    ---
    New, TLSv1/SSLv3, Cipher is AES256-SHA
    Server public key is 4096 bit
    Secure Renegotiation IS supported
    Compression: NONE
    Expansion: NONE
    SSL-Session:
        Protocol  : TLSv1
        Cipher    : AES256-SHA
        Session-ID: A1A8BF35549C5715648A12FD7B7E3D861539316B03440187D9DA6C2E48822853
        Session-ID-ctx:
        Master-Key: F39D1B12274BA16D3A906F390A61438221E381952E9E1E05D3DD784F0135FB81353DA38C6D5C021CB926E844DFC49FC4
        Key-Arg   : None
        Start Time: 1481685096
        Timeout   : 300 (sec)
        Verify return code: 0 (ok)
    ```

6.  To clean up after running this example, remove the `nginx` service and the
    stored secrets.

    ```console
    $ docker service rm nginx

    $ docker secret rm site.crt site.key site.conf
    ```
