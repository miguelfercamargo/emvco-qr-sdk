![EMVCo QR SDK Banner](https://raw.githubusercontent.com/miguelfercamargo/emvco-qr-sdk/refs/heads/main/assets/banner.jpg)
# emvco-qr-sdk
[![TypeScript](https://img.shields.io/badge/typescript-^5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)](https://nodejs.org/)
[![Jest](https://img.shields.io/badge/tested%20with-jest-99424f.svg)](https://jestjs.io/)
[![License](https://img.shields.io/badge/license-ISC-lightgrey.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Node.js%20%7C%20Browser-blue)](#)

> A robust, zero-dependency TypeScript SDK to decode, validate, and map **EMVCo-compliant QR codes** for digital payment systems.

`emvco-qr-sdk` provides a full-featured, extensible parser for QR codes that follow the [EMVCo Merchant Presented Mode](https://www.emvco.com/emv-technologies/qrcodes/) format.  
It is **cross-platform**, with support for **Node.js and browser environments**, and does **not rely on any external dependencies**.

---

## ✨ Features

- 🧠 **EMVCo TLV Parsing Engine**  
  Decode raw QR strings using the official Tag-Length-Value format defined by the EMVCo specification.

- 🔀 **Nested Tag Support**  
  Automatically parses and reconstructs deeply nested TLV structures, commonly found in interoperable payment systems.

- 🌍 **Regional Mapping Strategies**  
  Supports both standard global mappings and region-specific mappings like **Colombia (EASPBV)**, returning human-readable field names for better integration.

- 🏷️ **Multiple Output Modes**  
  Choose from:
    - `TLV`: Raw parsed tag entities (`TlvEntity[]`)
    - `RAW_OBJECT`: Raw key/value object by tag
    - `GLOBAL` or `CO`: Named object output with optional subtag resolution

- ✅ **CRC-16/CCITT-FALSE Checksum Validation**  
  Built-in cyclic redundancy check to ensure QR string integrity, following EMVCo guidelines.

- 🔍 **Validation Utilities**  
  Validate QR format, structure, and checksum before processing. Ensures reliable QR handling in secure applications.

- 📦 **Zero Dependencies & Tree-shakeable**  
  No external libraries required. Fully optimized for bundlers like Webpack, Vite, or Rollup.

- 🌐 **Cross-platform Compatibility**  
  Runs seamlessly in:
    - Web Browsers
    - Node.js
    - React Native
    - Serverless environments

- 🧪 **100% TypeScript & Fully Tested**  
  Strong typings for auto-completion and refactoring. Built with modern TypeScript and tested with **Jest**.

---

## 📦 Installation

```bash
npm install emvco-qr-sdk
# or
yarn add emvco-qr-sdk
```
---
## 🚀 Usage Examples

### ✅ 1. TLV Mode – Return Raw TLV Entities

```ts
import { parseQR, QRParseMode } from 'emvco-qr-sdk';

const tlvs = parseQR(rawQR, { parseMode: QRParseMode.TLV });

console.log(tlvs);
```

Returns:

```json
[
  { "tag": "00", "value": "01", "length": 2 },
  { "tag": "53", "value": "170", "length": 3 },
  { "tag": "54", "value": "100.53", "length": 6 },
  { "tag": "59", "value": "Fulano de Tal", "length": 13 },
  { "tag": "60", "value": "BOGOTA", "length": 6 },
  { "tag": "63", "value": "CADC", "length": 4 }
]
```

---

### 📦 2. RAW_OBJECT Mode – Flat Raw Tags with Optional Nested Subtags

```ts
const raw = parseQR(rawQR, { parseMode: QRParseMode.RAW_OBJECT });

console.log(raw);
```

Returns:

```json
{
  "00": "01",
  "53": "170",
  "54": "100.53",
  "59": "Fulano de Tal",
  "60": "BOGOTA",
  "63": "CADC",
  "80": {
    "00": "CO.COM.CRB.CANAL",
    "01": "POS"
  },
  "90": {
    "00": "CO.COM.CRB.TRXID",
    "01": "a1777581-6d1a-4b60-b3a9-b695f3562c55"
  }
}
```

---

### 🌍 3. GLOBAL Mode – Named Fields Based on EMVCo Standards

```ts
const global = parseQR(rawQR, { parseMode: QRParseMode.GLOBAL });

console.log(global);
```

Returns:

```json
{
  "payloadFormatIndicator": "01",
  "transactionCurrency": "170",
  "transactionAmount": "100.53",
  "merchantName": "Fulano de Tal",
  "merchantCity": "BOGOTA",
  "crc": "CADC",
  "channel": {
    "00": "CO.COM.CRB.CANAL",
    "01": "POS"
  },
  "transactionId": {
    "00": "CO.COM.CRB.TRXID",
    "01": "a1777581-6d1a-4b60-b3a9-b695f3562c55"
  }
}
```

---
### 🇨🇴 4. CO Mode – Colombian EASPBV Enhanced Mapping

```ts
import { parseQR, QRParseMode } from 'emvco-qr-sdk';

const parsed = parseQR(rawQR, { parseMode: QRParseMode.CO });

console.log(parsed);
```

Returns:

```ts
{
  payloadFormatIndicator: "01",
  pointOfInitiationMethod: "12",
  merchantAccountInfo: {
    gui: "CO.COM.CRB.LLA",
    rawType: "02",
    type: "MOBILE_NUMBER",
    value: "3191231234"
  },
  transactionCurrency: "170",
  transactionAmount: "100.53",
  merchantName: "Fulano de Tal",
  merchantCity: "BOGOTA",
  channel: {
    gui: "CO.COM.CRB.CANAL",
    channel: "POS"
  },
  transactionId: {
    gui: "CO.COM.CRB.TRXID",
    transactionId: "a1777581-6d1a-4b60-b3a9-b695f3562c55"
  },
  securityField: {
    gui: "CO.COM.CRB.SEC",
    securityHash: "caf0f93160949f2c96d7f0ed4473eab8ba53fadf9cd29bc518507fe879266145"
  },
  vatValue: {
    gui: "CO.COM.CRB.IVA",
    vatValueOrPercentage: "10.00"
  },
  vatBase: {
    gui: "CO.COM.CRB.BASE",
    vatBaseValue: "1000.00"
  },
  incCondition: {
    gui: "CO.COM.CRB.CINC",
    incCondition: "02"
  },
  incValue: {
    gui: "CO.COM.CRB.INC",
    incValueOrPercentage: "50.00"
  },
  discountField: {
    gui: "CO.COM.CRB.DESC",
    discountIndicator: "01",
    discountConsultation: "00"
  },
  crc: "CADC"
}
```

🧩 This mode uses Colombia's extended EMVCo specification (EASPBV) to map structured information such as:

- 🔑 **merchantAccountInfo**: the interoperable key used (cell phone, email, NIT, etc.)
- 🧾 `vatValue`, `vatCondition`, `vatBase`
- 📌 `channel`, `transactionId`, `securityField`
- 💸 `discountField` with breakdowns
- 🏷️ Each field includes internal identifiers like `gui` and `type` to help systems interpret the format

> 🧠 This is ideal for any **payment app, merchant system, or validator** working with the Colombian QR regulation EASPBV.
---
### 🧹5. Full Parsing with `parseFullQR`

This method returns a full structured object including:

- `named`: A mapped object with field names (standard or Colombian).
- `raw`: The raw object preserving tag codes.
- `tlvs`: The full array of parsed TLV entities.
- `crc`: Validates the checksum.
- `meta`: Metadata about format, version, and region.

```ts
import { parseFullQR, QRParseMode } from 'emvco-qr-sdk';

const rawQR = '00020101021226360014CO.COM.CRB.LLA0210319123123453021705406100.535902Fulano de Tal6006BOGOTA800016CO.COM.CRB.CANAL0103POS900016CO.COM.CRB.TRXID0136a1777581-6d1a-4b60-b3a9-b695f3562c556304CADC';

const result = parseFullQR(rawQR, { parseMode: QRParseMode.CO });

console.log(result);
```

Returns:

```ts
{
  named: {
    payloadFormatIndicator: "01",
    pointOfInitiationMethod: "12",
    merchantAccountInfo: {
      gui: "CO.COM.CRB.LLA",
      rawType: "02",
      type: "MOBILE_NUMBER",
      value: "3191231234"
    },
    transactionCurrency: "170",
    transactionAmount: "100.53",
    merchantName: "Fulano de Tal",
    merchantCity: "BOGOTA",
    channel: {
      gui: "CO.COM.CRB.CANAL",
      channel: "POS"
    },
    transactionId: {
      gui: "CO.COM.CRB.TRXID",
      transactionId: "a1777581-6d1a-4b60-b3a9-b695f3562c55"
    },
    crc: "CADC"
  },
  raw: {
    "00": "01",
    "01": "12",
    "26": {
      "00": "CO.COM.CRB.LLA",
      "02": "3191231234"
    },
    "53": "170",
    "54": "100.53",
    "59": "Fulano de Tal",
    "60": "BOGOTA",
    "80": {
      "00": "CO.COM.CRB.CANAL",
      "01": "POS"
    },
    "90": {
      "00": "CO.COM.CRB.TRXID",
      "01": "a1777581-6d1a-4b60-b3a9-b695f3562c55"
    },
    "63": "CADC"
  },
  tlvs: [
    // Array of parsed TlvEntity instances
  ],
  crc: {
    value: "CADC",
    isValid: true
  },
  meta: {
    format: "EMVCO",
    version: "01",
    region: "CO"
  }
}
```


---
## 🧾 Change Log

You can find the changelog in the [Releases section](https://github.com/your-org/emvco-qr-sdk/releases).  
We follow [Semantic Versioning](https://semver.org/).

---

## 📘 References

- [EMV® QR Code Specification – Merchant-Presented Mode v1.1](https://www.emvco.com/emv-technologies/qrcodes/)
- [EASPBV Colombia 2024 TLV Specification](https://www.achcolombia.com.co/)
- [CRC-16/CCITT-FALSE](https://en.wikipedia.org/wiki/Cyclic_redundancy_check)

---

## 📄 License

Licensed under the [ISC License](LICENSE).

---

