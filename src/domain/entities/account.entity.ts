
export class AccountEntity {
    constructor(
        public readonly id: string,
        public readonly amount: number,
        public readonly balance: number,
        public readonly userId: string,
        public readonly active: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly description?: string,
        public readonly name?: string,
    ) { }
}