import { Types } from "mongoose";

export type IBooking = {
  service: Types.ObjectId;
  customer: Types.ObjectId;
  date: Date;
  time:
    | "9:00 AM" | "10:00 AM" | "11:00 AM" | "12:00 PM"
    | "1:00 PM" | "2:00 PM" | "3:00 PM" | "4:00 PM"
    | "5:00 PM" | "6:00 PM" | "7:00 PM" | "8:00 PM"
    | "9:00 PM" | "10:00 PM";
  status?: "pending" | "accepted" | "completed" | "cancelled";
  paymentStatus?: "unpaid" | "paid" | "refunded";
};

