# Dependabot alerts vs npm audit (2026-09-01)

## Verdict

**All 35 open GitHub Dependabot alerts are STALE** relative to `main` lockfile / `npm audit`.

| Check | Result |
| --- | --- |
| Default branch | `main` |
| Lockfile committed | `package-lock.json` (lockfileVersion 3) |
| `dependabot.yml` | present (npm + github-actions, weekly) |
| `npm audit` on `main` | **0 vulnerabilities** |
| Overrides on `main` | `nanoid@3.3.18`, `js-yaml@4.3.1`, `brace-expansion@1.1.18`, `postcss@8.5.26` (direct + override) |

## Installed vs advisory (evidence)

| Package | Alert wants | Installed on `main` | Classification |
| --- | --- | --- | --- |
| next | patched in 15.5.x line (`<15.5.16`/`<15.5.21` ranges) | **16.3.4** | STALE (outside vulnerable ranges) |
| nanoid | `>=3.3.18` | **3.3.18** (override) | STALE / fixed |
| js-yaml | `>=4.3.1` | **4.3.1** (override) | STALE / fixed |
| postcss | `>8.5.22` / `>=8.5.18` | **8.5.23** (next) + **8.5.26** (root) | STALE / fixed |
| brace-expansion | `>=1.1.16` / `>=5.0.7` for 3.x line | **1.1.18** (override; not in 3.x vulnerable band) | STALE / fixed |
| sharp | `>=0.35.0` | **0.35.4** (via next) | STALE / fixed |
| ws | various `<8.21.0` | **not in dependency tree** | STALE / not present |

## Why GitHub still shows alerts

Alert `updated_at` timestamps remain in **July–August 2026** even after Next 16 + security override merges on **2026-09-01**. The dependency graph snapshot did not auto-reconcile. `dependabot_security_updates` is **disabled** (alerts UI still lists historical findings).

This commit refreshes `package-lock.json` / overrides to force a legitimate dependency-graph reparse.

## REAL vulnerabilities

**None** for the current installed tree (`npm audit` total 0; all alert packages patched or absent).
