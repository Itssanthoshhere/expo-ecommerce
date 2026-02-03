import { requireAuth, clerkClient } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId)
        return res
          .status(401)
          .json({ message: "Unauthorized - invalid token" });

      let user = await User.findOne({ clerkId });
      if (!user) return res.status(404).json({ message: "User not found" });

      // If email is missing or "unknown", sync from Clerk (webhook may have missed it)
      const needsEmailSync =
        !user.email || user.email.trim().toLowerCase() === "unknown";
      if (needsEmailSync) {
        try {
          const clerkUser = await clerkClient.users.getUser(clerkId);
          const primaryEmail =
            clerkUser.primaryEmailAddress?.emailAddress ||
            clerkUser.emailAddresses?.[0]?.emailAddress;
          if (primaryEmail) {
            // Avoid E11000: only save if no other user already has this email
            const existingWithEmail = await User.findOne({
              email: primaryEmail,
              _id: { $ne: user._id },
            });
            if (!existingWithEmail) {
              user.email = primaryEmail;
              await user.save();
            } else {
              // Duplicate: use Clerk email for this request so admin check still works
              user.email = primaryEmail;
            }
          }
        } catch (err) {
          if (err.code === 11000) {
            console.warn(
              "Sync skipped: another user already has this email (duplicate record).",
              err.message,
            );
          } else {
            console.error("Failed to sync email from Clerk:", err.message);
          }
        }
      }

      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized - user not found" });
  }

  // Normalize emails for comparison (case-insensitive, trimmed)
  const userEmail = req.user.email?.trim().toLowerCase();
  const adminEmail = ENV.ADMIN_EMAIL?.trim().toLowerCase();

  if (!adminEmail) {
    console.error("ADMIN_EMAIL is not configured in environment variables");
    return res.status(500).json({
      message: "Server configuration error - admin email not set",
    });
  }

  if (userEmail !== adminEmail) {
    return res.status(403).json({
      message:
        "Forbidden - admin access only. Set ADMIN_EMAIL in backend .env to your account email.",
    });
  }

  next();
};
