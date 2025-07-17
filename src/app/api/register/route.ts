import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/data/users.json");

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    const id = Date.now().toString();

    const newUser = {
      id,
      name,
      email,
      password,
      height: "",
      weight: "",
      gender: "",
    };

    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
