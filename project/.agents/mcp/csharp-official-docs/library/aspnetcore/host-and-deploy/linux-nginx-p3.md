---
title: "Host ASP.NET Core on Linux with Nginx (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/host-and-deploy/linux-nginx.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Host ASP.NET Core on Linux with Nginx (part 3 of 3)

## Secure the app

### Enable AppArmor

Linux Security Modules (LSM) is a framework that's part of the Linux kernel since Linux 2.6. LSM supports different implementations of security modules. AppArmor is an LSM that implements a Mandatory Access Control system, which allows confining the program to a limited set of resources. Ensure AppArmor is enabled and properly configured.

### Configure the firewall

Close off all external ports that aren't in use. Uncomplicated firewall (ufw) provides a front end for `iptables` by providing a CLI for configuring the firewall.

# Ubuntu

> **Warning:**
> A firewall prevents access to the whole system if not configured correctly. Failure to specify the correct SSH port effectively locks you out of the system if you are using SSH to connect to it. The default port is 22. For more information, see the introduction to ufw and the manual.

Install `ufw` and configure it to allow traffic on any ports needed.

```bash
sudo apt-get install ufw

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

sudo ufw enable
```

# Red Hat Enterprise Linux

> **Warning:**
> A firewall prevents access to the whole system if not configured correctly. Failure to specify the correct SSH port effectively locks you out of the system if you are using SSH to connect to it. The default port is 22. For more information, see the introduction to ufw.

Install `ufw` and configure it to allow traffic on any ports needed.

```bash
sudo yum -y install ufw

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

sudo ufw enable
```

# SUSE Linux Enterprise Server

> **Warning:**
> A firewall prevents access to the whole system if not configured correctly. Failure to specify the correct SSH port effectively locks you out of the system if you are using SSH to connect to it. The default port is 22. For more information, see the introduction to ufw.

Install `ufw` and configure it to allow traffic on any ports needed.

```bash
sudo yum -y install ufw

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

sudo ufw enable
```

---

### Secure Nginx

#### Change the Nginx response name

Edit `src/http/ngx_http_header_filter_module.c`:

```c
static char ngx_http_server_string[] = "Server: Web Server" CRLF;
static char ngx_http_server_full_string[] = "Server: Web Server" CRLF;
```

#### Configure options

Configure the server with additional required modules. Consider using a web app firewall, such as ModSecurity, to harden the app.

#### HTTPS configuration

**Configure the app for secure (HTTPS) local connections**

The dotnet run command uses the app's `Properties/launchSettings.json` file, which configures the app to listen on the URLs provided by the `applicationUrl` property. For example, `https://localhost:5001;http://localhost:5000`.

Configure the app to use a certificate in development for the `dotnet run` command or development environment (`F5` or `Ctrl`+`F5` in Visual Studio Code) using one of the following approaches:

* Replace the default certificate from configuration (*Recommended*)
* KestrelServerOptions.ConfigureHttpsDefaults

**Configure the reverse proxy for secure (HTTPS) client connections**

> **Warning:**
> The security configuration in this section is a general configuration to be used as a starting point for further customization. We're unable to provide support for third-party tooling, servers, and operating systems. *Use the configuration in this section at your own risk.* For more information, access the following resources:
>
> * Configuring HTTPS servers (Nginx documentation)
> * mozilla.org SSL Configuration Generator

* Configure the server to listen to HTTPS traffic on port 443 by specifying a valid certificate issued by a trusted Certificate Authority (CA).

* Harden the security by employing some of the practices depicted in the following */etc/nginx/nginx.conf* file.

* The following example doesn't configure the server to redirect insecure requests. We recommend using HTTPS redirection middleware. For more information, see Enforce HTTPS in ASP.NET Core.

  > **Note:**
  > For development environments where the server configuration handles secure redirection instead of HTTPS redirection middleware, we recommend using temporary redirects (302) rather than permanent redirects (301). Link caching can cause unstable behavior in development environments.

* Adding a `Strict-Transport-Security` (HSTS) header ensures all subsequent requests made by the client are over HTTPS. For guidance on setting the `Strict-Transport-Security` header, see Enforce HTTPS in ASP.NET Core.

* If HTTPS will be disabled in the future, use one of the following approaches:

  * Don't add the HSTS header.
  * Choose a short `max-age` value.

Add the */etc/nginx/proxy.conf* configuration file:

```nginx
proxy_redirect          off;
proxy_set_header        Host $host;
proxy_set_header        X-Real-IP $remote_addr;
proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header        X-Forwarded-Proto $scheme;
client_max_body_size    10m;
client_body_buffer_size 128k;
proxy_connect_timeout   90;
proxy_send_timeout      90;
proxy_read_timeout      90;
proxy_buffers           32 4k;
```

# Ubuntu

**Replace** the contents of the */etc/nginx/nginx.conf* configuration file with the following file. The example contains both `http` and `server` sections in one configuration file.

# Red Hat Enterprise Linux

Modify `/etc/nginx/nginx.conf`. Open it in a text editor, and replace the `http{}` and `server{}` code blocks with contents with the following snippet:

# SUSE Linux Enterprise Server

Modify `/etc/nginx/nginx.conf`. Open it in a text editor, and replace the `http{}` and `server{}` code blocks with contents with the following snippet:

---

The `limit_req` directive requires a matching shared memory zone defined by `limit_req_zone` in the `http` block of `/etc/nginx/nginx.conf`, not in a `server` or `location` block. The following example defines the `one` zone with 10 MB of memory and a rate of 5 requests per second per client IP address.

Copying `limit_req` without the matching zone definition causes the error `zero size shared memory zone "one"`.

```nginx
http {
    include        /etc/nginx/proxy.conf;
    limit_req_zone $binary_remote_addr zone=one:10m rate=5r/s;
    server_tokens  off;

    sendfile on;
    # Adjust keepalive_timeout to the lowest possible value that makes sense 
    # for your use case.
    keepalive_timeout   29;
    client_body_timeout 10; client_header_timeout 10; send_timeout 10;

    upstream helloapp{
        server 127.0.0.1:5000;
    }

    server {
        listen                    443 ssl http2;
        listen                    [::]:443 ssl http2;
        server_name               example.com *.example.com;
        ssl_certificate           /etc/ssl/certs/testCert.crt;
        ssl_certificate_key       <example-value>/testCert.key;
        ssl_session_timeout       1d;
        ssl_protocols             TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers off;
        ssl_ciphers               ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
        ssl_session_cache         shared:SSL:10m;
        ssl_session_tickets       off;
        ssl_stapling              off;

        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;

        #Redirects all traffic
        location / {
            proxy_pass http://helloapp;
            limit_req  zone=one burst=10 nodelay;
        }
    }
}
```

> **Note:**
> Blazor WebAssembly apps require a larger `burst` parameter value to accommodate the larger number of requests made by an app. For more information, see Host and deploy ASP.NET Core Blazor WebAssembly with Nginx.

> **Note:**
> The preceding example disables Online Certificate Status Protocol (OCSP) Stapling. If enabled, confirm that the certificate supports the feature. For more information and guidance on enabling OCSP, see the following properties in the Module ngx_http_ssl_module (Nginx documentation) article:
>
> * `ssl_stapling`
> * `ssl_stapling_file`
> * `ssl_stapling_responder`
> * `ssl_stapling_verify`

#### Secure Nginx from clickjacking

Clickjacking, also known as a *UI redress attack*, is a malicious attack where a website visitor is tricked into clicking a link or button on a different page than they're currently visiting. Use `X-FRAME-OPTIONS` to secure the site.

To mitigate clickjacking attacks:

1. Edit the *nginx.conf* file:

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   Within the `http{}` code block, add the line: `add_header X-Frame-Options "SAMEORIGIN";`

1. Save the file.
1. Restart Nginx.

#### MIME-type sniffing

This header prevents most browsers from MIME-sniffing a response away from the declared content type, as the header instructs the browser not to override the response content type. With the `nosniff` option, if the server says the content is `text/html`, the browser renders it as `text/html`.

1. Edit the *nginx.conf* file:

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   Within the `http{}` code block, add the line: `add_header X-Content-Type-Options "nosniff";`

1. Save the file.
1. Restart Nginx.

## Additional Nginx suggestions

After upgrading the shared framework on the server, restart the ASP.NET Core apps hosted by the server.

## Related content

* Prerequisites for .NET on Linux
* Nginx: Linux packages - Ubuntu
* Troubleshoot and debug ASP.NET Core projects
* Configure ASP.NET Core to work with proxy servers and load balancers
* NGINX: Using the Forwarded header
