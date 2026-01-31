# Infrastructure Phase 2: Cloud Foundation (AWS)

**Goal**: A scalable, production-ready environment accessible to the public.

## 1. Architecture Design (AWS)
- [ ] **VPC**: Setup public/private subnets.
- [ ] **Load Balancer**: ALB handling traffic, routing `/api` to Platform (Node) and `/sim` to Simulation (Go).
- [ ] **ECS Cluster**: Fargate setup for Platform, Simulation, and Compiler services.

## 2. Infrastructure as Code (IaC)
- [ ] **Terraform/Pulumi**: Write scripts to provision:
    - RDS (Postgres).
    - ElastiCache (Redis).
    - ECR (Container Registry).
    - ECS Services.
- [ ] **State Management**: Store Terraform state in S3.

## 3. CI/CD Pipeline (GitHub Actions)
- [ ] **Lint & Test**: Run on every PR.
- [ ] **Build & Push**: On merge to `main`:
    - Build Docker images.
    - Push to ECR with commit SHA tag.
- [ ] **Deploy**: Update ECS Service definition with new image tag.

## 4. Monitoring & Logs
- [ ] **CloudWatch**: Stream container logs (stdout/stderr) to CloudWatch Logs.
- [ ] **Metrics**: Track CPU/RAM usage of Fargate tasks.
- [ ] **Alerting**: Set alarms for High Error Rate or Container Crash loops.
