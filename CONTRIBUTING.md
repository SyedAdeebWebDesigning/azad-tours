# 🤝 Contributing Guide

Welcome, developer. Before you touch the code, read this carefully.  
This project follows a structured workflow to keep the codebase clean, stable, and chaos-free.

---

## 🔐 Access Policy (Invite Only)

This repository is **invite-only** for contributors.

If you want to be part of the development team, send a request with:

- Your GitHub profile
- Your experience / skills
- How you can contribute

📧 Contact: **dev@azadtours.in**

Uninvited or low-quality access requests may be ignored.

---

## 🌿 Branching Strategy

We follow a **no direct push** policy.

### Protected Branches

- `main` → Production-ready, stable code only
- `dev` → Integration branch for tested features

🚫 **Direct push to `main` or `dev` is NOT allowed.**  
All changes must go through Pull Requests.

---

## 🌱 Creating a Branch

Create a new branch from `dev` based on what you're working on.

### Branch Naming Rules

| Type     | Format                         | Example                   |
| -------- | ------------------------------ | ------------------------- |
| Bug Fix  | `fix/<short-description>`      | `fix/navbar-ui-fix`       |
| Feature  | `feat/<short-description>`     | `feat/add-authentication` |
| Refactor | `refactor/<short-description>` | `refactor/api-cleanup`    |
| Docs     | `docs/<short-description>`     | `docs/update-readme`      |
| Style/UI | `style/<short-description>`    | `style/button-spacing`    |

### Rules

- Use **lowercase**
- Use **hyphens**, not spaces
- Keep names short and meaningful

---

## 🔧 Development Flow

1. Fork / Clone the repository
2. Checkout `dev` branch
   ```bash
   git checkout dev
   ```
