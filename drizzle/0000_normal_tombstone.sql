CREATE TABLE "carImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"imageUrl" varchar NOT NULL,
	"carListingId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "carListing" (
	"id" serial PRIMARY KEY NOT NULL,
	"listingTitle" varchar NOT NULL,
	"tagline" varchar,
	"originalPrice" varchar,
	"sellingPrice" varchar NOT NULL,
	"category" varchar NOT NULL,
	"condition" varchar NOT NULL,
	"make" varchar NOT NULL,
	"model" varchar NOT NULL,
	"year" varchar NOT NULL,
	"driveType" varchar NOT NULL,
	"transmission" varchar NOT NULL,
	"fuelType" varchar NOT NULL,
	"mileage" varchar NOT NULL,
	"engineSize" varchar NOT NULL,
	"cylinder" varchar NOT NULL,
	"color" varchar NOT NULL,
	"door" varchar NOT NULL,
	"vin" varchar,
	"offerType" varchar,
	"listingDescription" varchar NOT NULL,
	"features" json,
	"createdBy" varchar NOT NULL,
	"postedOn" varchar
);
--> statement-breakpoint
ALTER TABLE "carImages" ADD CONSTRAINT "carImages_carListingId_carListing_id_fk" FOREIGN KEY ("carListingId") REFERENCES "public"."carListing"("id") ON DELETE no action ON UPDATE no action;