# Release checklist · starter-next-supabase

Short checklist before tagging or announcing this repo.

- [ ] **Env:** `PINARKIVE_API_KEY` set (e.g. `.env.local`); optional `PINARKIVE_API_BASE_URL`, `PINARKIVE_CLUSTER_ID` reviewed.
- [ ] **Install:** `npm install`
- [ ] **Lint:** `npm run lint`
- [ ] **Build:** `npm run build`
- [ ] **Manual test:** one real upload with a valid key; **CID** shows in UI.
- [ ] **Error path:** e.g. submit without file; confirm error message and non-success HTTP status.
- [ ] **GitHub:** description + topics (`pinarkive`, `ipfs`, `nextjs`, `typescript`, …).
- [ ] **Media (after publish):** add short + full demo GIFs; link from README **Preview assets**.
- [ ] **LICENSE** present at repo root.
