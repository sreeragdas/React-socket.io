export interface ICard {
    type: 'card';
    transactionId: string;
    bankName: string;
}

export interface ICash {
    type: 'cash';
    cashReceived: string;
    totalAmount: string;
    balanceGiven: string;
}
