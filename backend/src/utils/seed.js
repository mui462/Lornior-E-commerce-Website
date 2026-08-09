import 'dotenv/config';

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Brand from '../models/Brand.js';
import Category from '../models/Category.js';

const BRANDS = [
  { name: "L'Or Noir Atelier", tier: 'House' },
  { name: 'Rêverie', tier: 'Contemporary' },
  { name: 'Al Dahab', tier: 'Oud Specialist' },
  { name: 'Maison Cendre', tier: 'Niche' },
];

const CATEGORIES = [
  'Oud & Amber',
  'Woody',
  'Attar',
  'Floral',
  'Leather',
  'Gourmand',
  'Incense',
];

async function seed() {
  try {
    await connectDB();

    // =========================
    // ADMIN USER
    // =========================

    const adminEmail =
      process.env.SEED_ADMIN_EMAIL || 'admin@lornoir.com';

    const adminExists = await User.findOne({
      email: adminEmail,
    });

    if (!adminExists) {
      await User.create({
        name: 'Maison Admin',
        email: adminEmail,
        password:
          process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!',
        role: 'admin',
        isEmailVerified: true,
      });

      console.log(`Admin user created: ${adminEmail}`);
    } else {
      console.log('Admin user already exists — skipping');
    }

    // =========================
    // BRANDS
    // =========================

    for (const brand of BRANDS) {
      const existingBrand = await Brand.findOne({
        name: brand.name,
      });

      if (!existingBrand) {
        await Brand.create(brand);
        console.log(`Brand created: ${brand.name}`);
      } else {
        console.log(`Brand already exists: ${brand.name}`);
      }
    }

    console.log(`Processed ${BRANDS.length} brands`);

    // =========================
    // CATEGORIES
    // =========================

    for (const name of CATEGORIES) {
      const existingCategory = await Category.findOne({
        name,
      });

      if (!existingCategory) {
        await Category.create({ name });
        console.log(`Category created: ${name}`);
      } else {
        console.log(`Category already exists: ${name}`);
      }
    }

    console.log(`Processed ${CATEGORIES.length} categories`);

    console.log('Seed complete');

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();