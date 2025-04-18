/**
 * End‑to‑end tests for Colombian (EASPBV) mapping via the parseQR use‑case.
 *
 * We feed three distinct QR samples and verify the final mapped object for CO mode.
 */

import { parseQR, QRParseMode } from '../../../../src';

const QR1 =
    '00020101021226320014CO.COM.CRB.LLA0210300101010149250014CO.COM.CRB.RED0103CRB5204000053031705406100.53550202560510.005802CO5913Comerc de Pru6006CIUDAD610612345682270014CO.COM.CRB.IVA010510.0083300015CO.COM.CRB.BASE01071000.0084250015CO.COM.CRB.CINC01020290600016CO.COM.CRB.TRXID01365cec56af-9c08-4c54-acff-c55a45fe1f1f91860014CO.COM.CRB.SEC0164abcfakehashcafef00ddeadbeef1234567890deadbeefcafebabef00dbabe12380270016CO.COM.CRB.CANAL0103POS81250015CO.COM.CRB.CIVA01020385270014CO.COM.CRB.INC010550.0099310015CO.COM.CRB.DESC0102010602006304CADC';

const QR2 =
    '0002015502010102125802CO5919COMERCE TEST NAME S49250103RBM0014CO.COM.RBM.RED903001061017760016CO.COM.RBM.TRXID80270103APP0016CO.COM.RBM.CANAL91460124GUF0xSSTpRVM+lvm0v0EfNXe0014CO.COM.RBM.SEC81250102030015CO.COM.RBM.CIVA601566572 PUEBLO RI8223010100014CO.COM.RBM.IVA503001091234567890013CO.COM.RBM.CU6105665728324010100015CO.COM.RBM.BASE62200703000080200110363184250102030015CO.COM.RBM.CINC520400008523010100014CO.COM.RBM.INC530317064290002ES0119COMERCE TEST NAME S540413566304BDA9';

const QR3 =
    '000201550202010211560105802CO5911MERCHNAMEDO49250103RBM0014CO.COM.RBM.RED903001060000000016CO.COM.RBM.TRXID80270103APP0016CO.COM.RBM.CANAL91460124Y75LNJWeHRvIt3I5SD+O2ARZ0014CO.COM.RBM.SEC81250102030015CO.COM.RBM.CIVA601211001 BOGOTA8223010100014CO.COM.RBM.IVA503001091234567890013CO.COM.RBM.CU6105110018324010100015CO.COM.RBM.BASE62200303003070300008020084250102030015CO.COM.RBM.CINC520400008523010100014CO.COM.RBM.INC530317064210002ES0111MERCHNAMEDO63046C17';

describe('parseQR CO mode (Colombian mapping) – QR1', () => {
    it('maps all expected CO fields for QR1', () => {
        const out = parseQR(QR1, { parseMode: QRParseMode.CO });
        const co = out as Record<string, any>;

        // merchantAccountInfo
        expect(co.merchantAccountInfo).toEqual({
            gui: "CO.COM.CRB.LLA",
            rawType: "02",
            type: "MOBILE_NUMBER",
            value: "3001010101",
        });

        // acquirerNetworkId
        expect(co.acquirerNetworkId).toEqual({
            gui: "CO.COM.CRB.RED",
            networkId: "CRB",
            networkName: "Credibanco",
        });

        // VAT
        expect(co.vatValue).toEqual({
            gui: "CO.COM.CRB.IVA",
            value: "10.00",
        });
        expect(co.vatBase).toEqual({
            gui: "CO.COM.CRB.BASE",
            value: "1000.00",
        });

        // Increments
        expect(co.incCondition).toEqual({
            gui: "CO.COM.CRB.CINC",
            value: "02",
        });
        expect(co.incValue).toEqual({
            gui: "CO.COM.CRB.INC",
            value: "50.00",
        });

        // Transaction ID & Security
        expect(co.transactionId).toEqual({
            gui: "CO.COM.CRB.TRXID",
            value: expect.stringMatching(/^[0-9a-fA-F-]{36}$/),
        });
        expect(co.securityField).toEqual({
            gui: "CO.COM.CRB.SEC",
            securityHash: expect.any(String),
        });

        // Channel
        expect(co.channel).toEqual({
            gui: "CO.COM.CRB.CANAL",
            rawType: "01",
            type: "channel",
            value: "POS",
        });

        // Conditions & Discount
        expect(co.vatCondition).toEqual({
            gui: "CO.COM.CRB.CIVA",
            value: "03",
        });
        expect(co.discountField).toEqual({
            gui: "CO.COM.CRB.DESC",
            discountIndicator: "01",
            discountConsultation: "00",
        });

        // Basic fields
        expect(co.payloadFormatIndicator).toBe("01");
        expect(co.pointOfInitiationMethod).toBe("12");
        expect(co.transactionCurrency).toBe("170");
        expect(co.transactionAmount).toBe("100.53");
        expect(co.tipOrConvenienceIndicator).toBe("02");
        expect(co.valueOfConvenienceFeeFixed).toBe("10.00");
        expect(co.merchantName).toBe("Comerc de Pru");
        expect(co.merchantCity).toBe("CIUDAD");
        expect(co.postalCode).toBe("123456");
        expect(co.crc).toBe("CADC");
    });
});

describe('parseQR CO mode (Colombian mapping) – QR2', () => {
    it('maps RBM network and optional transferProductType for QR2', () => {
        const output = parseQR(QR2, { parseMode: QRParseMode.CO }) as Record<string, any>;

        // Core fields
        expect(output.payloadFormatIndicator).toBe("01");
        expect(output.tipOrConvenienceIndicator).toBe("01");
        expect(output.pointOfInitiationMethod).toBe("12");
        expect(output.countryCode).toBe("CO");
        expect(output.merchantName).toBe("COMERCE TEST NAME S");
        expect(output.transactionCurrency).toBe("170");
        expect(output.transactionAmount).toBe("1356");

        // Acquirer Network
        expect(output.acquirerNetworkId).toMatchObject({
            gui: "CO.COM.RBM.RED",
            networkId: "RBM",
            networkName: "Redeban",
        });

        // Transaction ID
        expect(output.transactionId).toMatchObject({
            value: "101776",
            gui: "CO.COM.RBM.TRXID",
        });

        // Channel & Security
        expect(output.channel).toMatchObject({
            gui: "CO.COM.RBM.CANAL",
            rawType: "01",
            type: "channel",
            value: "APP",
        });
        expect(output.securityField).toMatchObject({
            gui: "CO.COM.RBM.SEC",
            securityHash: "GUF0xSSTpRVM+lvm0v0EfNXe",
        });

        // VAT & Base
        expect(output.vatCondition).toMatchObject({
            gui: "CO.COM.RBM.CIVA",
            value: "03",
        });
        expect(output.vatValue).toMatchObject({
            gui: "CO.COM.RBM.IVA",
            value: "0",
        });
        expect(output.vatBase).toMatchObject({
            gui: "CO.COM.RBM.BASE",
            value: "0",
        });

        // Increment
        expect(output.incCondition).toMatchObject({
            gui: "CO.COM.RBM.CINC",
            value: "03",
        });
        expect(output.incValue).toMatchObject({
            gui: "CO.COM.RBM.INC",
            value: "0",
        });

        // Merchant ID & Location
        expect(output.merchantId).toMatchObject({
            gui: "CO.COM.RBM.CU",
            value: "123456789",
        });
        expect(output.postalCode).toBe("66572");
        expect(output.merchantCity).toBe("66572 PUEBLO RI");

        // Additional Data & Language Template
        expect(output.additionalDataFieldTemplate).toMatchObject({
            terminalLabel: "000",
            purposeOfTransaction: "00",
            promotionCode: "631",
        });
        expect(output.merchantInformationLanguageTemplate).toMatchObject({
            languageCode: "ES",
            merchantNameAlt: "COMERCE TEST NAME S",
        });

        // CRC
        expect(output.crc).toBe("BDA9");
    });
});

describe('parseQR CO mode (Colombian mapping) – QR3', () => {
    it('handles spaces in merchantName and consumerDataRequest for QR3', () => {
        const output = parseQR(QR3, { parseMode: QRParseMode.CO }) as Record<string, any>;

        // Basic fields
        expect(output.payloadFormatIndicator).toBe("01");
        expect(output.tipOrConvenienceIndicator).toBe("02");
        expect(output.pointOfInitiationMethod).toBe("11");
        expect(output.countryCode).toBe("CO");
        expect(output.transactionCurrency).toBe("170");
        expect(output.transactionId.value).toBe("000000");

        // Merchant info
        expect(output.merchantName).toBe("MERCHNAMEDO");
        expect(output.merchantCity).toBe("11001 BOGOTA");
        expect(output.postalCode).toBe("11001");

        // Language Template
        expect(output.merchantInformationLanguageTemplate).toMatchObject({
            languageCode: "ES",
            merchantNameAlt: "MERCHNAMEDO",
        });

        // Acquirer & Channel & Security
        expect(output.acquirerNetworkId).toMatchObject({
            gui: "CO.COM.RBM.RED",
            networkId: "RBM",
            networkName: "Redeban",
        });
        expect(output.channel).toMatchObject({
            gui: "CO.COM.RBM.CANAL",
            rawType: "01",
            type: "channel",
            value: "APP",
        });
        expect(output.securityField).toMatchObject({
            gui: "CO.COM.RBM.SEC",
            securityHash: "Y75LNJWeHRvIt3I5SD+O2ARZ",
        });

        // VAT, Base & Condition
        expect(output.vatValue).toMatchObject({
            gui: "CO.COM.RBM.IVA",
            value: "0",
        });
        expect(output.vatBase).toMatchObject({
            gui: "CO.COM.RBM.BASE",
            value: "0",
        });
        expect(output.vatCondition).toMatchObject({
            gui: "CO.COM.RBM.CIVA",
            value: "03",
        });

        // Merchant ID & Increments
        expect(output.merchantId).toMatchObject({
            gui: "CO.COM.RBM.CU",
            value: "123456789",
        });
        expect(output.incCondition).toMatchObject({
            gui: "CO.COM.RBM.CINC",
            value: "03",
        });
        expect(output.incValue).toMatchObject({
            gui: "CO.COM.RBM.INC",
            value: "0",
        });

        // Additional Data Field Template
        expect(output.additionalDataFieldTemplate).toMatchObject({
            storeLabel: "003",
            terminalLabel: "000",
            purposeOfTransaction: "00",
        });

        // CRC
        expect(output.crc).toBe("6C17");
    });
});

describe('parseQR CO mode (Colombian mapping) – QR4 (JACK DOM BLACK OCCONNE)', () => {
    const QR4 =
        '000201550202010211560105802CO5922JACK DOM BLACK OCCONNE49250103RBM0014CO.COM.RBM.RED903001060000000016CO.COM.RBM.TRXID80270103APP0016CO.COM.RBM.CANAL91460124uVWtfvHZBxdIB8mb7kGWUYu10014CO.COM.RBM.SEC81250102030015CO.COM.RBM.CIVA601211001 BOGOTA8223010100014CO.COM.RBM.IVA503001091234567890013CO.COM.RBM.CU6105110018324010100015CO.COM.RBM.BASE62200303009070300008020084250102030015CO.COM.RBM.CINC520400008523010100014CO.COM.RBM.INC530317064320002ES0122JACK DOM BLACK OCCONNE63046FBB';

    it('maps all expected CO fields for QR4', () => {
        const out = parseQR(QR4, { parseMode: QRParseMode.CO });
        const co = out as Record<string, any>;

        // Basic indicators
        expect(co.payloadFormatIndicator).toBe('01');
        expect(co.tipOrConvenienceIndicator).toBe('02');
        expect(co.pointOfInitiationMethod).toBe('11');
        expect(co.valueOfConvenienceFeeFixed).toBe('0');
        expect(co.countryCode).toBe('CO');

        // Merchant name
        expect(co.merchantName).toBe('JACK DOM BLACK OCCONNE');

        // Acquirer network
        expect(co.acquirerNetworkId).toMatchObject({
            gui: 'CO.COM.RBM.RED',
            networkId: 'RBM',
            networkName: 'Redeban',
        });

        // Transaction ID
        expect(co.transactionId).toMatchObject({
            gui: 'CO.COM.RBM.TRXID',
            value: '000000',
        });

        // Channel
        expect(co.channel).toMatchObject({
            gui: 'CO.COM.RBM.CANAL',
            rawType: '01',
            type: 'channel',
            value: 'APP',
        });

        // Security field
        expect(co.securityField).toMatchObject({
            gui: 'CO.COM.RBM.SEC',
            securityHash: 'uVWtfvHZBxdIB8mb7kGWUYu1',
        });

        // VAT and base
        expect(co.vatCondition).toMatchObject({
            gui: 'CO.COM.RBM.CIVA',
            value: '03',
        });
        expect(co.vatValue).toMatchObject({
            gui: 'CO.COM.RBM.IVA',
            value: '0',
        });
        expect(co.vatBase).toMatchObject({
            gui: 'CO.COM.RBM.BASE',
            value: '0',
        });

        // Merchant ID and location
        expect(co.merchantId).toMatchObject({
            gui: 'CO.COM.RBM.CU',
            value: '123456789',
        });
        expect(co.postalCode).toBe('11001');
        expect(co.merchantCity).toBe('11001 BOGOTA');

        // Additional data field template
        expect(co.additionalDataFieldTemplate).toMatchObject({
            storeLabel: '009',
            terminalLabel: '000',
            purposeOfTransaction: '00',
        });

        // Increments
        expect(co.incCondition).toMatchObject({
            gui: 'CO.COM.RBM.CINC',
            value: '03',
        });
        expect(co.incValue).toMatchObject({
            gui: 'CO.COM.RBM.INC',
            value: '0',
        });

        // Merchant category code (fallback subtag mapping)
        expect(co.merchantCategoryCode).toEqual({ '00': '' });

        // Language template
        expect(co.merchantInformationLanguageTemplate).toEqual({
            languageCode: 'ES',
            merchantNameAlt: 'JACK DOM BLACK OCCONNE',
        });

        // Transaction currency and CRC
        expect(co.transactionCurrency).toBe('170');
        expect(co.crc).toBe('6FBB');
    });
});


describe('parseQR CO mode (Colombian mapping) – QR3', () => {
    it('handles spaces in merchantName and consumerDataRequest for QR3', () => {
        const qr4 = '000201550202010211560105802CO5922JACK DOM BLACK OCCONNE49250103RBM0014CO.COM.RBM.RED903001060000000016CO.COM.RBM.TRXID80270103APP0016CO.COM.RBM.CANAL91460124uVWtfvHZBxdIB8mb7kGWUYu10014CO.COM.RBM.SEC81250102030015CO.COM.RBM.CIVA601211001 BOGOTA8223010100014CO.COM.RBM.IVA503001091234567890013CO.COM.RBM.CU6105110018324010100015CO.COM.RBM.BASE62200303009070300008020084250102030015CO.COM.RBM.CINC520400008523010100014CO.COM.RBM.INC530317064320002ES0122JACK DOM BLACK OCCONNE63046FBB';
        const output = parseQR(QR3, { parseMode: QRParseMode.TLV }) as Record<string, any>;
        console.log(JSON.stringify(output))

    })
});
