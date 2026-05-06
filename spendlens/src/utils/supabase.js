import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://eaeoggrulvizsacnpbku.supabase.co"

const supabaseKey =
  "sb_publishable_48HxfHCTV_P_utSiqBwLKA_Hf5sVwg2"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)