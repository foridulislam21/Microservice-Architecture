import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) return null;
    return session.user;
  } catch (error) {
    return null;
  }
}
