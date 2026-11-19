---
name: secrets-hygiene
description: "Keeps secrets out of commits, logs, merge requests and replies, scans before committing, and handles a leak. Use when handling passwords, tokens, API keys, private keys, .env files or credentials, before any commit or push, and when a secret appears in a diff, a log or the history."
metadata:
  id: SEC-01
  stars: "5"
  nature: guardrail
  mode: A
  wave: V1
  load: always
---

# Secrets hygiene

**Core rule:** a secret never enters a file under Git, a log, a commit message, a merge request or your reply; read it from the environment, and report any leak at once.

## Rules

1. Read secrets from environment variables or the project's secret store; reference them by name (`$DB_PASSWORD`).
   - Check: no literal secret value in the code or config you wrote.
2. Keep local secret files out of Git: `.env`, `*.pem`, `*.key` listed in `.gitignore`.
   - Check: `git check-ignore -v .env` prints the ignore rule.
3. Scan before each commit. With gitleaks installed, confirm the flags with `gitleaks git --help`, then run `gitleaks git --pre-commit --staged --redact` (versions before 8.19: `gitleaks protect --staged --redact`). Without it: the secret search of `self-review`.
   - Check: the scan reports no leak.
4. In logs, errors and replies, write `<REDACTED>` instead of a secret value.
   - Check: your outputs show no value of a secret.

## If a secret leaked

1. Stop. Do not push. If already pushed, do not try to hide it with a force push yourself.
2. Tell the human at once: which secret, where (file, commit, log).
3. The secret must be revoked and rotated by its owner: rewriting history does not make it safe.

## Stop and ask the human if

- A secret is needed and no environment variable or store provides it.
- Any leak, even local or suspected.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "It is only a test token." | Test tokens leak real access too. Use a placeholder. |
| "I will remove it in the next commit." | History keeps it. Rotate it. |

## Definition of done

- [ ] No secret value in the diff, the logs or the reply.
- [ ] Scan clean before the commit; any leak reported to the human.
