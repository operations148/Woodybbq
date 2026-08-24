/**
 * Menu structure.
 *
 * Prices are deliberately absent: no current, consistent Slauson pricing was
 * verified, and `showPrices` in business.ts is false. The MenuItem type keeps
 * `price` optional so the client can enable it later without a refactor.
 *
 * Descriptions are kept to plain fact. No cooking times, marinades, rub or
 * sauce details, and no superlatives. "Sliced Beef" is used rather than
 * "brisket" until a current approved Woody's menu says otherwise.
 *
 * Nothing from the unrelated Florida franchise appears here: no pulled pork,
 * baby back ribs, Texas brisket, catfish, burgers, corn nuggets or fried okra.
 */

import type { VerificationStatus } from "./business";

export type MenuItem = {
  name: string;
  category: string;
  description?: string;
  /** Withheld while showPrices is false. */
  price?: string;
  /** Asset id from src/data/assets.ts, when the item is shown with an image. */
  image?: string;
  status: Extract<VerificationStatus, "verified" | "confirmation-required">;
  note?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  /** Museum-label voice: what it is, not why it is good. */
  blurb?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "dinners",
    name: "Dinners",
    blurb: "Served with sides.",
    items: [
      { name: "Pork Ribs", category: "Dinners", status: "verified", image: "hero-ribs" },
      { name: "Small-End Ribs", category: "Dinners", status: "verified" },
      { name: "Beef Ribs", category: "Dinners", status: "verified" },
      { name: "Rib Tips", category: "Dinners", status: "verified", image: "rib-tips" },
      { name: "Sliced Beef", category: "Dinners", status: "verified", image: "sliced-beef" },
      { name: "Beef Links", category: "Dinners", status: "verified", image: "hot-links" },
      { name: "Chicken Links", category: "Dinners", status: "verified" },
      { name: "BBQ Chicken", category: "Dinners", status: "verified", image: "bbq-chicken" },
      {
        name: "Combination Plates",
        category: "Dinners",
        status: "verified",
        image: "combination-plate",
      },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    items: [
      { name: "Sliced Beef Sandwich", category: "Sandwiches", status: "confirmation-required" },
      { name: "Link Sandwich", category: "Sandwiches", status: "confirmation-required" },
      { name: "Rib Sandwich", category: "Sandwiches", status: "confirmation-required" },
    ],
  },
  {
    id: "a-la-carte",
    name: "A La Carte",
    blurb: "Meat by the order, without sides.",
    items: [
      { name: "Pork Ribs", category: "A La Carte", status: "confirmation-required" },
      { name: "Beef Ribs", category: "A La Carte", status: "confirmation-required" },
      { name: "Rib Tips", category: "A La Carte", status: "confirmation-required" },
      { name: "Sliced Beef", category: "A La Carte", status: "confirmation-required" },
      { name: "Beef Links", category: "A La Carte", status: "confirmation-required" },
      { name: "BBQ Chicken", category: "A La Carte", status: "confirmation-required" },
    ],
  },
  {
    id: "lunch-specials",
    name: "Lunch Specials",
    items: [
      {
        name: "Lunch Specials",
        category: "Lunch Specials",
        status: "confirmation-required",
        note: "Availability and hours to be confirmed with the restaurant.",
      },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    items: [
      { name: "Potato Salad", category: "Sides", status: "verified", image: "potato-salad" },
      { name: "Macaroni Salad", category: "Sides", status: "verified" },
      { name: "Cole Slaw", category: "Sides", status: "verified" },
      { name: "Baked Beans", category: "Sides", status: "verified" },
      {
        name: "Macaroni and Cheese",
        category: "Sides",
        status: "verified",
        image: "mac-and-cheese",
      },
      { name: "Greens", category: "Sides", status: "verified" },
      { name: "Cornbread", category: "Sides", status: "verified" },
    ],
  },
  {
    id: "extra-dishes",
    name: "Extra Dishes",
    items: [
      {
        name: "Extra Dishes",
        category: "Extra Dishes",
        status: "confirmation-required",
        note: "Current selection to be confirmed with the restaurant.",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    items: [
      { name: "Peach Cobbler", category: "Desserts", status: "verified", image: "peach-cobbler" },
      { name: "Sweet Potato Pie", category: "Desserts", status: "verified" },
      { name: "Banana Pudding", category: "Desserts", status: "verified" },
      {
        name: "Red Velvet Cake",
        category: "Desserts",
        status: "confirmation-required",
        note: "Historically associated with Friday and Saturday. Confirm before relying on it.",
      },
    ],
  },
  {
    id: "party-platters",
    name: "Party Platters",
    blurb: "For groups. Call the restaurant to arrange.",
    items: [
      { name: "Small Party Platter", category: "Party Platters", status: "verified" },
      { name: "Large Party Platter", category: "Party Platters", status: "verified" },
    ],
  },
];

/** The meats featured in Scene 2. Order is the editorial rhythm, not a ranking. */
export const signatureMeats: MenuItem[] = [
  { name: "Pork Ribs", category: "Dinners", status: "verified", image: "hero-ribs" },
  { name: "Rib Tips", category: "Dinners", status: "verified", image: "rib-tips" },
  { name: "Hot Links", category: "Dinners", status: "verified", image: "hot-links" },
  { name: "BBQ Chicken", category: "Dinners", status: "verified", image: "bbq-chicken" },
  { name: "Sliced Beef", category: "Dinners", status: "verified", image: "sliced-beef" },
  {
    name: "Combination Plates",
    category: "Dinners",
    status: "verified",
    image: "combination-plate",
  },
];

export const menuCategoryNames = menu.map((c) => c.name);

/** Sides and desserts, for the Scene 5 submodule. */
export const sidesAndDesserts = {
  sides: menu.find((c) => c.id === "sides")?.items ?? [],
  desserts: menu.find((c) => c.id === "desserts")?.items ?? [],
};

/**
 * The menu changes. Nothing on the site may imply every historical item is
 * available every day.
 */
export const availabilityCaveat =
  "The menu changes. Call the restaurant to check what is on today.";
