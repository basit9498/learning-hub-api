import cron from "node-cron";
import NotificationModel from "../models/notification.model";

export const cronJob = () => {
  // delete the Notification after 30 days
  cron.schedule("0 0 0 * * *", async function () {
    const thirtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await NotificationModel.deleteMany({
      status: "read",
      createdAt: { $lt: thirtyDayAgo },
    });
    console.log("Deleted read notification");
  });
};
