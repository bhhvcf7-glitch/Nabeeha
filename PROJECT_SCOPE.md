# Nabeeha — Implementation Scope / نطاق التطوير

## Integrated in the attached mobile application

- A new **Guardian PRISM** bilingual (Arabic/English) simulator screen reachable from **Profile → Guardian PRISM**.
- A risk-stepper for transaction-fraud probability, explainable allow/verify/block decision and modelled SAR losses.
- Mixed attacker residual risk (password theft / session theft / social engineering).
- Evidence-aware hold-value modelling, evidence toggle E0/E2, and threshold calculations.
- Fourteen reproducible tests for the **JavaScript Guardian PRISM module**.
- Updated README, security policy, and a six-page research report.

## Important distinctions

The pre-existing Nabeeh Bank app has many English-language screens. **The newly added Guardian PRISM screen is bilingual**; a complete application-wide localization is future work. Existing code was preserved, with minimal navigation changes.

The test set covers **mathematical risk-decision logic** only. It does not establish that the full banking application is secure, or that financial authorization is protected by cryptographic intent binding.

## Roadmap

1. Full app-wide i18n (Arabic RTL + English), accessibility audit, QA on iOS and Android.
2. Harden authentication (replace demo accounts, persistent replay defense, passkey/WebAuthn).
3. Enforce real authorization boundaries and server-side transaction validation.
4. GuardianBench with independently evaluated datasets and confidence intervals.
5. Privacy-preserving pilot under an authorized institutional partner.
