---
title: "ControllerManagerReleaseLeaderElectionLockOnExit"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/ControllerManagerReleaseLeaderElectionLockOnExit.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ControllerManagerReleaseLeaderElectionLockOnExit

Enables the `kube-controller-manager` to actively release its leader election lock
during leader transitions, rather than waiting for the lock's TTL to expire.
This allows a new leader to be elected more quickly.
