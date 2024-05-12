/*import { db } from '@/lib/db';

async function createUser() {
  const newUser = await db.user.create({
    data: {
      email: 'test@example.com',
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword',
      // createdAt and updatedAt will be set automatically by Prisma
    },
  });

  console.log('Created new user:', newUser);
}

createUser().catch(e => {
  console.error(e);
  process.exit(1);
});
*/


/*import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        return NextResponse.json(body);
    } catch(error) {
        // handle error here
    }
}*/


import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db }  from "@/lib/db";
import * as z from "zod";

//Define a schema for input validation

const UserSchema  = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password:z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(3, "First name is required").max(100),
    lastName: z.string().min(3, "Last name is required").max(100)
})


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email,password, firstName, lastName } = UserSchema.parse(body);

        // Do something with the data
        // Check if the email exists in the database
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            // If the user exists, return an error
            return NextResponse.json({ user: null, message: "User with this email already exists"}, {status: 409 })
        }

        /*
        //check if the username exists in the database
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if (existingUserByUsername) {
            // If the user exists, return an error
            return NextResponse.json({ user: null, message: "User with this username already exists"}, {status: 409   
        }*/

        // Hash the password before storing it in the database using bcrypt 
        const hashedPassword = await hash(password, 10);

        // If the user does not exist, create a new user
        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName
            }
        });

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: { rest }, message: "User created successfully" });
    }
    catch(error) {
        // handle error here
       return NextResponse.json({ status: 500, message: "An error occurred while creating the user" });
    }
}
