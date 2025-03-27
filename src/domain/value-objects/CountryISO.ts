export type CountryISOValue = 'PE' | 'CL';

export class CountryISO {
    private readonly value: CountryISOValue;

    constructor(value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid country ISO. It must be either "PE" or "CL".');
        }
        this.value = value as CountryISOValue;
    }

    private isValid(value: string): boolean {
        return value === 'PE' || value === 'CL';
    }

    toString(): string {
        return this.value;
    }

    equals(other: CountryISO): boolean {
        return this.value === other.value;
    }

    isPeru(): boolean {
        return this.value === 'PE';
    }

    isChile(): boolean {
        return this.value === 'CL';
    }
}