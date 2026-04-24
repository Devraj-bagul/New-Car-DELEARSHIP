import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing = pgTable("carListing", {
  id: serial("id").primaryKey(),
  listingTitle: varchar("listingTitle").notNull(),
  tagline: varchar("tagline"),
  originalPrice: varchar("originalPrice"),
  sellingPrice: varchar("sellingPrice").notNull(),
  category: varchar("category"),
  condition: varchar("condition").notNull(),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  driveType: varchar("driveType").notNull(),
  transmission: varchar("transmission").notNull(),
  fuelType: varchar("fuelType"),
  mileage: varchar("mileage").notNull(),
  engineSize: varchar("engineSize"),
  cylinder: varchar("cylinder"),
  color: varchar("color"),
  door: varchar("door").notNull(),
  vin: varchar("vin"),
  vehicleRegCode: varchar("vehicleRegCode").notNull().default('MH 00'),
  offerType: varchar("offerType").default('sell'),
  listingDescription: varchar("listingDescription").notNull(),
  features:json('features'),
  createdBy:varchar('createdBy').notNull(),
  userName:varchar('userName').notNull().default('Devraj Bagul'),
  userImageUrl:varchar('userImageUrl').default('https://api.clerk.com/v1/user/images/default.png'),
  postedOn:varchar('postedOn'),
  instagramUrl:varchar('instagramUrl').default('https://www.instagram.com/vinitautodeals_malegaon/?hl=en'),
  aiInsights:json('aiInsights'),
})

export const CarImages=pgTable('carImages', {
  id:serial('id').primaryKey(),
  imageUrl:varchar('imageUrl').notNull(),
  carListingId:integer('carListingId').notNull().references(()=>CarListing.id)
})
