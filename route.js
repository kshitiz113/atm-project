import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // To get logged-in user details

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const cvv = url.searchParams.get("cvv");

    if (!cvv) {
      return NextResponse.json({ error: "CVV is required" }, { status: 400 });
    }

    // Get logged-in card number from session/cookies
    const card_no = cookies().get("card_no")?.value;

    if (!card_no) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Connect to the database
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "machine",
    });

    // Check if CVV and card number match
    const [result] = await db.execute(
      "SELECT CARD_BALANCE FROM card WHERE CARD_CVV = ? AND CARD_NO = ?",
      [cvv, card_no]
    );

    await db.end();

    if (result.length === 0) {
      return NextResponse.json({ error: "Invalid CVV or card number" }, { status: 403 });
    }

    return NextResponse.json({
      balance: result[0].CARD_BALANCE,
    });

  } catch (error) {
    console.error("❌ Error fetching balance:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
