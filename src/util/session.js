import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = "HS256";

// Function to create JWT and store it in a cookie
export async function createSession(user) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2h")  
    .sign(secret);

  // Set token as an HttpOnly cookie
  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60,  
    path: "/",
  });

  return token;
}

// Function to get and verify JWT from cookies
export async function getSession() {
  const cookie = cookies().get("session");

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie.value, secret);
    return payload;
  } catch (error) {
    console.error("Invalid session:", error);
    return null;
  }
}

// Function to destroy session (Logout)
export async function destroySession() {
  cookies().set("session", "", { maxAge: -1, path: "/" });
}
