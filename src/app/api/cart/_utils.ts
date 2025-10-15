// src/app/api/cart/_utils.ts
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

const COOKIE = "cartId";
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Ensures a cart exists and a `cartId` cookie is set.
 * Works for anonymous users as well.
 */
export async function getOrCreateCartId(): Promise<string> {
  const jar = await cookies();              // ✅ treat cookies() as async in your setup
  let cartId = jar.get(COOKIE)?.value;

  if (!cartId) {
    cartId = randomUUID();

    // create cart row
    const { error } = await supabaseAdmin.from("carts").insert({ id: cartId });
    if (error) throw new Error(error.message);

    // set cookie
    jar.set({
      name: COOKIE,
      value: cartId,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: ONE_YEAR,
    });
  } else {
    // idempotently make sure the cart exists
    await supabaseAdmin.from("carts").upsert({ id: cartId }, { onConflict: "id" });
  }

  return cartId;
}

/** Safe number coercion */
export function toNumber(n: unknown): number {
  const v = Number(n);
  return Number.isFinite(v) ? v : 0;
}
