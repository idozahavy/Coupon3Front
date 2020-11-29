import { Category } from './Category';

export class Coupon {
  constructor(
    public id: number,
    public companyId: number,
    public category: Category,
    public title: string,
    public description: string,
    public startDate: Date,
    public endDate: Date,
    public amount: number,
    public price: number,
    public image: string
  ) {}
}
