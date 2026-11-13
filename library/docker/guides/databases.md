---
title: "Use containerized databases (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/databases.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

Using a local containerized database offers flexibility and ease of setup,
letting you mirror production environments closely without the overhead of
traditional database installations. Docker simplifies this process, enabling you
to deploy, manage, and scale databases in isolated containers with just a few
commands.

In this guide, you'll learn how to:

- Run a local containerized database
- Access the shell of a containerized database
- Connect to a containerized database from your host
- Connect to a containerized database from another container
- Persist database data in a volume
- Build a customized database image
- Use Docker Compose to run a database

This guide uses the MySQL image for examples, but the concepts can be applied to other database images.

## Prerequisites

To follow along with this guide, you must have Docker installed. To install Docker, see Get Docker.

## Run a local containerized database

Most popular database systems, including MySQL, PostgreSQL, and MongoDB, have a
Docker Official Image available on Docker Hub. These images are a curated set
images that follow best practices, ensuring that you have access to the latest
features and security updates. To get started, visit
Docker Hub and search for the database you're
interested in. Each image's page provides detailed instructions on how to run
the container, customize your setup, and configure the database according to
your needs. For more information about the MySQL image used in this guide, see the Docker Hub MySQL image page.

To run a database container, you can use either the Docker Desktop GUI or
CLI.

**CLI**

To run a container using the CLI, run the following command in a terminal:

```console
$ docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mydb -d mysql:latest
```

In this command:

- `--name my-mysql` assigns the name my-mysql to your container for easier
  reference.
- `-e MYSQL_ROOT_PASSWORD=my-secret-pw` sets the root password for MySQL to
  my-secret-pw. Replace my-secret-pw with a secure password of your choice.
- `-e MYSQL_DATABASE=mydb` optionally creates a database named mydb. You can
  change mydb to your desired database name.
- `-d` runs the container in detached mode, meaning it runs in the background.
- `mysql:latest` specifies that you want to use the latest version of the MySQL
  image.

To verify that your container is running, run `docker ps` in a terminal

**GUI**

To run a container using the GUI:

1. In the Docker Desktop Dashboard, select the global search at the top of the window.
2. Specify `mysql` in the search box, and select the `Images` tab if not already
   selected.
3. Hover over the `mysql` image and select `Run`.
   The **Run a new container** modal appears.
4. Expand **Optional settings**.
5. In the optional settings, specify the following:

   - **Container name**: `my-mysql`
   - **Environment variables**:
     - `MYSQL_ROOT_PASSWORD`:`my-secret-pw`
     - `MYSQL_DATABASE`:`mydb`

6. Select `Run`.
7. Open the **Container** view in the Docker Desktop Dashboard to verify that your
   container is running.

## Access the shell of a containerized database

When you have a database running inside a Docker container, you may need to
access its shell to manage the database, execute commands, or perform
administrative tasks. Docker provides a straightforward way to do this using the
`docker exec` command. Additionally, if you prefer a graphical interface, you
can use Docker Desktop's GUI.

If you don't yet have a database container running, see
Run a local containerized database.

**CLI**

To access the terminal of a MySQL container using the CLI, you can use the
following `docker exec` command.

```console
$ docker exec -it my-mysql bash
```

In this command:

- `docker exec` tells Docker you want to execute a command in a running
  container.
- `-it` ensures that the terminal you're accessing is interactive, so you can
  type commands into it.
- `my-mysql` is the name of your MySQL container. If you named your container
  differently when you ran it, use that name instead.
- `bash` is the command you want to run inside the container. It opens up a bash
  shell that lets you interact with the container's file system and installed
  applications.

After executing this command, you will be given access to the bash shell inside
your MySQL container, from which you can manage your MySQL server directly. You
can run `exit` to return to your terminal.

**GUI**

1. Open the Docker Desktop Dashboard and select the **Containers** view.
2. In the **Actions** column for your container, select **Show container
   actions** and then select **Open in terminal**.

In this terminal you can access to the shell inside your MySQL container, from
which you can manage your MySQL server directly.

Once you've accessed the container's terminal, you can run any tools available
in that container. The following example shows using `mysql` in the container to
list the databases.

```console
# mysql -u root -p
Enter password: my-secret-pw

mysql> SHOW DATABASES;

+--------------------+
| Database           |
+--------------------+
| information_schema |
| mydb               |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```

## Connect to a containerized database from your host

Connecting to a containerized database from your host machine involves mapping a
port inside the container to a port on your host machine. This process ensures
that the database inside the container is accessible via the host machine's
network. For MySQL, the default port is 3306. By exposing this port, you can use
various database management tools or applications on your host machine to
interact with your MySQL database.

Before you begin, you must remove any containers you previously ran for this
guide. To stop and remove a container, either:

- In a terminal, run `docker rm --force my-mysql` to remove the container
  named `my-mysql`.
- Or, in the Docker Desktop Dashboard, select the **Delete** icon next to your
  container in the **Containers** view.

Next, you can use either the Docker Desktop GUI or CLI to run the container with
the port mapped.

**CLI**

Run the following command in a terminal.

```console
$ docker run -p 3307:3306 --name my-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mydb -d mysql:latest
```

In this command, `-p 3307:3306` maps port 3307 on the host to port 3306 in the container.

To verify the port is mapped, run the following command.

```console
$ docker ps
```

You should see output like the following.

```console
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                               NAMES
6eb776cfd73c   mysql:latest   "docker-entrypoint.s…"   17 minutes ago   Up 17 minutes   33060/tcp, 0.0.0.0:3307->3306/tcp   my-mysql
```

**GUI**

To run a container using the GUI:

1. In the Docker Desktop Dashboard, select the global search at the top of the window.
2. Specify `mysql` in the search box, and select the `Images` tab if not already
   selected.
3. Hover over the `mysql` image and select `Run`.
   The **Run a new container** modal appears.
4. Expand **Optional settings**.
5. In the optional settings, specify the following:

   - **Container name**: `my-mysql`
   - **Host port** for the **3306/tcp** port: `3307`
   - **Environment variables**:
     - `MYSQL_ROOT_PASSWORD`:`my-secret-pw`
     - `MYSQL_DATABASE`:`mydb`

6. Select `Run`.
7. In the **Containers** view, verify that the port is mapped under the
   **Port(s)** column. You should see `3307:3306` for the `my-mysql`
   container.

At this point, any application running on your host can access the MySQL service in the container at `localhost:3307`.

## Connect to a containerized database from another container

Connecting to a containerized database from another container is a common
scenario in microservices architecture and during development processes.
Docker's networking capabilities make it easy to establish this connection
without having to expose the database to the host network. This is achieved by
placing both the database container and the container that needs to access it on
the same Docker network.

Before you begin, you must remove any containers you previously ran for this
guide. To stop and remove a container, either:

- In a terminal, run `docker rm --force my-mysql` to remove the container
  named `my-mysql`.
- Or, in the Docker Desktop Dashboard, select the **Delete** icon next to your
  container in the **Containers** view.

To create a network and run containers on it:

1. Run the following command to create a Docker network named my-network.

   ```console
   $ docker network create my-network
   ```

2. Run your database container and specify the network using the `--network`
   option. This runs the container on the my-network network.

   ```console
   $ docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=mydb --network my-network -d mysql:latest
   ```

3. Run your other containers and specify the network using the `--network`
   option. For this example, you'll run a phpMyAdmin container that can connect
   to your database.

   1. Run a phpMyAdmin container. Use the `--network` option to specify the
      network, the `-p` option to let you access the container from your host
      machine, and the `-e` option to specify a required environment variable
      for this image.

      ```console
      $ docker run --name my-phpmyadmin -d --network my-network -p 8080:80 -e PMA_HOST=my-mysql phpmyadmin
      ```

4. Verify that the containers can communicate. For this example, you'll access
   phpMyAdmin and verify that it connects to the database.

   1. Open http://localhost:8080 to access your phpMyAdmin container.
   2. Log in using `root` as the username and `my-secret-pw` as the password.
      You should connect to the MySQL server and see your database listed.

At this point, any application running on your `my-network` container network
can access the MySQL service in the container at `my-mysql:3306`.
