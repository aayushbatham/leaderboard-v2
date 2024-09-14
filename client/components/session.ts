export async function fetchUserSession(cookie: string | undefined) {
  try {
    const backendRes = await fetch("http://localhost:5000/api/session", {
      method: "GET",
      headers: {
        // Pass cookies (like connect.sid) for session management
        "Content-Type": "application/json",
        Cookie: cookie ? `connect.sid=${cookie}` : "", // Adjust the session cookie name if different
      },
      credentials: "include", // Ensure credentials are included in the request
    });

    if (!backendRes.ok) {
      throw new Error(`Failed to fetch session: ${backendRes.status}`);
    }

    const data = await backendRes.json();

    // If user data is returned, extract and return it
    if (data && data.user) {
      return data.user;
    } else {
      return null; // No user session available
    }
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
}
