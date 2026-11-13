---
title: "Running ZooKeeper, A Distributed System Coordinator (part 1 of 5)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tutorials/stateful-application/zookeeper.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Running ZooKeeper, A Distributed System Coordinator

This tutorial demonstrates running Apache Zookeeper on
Kubernetes using StatefulSets,
PodDisruptionBudgets,
and PodAntiAffinity.

## Before you begin

Before starting this tutorial, you should be familiar with the following
Kubernetes concepts:

- Pods
- Cluster DNS
- Headless Services
- PersistentVolumes
- StatefulSets
- PodDisruptionBudgets
- PodAntiAffinity
- kubectl CLI

You must have a cluster with at least four nodes, and each node requires at least 2 CPUs and 4 GiB of memory. In this tutorial you will cordon and drain the cluster's nodes. **This means that the cluster will terminate and evict all Pods on its nodes, and the nodes will temporarily become unschedulable.** You should use a dedicated cluster for this tutorial, or you should ensure that the disruption you cause will not interfere with other tenants.

This tutorial assumes that you have configured your cluster to dynamically provision
PersistentVolumes. If your cluster is not configured to do so, you
will have to manually provision three 20 GiB volumes before starting this
tutorial.

## Objectives

After this tutorial, you will know the following.

- How to deploy a ZooKeeper ensemble using StatefulSet.
- How to consistently configure the ensemble.
- How to spread the deployment of ZooKeeper servers in the ensemble.
- How to use PodDisruptionBudgets to ensure service availability during planned maintenance.

### ZooKeeper

Apache ZooKeeper is a
distributed, open-source coordination service for distributed applications.
ZooKeeper allows you to read, write, and observe updates to data. Data are
organized in a file system like hierarchy and replicated to all ZooKeeper
servers in the ensemble (a set of ZooKeeper servers). All operations on data
are atomic and sequentially consistent. ZooKeeper ensures this by using the
Zab
consensus protocol to replicate a state machine across all servers in the ensemble.

The ensemble uses the Zab protocol to elect a leader, and the ensemble cannot write data until that election is complete. Once complete, the ensemble uses Zab to ensure that it replicates all writes to a quorum before it acknowledges and makes them visible to clients. Without respect to weighted quorums, a quorum is a majority component of the ensemble containing the current leader. For instance, if the ensemble has three servers, a component that contains the leader and one other server constitutes a quorum. If the ensemble can not achieve a quorum, the ensemble cannot write data.

ZooKeeper servers keep their entire state machine in memory, and write every mutation to a durable WAL (Write Ahead Log) on storage media. When a server crashes, it can recover its previous state by replaying the WAL. To prevent the WAL from growing without bound, ZooKeeper servers will periodically snapshot them in memory state to storage media. These snapshots can be loaded directly into memory, and all WAL entries that preceded the snapshot may be discarded.
