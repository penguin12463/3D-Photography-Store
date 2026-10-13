export type MockPrintSize = {
    id: string;
    label: string;
    longestEdgeCm: number;
    priceMinor: number;
};

export const storeCurrency = "GBP";

export const mockPrintSizes: MockPrintSize[] = [
    {
        id: "small-30cm",
        label: "30 cm",
        longestEdgeCm: 30,
        priceMinor: 4000,
    },
];