/* === avatarModels3D ====================================================
   Registry mapping (avatarId, equipped item id | null) → 3D model URL.
   When a player taps to enlarge an explorer in the Profile lightbox, we
   look up the (avatarId, item) pair here. Hit → render the 3D viewer.
   Miss → fall back to the static <img>.

   Adding a new 3D model = adding ONE entry below. No code changes
   anywhere else. Drop the GLB in `public/models/` first, then map it.

   File-naming convention enforced by us, not the registry:
     public/models/<avatar-name>-plain.glb              (no item)
     public/models/<avatar-name>-with-<item-id>.glb     (with item)
   ==================================================================== */

/** Lookup key: avatar numeric id + equipped item id (or null for plain). */
type Key = `${number}::${string}`;

const k = (avatarId: number, itemId: string | null): Key =>
  `${avatarId}::${itemId ?? "__plain__"}`;

/* The registry. Add new (avatarId, itemId|null, modelUrl) rows here. */
const REGISTRY: Record<Key, string> = {
  // Rashid (avatar id 0)
  [k(0, null)]: "/models/rashid-plain.glb",
  [k(0, "uae-scarf")]: "/models/rashid-uae-scarf.glb",
  [k(0, "uae-flag")]: "/models/rashid-uae-flag.glb",
  [k(0, "uae-balloon")]: "/models/rashid-uae-balloon.glb",
  [k(0, "cool-glasses-human")]: "/models/rashid-cool-glasses.glb",

  // Mira (avatar id 5)
  [k(5, null)]: "/models/mira-plain.glb",
  [k(5, "uae-scarf")]: "/models/mira-uae-scarf.glb",
  [k(5, "uae-balloon")]: "/models/mira-uae-balloon.glb",
  [k(5, "uae-flag")]: "/models/mira-uae-flag.glb",
  [k(5, "cool-glasses-human")]: "/models/mira-cool-glasses.glb",

  // Mahra (avatar id 6)
  [k(6, null)]: "/models/mahra-plain.glb",
  [k(6, "uae-scarf")]: "/models/mahra-uae-scarf.glb",
  [k(6, "uae-flag")]: "/models/mahra-uae-flag.glb",
  [k(6, "uae-balloon")]: "/models/mahra-uae-balloon.glb",
  [k(6, "cool-glasses-human")]: "/models/mahra-cool-glasses.glb",

  // Zayed (avatar id 1)
  [k(1, null)]: "/models/zayed-plain.glb",
  [k(1, "uae-scarf")]: "/models/zayed-uae-scarf.glb",
  [k(1, "uae-flag")]: "/models/zayed-uae-flag.glb",
  [k(1, "uae-balloon")]: "/models/zayed-uae-balloon.glb",
  [k(1, "cool-glasses-human")]: "/models/zayed-cool-glasses.glb",

  // Sofía (avatar id 9)
  [k(9, null)]: "/models/sofia-plain.glb",
  [k(9, "uae-scarf")]: "/models/sofia-uae-scarf.glb",
  [k(9, "uae-flag")]: "/models/sofia-uae-flag.glb",
  [k(9, "uae-balloon")]: "/models/sofia-uae-balloon.glb",
  [k(9, "cool-glasses-human")]: "/models/sofia-cool-glasses.glb",

  // Hala (avatar id 8)
  [k(8, null)]: "/models/hala-plain.glb",
  [k(8, "uae-scarf")]: "/models/hala-uae-scarf.glb",
  [k(8, "uae-flag")]: "/models/hala-uae-flag.glb",
  [k(8, "cool-glasses-human")]: "/models/hala-cool-glasses.glb",
  [k(8, "uae-balloon")]: "/models/hala-uae-balloon.glb",

  // Aisha (avatar id 7)
  [k(7, null)]: "/models/aisha-plain.glb",
  [k(7, "uae-scarf")]: "/models/aisha-uae-scarf.glb",
  [k(7, "uae-flag")]: "/models/aisha-uae-flag.glb",
  [k(7, "uae-balloon")]: "/models/aisha-uae-balloon.glb",
  [k(7, "cool-glasses-human")]: "/models/aisha-cool-glasses.glb",

  // Carlo (avatar id 4)
  [k(4, null)]: "/models/carlo-plain.glb",
  [k(4, "uae-scarf")]: "/models/carlo-uae-scarf.glb",
  [k(4, "uae-flag")]: "/models/carlo-uae-flag.glb",
  [k(4, "uae-balloon")]: "/models/carlo-uae-balloon.glb",
  [k(4, "cool-glasses-human")]: "/models/carlo-cool-glasses.glb",

  // Hamed (avatar id 3)
  [k(3, null)]: "/models/hamed-plain.glb",
  [k(3, "uae-scarf")]: "/models/hamed-uae-scarf.glb",
  [k(3, "uae-flag")]: "/models/hamed-uae-flag.glb",
  [k(3, "uae-balloon")]: "/models/hamed-uae-balloon.glb",
  [k(3, "cool-glasses-human")]: "/models/hamed-cool-glasses.glb",

  // Hadi (avatar id 2)
  [k(2, null)]: "/models/hadi-plain.glb",
  [k(2, "uae-scarf")]: "/models/hadi-uae-scarf.glb",
  [k(2, "uae-flag")]: "/models/hadi-uae-flag.glb",
  [k(2, "uae-balloon")]: "/models/hadi-uae-balloon.glb",
  [k(2, "cool-glasses-human")]: "/models/hadi-cool-glasses.glb",
};

/** Resolve a model URL for the given avatar+item combo, or null if no
 *  3D model is registered for that combination. */
export function getAvatarModel3D(
  avatarId: number,
  equippedItemId: string | null
): string | null {
  return REGISTRY[k(avatarId, equippedItemId)] ?? null;
}
