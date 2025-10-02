// src/app/api/members/route.ts (or /api/users/route.ts)
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("GET request received for members");
    // Replace with your actual data source (e.g., database query)
    const members = [
      {
        member_id: 1,
        first_name: "Faith",
        last_name: "Koduen",
        phone_number: "0723056665",
        user_type: "MEMBER",
        national_id: "234156",
        kra_pin: "kra0980",
        next_of_kin_name: "Shabach Murithi",
        email: "faithkoduen@mail.com",
        next_of_kin_id: "345678",
      },
      // Add more mock data or fetch from DB
    ];
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("POST body:", body);
    // Replace with your actual save logic (e.g., database insert)
    const newMember = { ...body, id: Date.now() }; // Mock ID
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create member" },
      { status: 500 }
    );
  }
}