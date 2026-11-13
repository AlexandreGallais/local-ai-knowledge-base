---
title: "Manage sensitive data with Docker secrets (part 5 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/secrets.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage sensitive data with Docker secrets (part 5 of 5)

## Build support for Docker Secrets into your images

If you develop a container that can be deployed as a service and requires
sensitive data, such as a credential, as an environment variable, consider
adapting your image to take advantage of Docker secrets. One way to do this is
to ensure that each parameter you pass to the image when creating the container
can also be read from a file.

Many of the Docker Official Images in the
Docker library, such as the
wordpress
image used in the above examples, have been updated in this way.

When you start a WordPress container, you provide it with the parameters it
needs by setting them as environment variables. The WordPress image has been
updated so that the environment variables which contain important data for
WordPress, such as `WORDPRESS_DB_PASSWORD`, also have variants which can read
their values from a file (`WORDPRESS_DB_PASSWORD_FILE`). This strategy ensures
that backward compatibility is preserved, while allowing your container to read
the information from a Docker-managed secret instead of being passed directly.

> **Note:**
>
> Docker secrets do not set environment variables directly. This was a
> conscious decision, because environment variables can unintentionally be leaked
> between containers (for instance, if you use `--link`).

## Use Secrets in Compose

```yaml

services:
   db:
     image: mysql:latest
     volumes:
       - db_data:/var/lib/mysql
     environment:
       MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db_root_password
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD_FILE: /run/secrets/db_password
     secrets:
       - db_root_password
       - db_password

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "8000:80"
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD_FILE: /run/secrets/db_password
     secrets:
       - db_password

secrets:
   db_password:
     file: db_password.txt
   db_root_password:
     file: db_root_password.txt

volumes:
    db_data:
```

This example creates a simple WordPress site using two secrets in
a Compose file.

The top-level element `secrets` defines two secrets `db_password` and
`db_root_password`.

When deploying, Docker creates these two secrets and populates them with the
content from the file specified in the Compose file.

The `db` service uses both secrets, and `wordpress` is using one.

When you deploy, Docker mounts a file under `/run/secrets/<secret_name>` in the
services. These files are never persisted on disk, but are managed in memory.

Each service uses environment variables to specify where the service should look
for that secret data.

More information on short and long syntax for secrets can be found in the
Compose Specification.
