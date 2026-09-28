import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { desc } from "drizzle-orm";
import { db } from "../database";
import * as schema from "../database/schema";
import { sendEmail } from "../services/email";

const NOTIFY_EMAIL = "dagook1869@daum.net";

const createSchema = z.object({
  company: z.string().min(1),
  name: z.string().min(1),
  tel: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  type: z.string().optional(),
  message: z.string().min(1),
});

export const inquiries = new Hono()
  .post("/", zValidator("json", createSchema), async (c) => {
    const input = c.req.valid("json");
    const [inquiry] = await db.insert(schema.inquiries).values(input).returning();

    try {
      await sendEmail({
        to: NOTIFY_EMAIL,
        subject: `[다국텍스타일 문의] ${input.company} - ${input.name}`,
        replyTo: input.email || undefined,
        html: `
          <h2>새 비즈니스 문의가 접수되었습니다</h2>
          <p><b>업체명:</b> ${input.company}</p>
          <p><b>담당자:</b> ${input.name}</p>
          <p><b>연락처:</b> ${input.tel ?? "-"}</p>
          <p><b>이메일:</b> ${input.email}</p>
          <p><b>문의 유형:</b> ${input.type ?? "-"}</p>
          <p><b>내용:</b></p>
          <p style="white-space:pre-wrap;">${input.message}</p>
        `,
      });
    } catch (err) {
      console.error("Failed to send inquiry notification email:", err);
    }

    return c.json(inquiry, 200);
  })
  .get("/", async (c) => {
    const password = c.req.header("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const list = await db.select().from(schema.inquiries).orderBy(desc(schema.inquiries.createdAt));
    return c.json(list, 200);
  });
