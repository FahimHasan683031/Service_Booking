import { z } from 'zod';

export const createBookingZodSchema = z.object({
  body: z.object({
    service: z.string({ required_error: "Service ID is required" }),
    date: z.coerce.date({ required_error: "Date is required" }),
    time: z.enum([
      "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
      "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
      "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
      "9:00 PM", "10:00 PM"
    ], { required_error: "Time is required" }),
    status: z.enum(["pending", "accepted", "completed", "cancelled"]).optional(),
    paymentStatus: z.enum(["unpaid", "paid", "refunded"]).optional()
  })
});


const updateBookingZodSchema = z.object({

  date: z.coerce.date().optional(),
  time: z.enum([
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
    "9:00 PM", "10:00 PM"
  ]).optional(),
  status: z.enum(["pending", "accepted", "completed", "cancelled"]).optional(),
});

export const BookingValidation = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
