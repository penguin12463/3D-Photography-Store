import type { MockPrintSize } from "@/data/print-options";

export function findStartingPriceMinor(
    printSizes: MockPrintSize[],
): number | null {
    if (printSizes.length === 0) {
        return null;
    }

    return Math.min(
        ...printSizes.map((printSize) => printSize.priceMinor),
    );
}

export function formatPriceMinor(
    priceMinor: number,
    currency: string,
): string {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
    }).format(priceMinor / 100);
}