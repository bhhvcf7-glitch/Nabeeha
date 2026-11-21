# Security Policy / سياسة الأمان

Nabeeha is a **research-grade banking interface and fraud-response simulation**, not an authorized bank or real payment processing system. Never connect personal banking credentials or production payment rails to this demonstration.

## Important known limitations

- Some authentication examples and fixtures in the original prototype use **demonstration credentials**. Replace all fixtures with a properly reviewed authentication and identity layer before any deployment.
- Guardian PRISM models expected costs; the input probabilities are hypothetical and not validated detection scores.
- No real FIDO2/WebAuthn transaction signing, live banking integrations, or validated ML fraud detection is included.
- Any production deployment requires threat modeling, independent security testing, encryption, secure secret storage, rate limiting, privacy review, and observability.

Please avoid posting real vulnerability details publicly; contact the repository owner privately to coordinate responsible disclosure.
