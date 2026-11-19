---
name: integration-testing
description: "Tests code against real services (database, broker, file system) started with podman compose or Testcontainers. Use when a behaviour depends on a database, a queue, an HTTP service or files, when mocks hide real bugs, or when the user asks for integration tests."
metadata:
  id: TST-03
  stars: "3"
  nature: process
  mode: B
  wave: V2
  load: auto
---

# Integration testing

**Core rule:** integration tests use real, disposable services with known data, and clean them up; each test sets up its own data.

## Procedure

1. Pick the services the behaviour needs and how to start them: the project's compose file (`compose-stacks`) or Testcontainers.
   - Check: the service starts and is healthy.
2. Point the code at it through configuration (`config-and-env`), never at a shared environment.
   - Check: the address in the test configuration is local.
3. Each test creates its data and removes it, or uses a fresh schema or container.
   - Check: tests pass in any order (run them twice, shuffled when the runner allows).
4. Assert on observable results (rows, messages, files, HTTP responses).
   - Check: a test fails when you break the query or the handler on purpose.
5. Keep them separate from unit tests (folder, tag or command) so units stay fast.
   - Check: the unit command does not start services.

## This installation

<!-- FILL: what=whether Testcontainers works with rootless Podman here; find=systemctl --user status podman.socket and the DOCKER_HOST variable; verify=a minimal Testcontainers test starts a container -->

<!-- FILL: what=command that runs only integration tests in this project; find=package.json scripts, pytest markers, test filters in CI; verify=the command runs integration tests and not unit tests -->

## Stop and ask the human if

- The service needs real data or credentials of a shared environment.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Reuse the dev database." | Shared state makes tests flaky and destroys data. |
| "Sleep until the service is ready." | Wait on its health or port. |

## Definition of done

- [ ] Tests use disposable services; isolated data; pass in any order.
- [ ] Separate command from unit tests.

## Local completion checklist

- [ ] Testcontainers with rootless Podman
- [ ] Integration test command
