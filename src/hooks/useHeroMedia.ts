import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  heroMediaSrc as defaultSrc,
  heroMediaType as defaultType,
  heroMediaPoster as defaultPoster,
} from "@/config/heroMedia";

export type HeroMediaType = "auto" | "image" | "video";

export type HeroMediaValue = {
  src: string;
  type: HeroMediaType;
  poster?: string;
};

const SETTING_KEY = "hero_media";

export function useHeroMedia() {
  const [value, setValue] = useState<HeroMediaValue>({
    src: defaultSrc,
    type: defaultType,
    poster: defaultPoster,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", SETTING_KEY)
        .maybeSingle();

      if (!mounted) return;

      if (data?.value && typeof data.value === "object") {
        const v = data.value as Partial<HeroMediaValue>;
        if (v.src) {
          setValue({
            src: v.src,
            type: (v.type as HeroMediaType) ?? "auto",
            poster: v.poster || undefined,
          });
        }
      }
      setLoading(false);
    };

    load();

    const channel = supabase
      .channel("site_settings_hero_media")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_settings",
          filter: `key=eq.${SETTING_KEY}`,
        },
        (payload) => {
          const newRow = (payload.new ?? {}) as { value?: Partial<HeroMediaValue> };
          if (payload.eventType === "DELETE") {
            setValue({ src: defaultSrc, type: defaultType, poster: defaultPoster });
            return;
          }
          if (newRow.value?.src) {
            setValue({
              src: newRow.value.src,
              type: (newRow.value.type as HeroMediaType) ?? "auto",
              poster: newRow.value.poster || undefined,
            });
          }
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { ...value, loading };
}
