export interface IExpense{
    id: number;
    title: string;
    type: "income"|"expense";
    cetegory: string;
    nominal: number;
    date: string;
}