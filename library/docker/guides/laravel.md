---
title: "Develop and Deploy Laravel applications with Docker Compose (part 1 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/laravel.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

Laravel is a popular PHP framework that allows developers to build web applications quickly and effectively. Docker Compose simplifies the management of development and production environments by defining essential services, like PHP, a web server, and a database, in a single YAML file. This guide provides a streamlined approach to setting up a robust Laravel environment using Docker Compose, focusing on simplicity and efficiency.

> **Acknowledgment**
>
> Docker would like to thank Sergei Shitikov for
> his contribution to this guide.

The demonstrated examples can be found in this GitHub repository. Docker Compose offers a straightforward approach to connecting multiple containers for Laravel, though similar setups can also be achieved using tools like Docker Swarm, Kubernetes, or individual Docker containers.

This guide is intended for educational purposes, helping developers adapt and optimize configurations for their specific use cases. Additionally, there are existing tools that support Laravel in containers:

- Laravel Sail: An official package for easily starting Laravel in Docker.
- Laradock: A community project that helps run Laravel applications in Docker.

## What you’ll learn

- How to use Docker Compose to set up a Laravel development and production environment.
- Defining services that make Laravel development easier, including PHP-FPM, Nginx, and database containers.
- Best practices for managing Laravel environments using containerization.

## Who’s this for?

- Developers who work with Laravel and want to streamline environment management.
- DevOps engineers seeking efficient ways to manage and deploy Laravel applications.

## Prerequisites for Setting Up Laravel with Docker Compose

Before you begin setting up Laravel with Docker Compose, make sure you meet the following prerequisites:

### Docker and Docker Compose

You need Docker and Docker Compose installed on your system. Docker allows you to containerize applications, and Docker Compose helps you manage multi-container applications.

- Docker: Make sure Docker is installed and running on your machine. Refer to the Docker installation guide to install Docker.
- Docker Compose: Docker Compose is included with Docker Desktop, but you can also follow the Docker Compose installation guide if needed.

### Basic understanding of Docker and containers

A fundamental understanding of Docker and how containers work will be helpful. If you're new to Docker, consider reviewing the Docker Overview to familiarize yourself with containerization concepts.

### Basic knowledge of Laravel

This guide assumes you have a basic understanding of Laravel and PHP. Familiarity with Laravel’s command-line tools, such as Artisan, and its project structure is important for following the instructions.

- Laravel CLI: You should be comfortable using Laravel’s command-line tool (`artisan`).
- Laravel Project Structure: Familiarize yourself with Laravel’s folder structure (`app`, `config`, `routes`, `tests`, etc.).
