export class InsuredId {
    private readonly value: string;

    constructor(value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid insured ID. It must be a 5-digit string.');
        }
        this.value = value.padStart(5, '0');
    }

    private isValid(value: string): boolean {
        return /^\d{1,5}$/.test(value);
    }

    toString(): string {
        return this.value;
    }
}