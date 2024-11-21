import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { invoices, customers, revenue, users } from "../lib/placeholder-data";

const client = await db.connect();

async function listInvoices() {
  await client.sql`
    SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await listInvoices();
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error });
  }
}
