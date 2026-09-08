import { apiFetch } from "./api";

export const adminAuth = {
  async checkSession(): Promise<boolean> {
    try {
      const data = await apiFetch<{ authenticated: boolean }>("/session");
      return data.authenticated;
    } catch {
      return false;
    }
  },

  async login(password: string): Promise<void> {
    await apiFetch<{ ok: true }>("/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
  },

  async logout(): Promise<void> {
    try {
      await apiFetch<{ ok: true }>("/logout", { method: "POST" });
    } catch {
      // ignore — cookie will simply expire client-side view
    }
  },
};
