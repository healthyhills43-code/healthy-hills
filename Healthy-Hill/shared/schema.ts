import { z } from "zod";

// Product Categories
export const categories = [
  { id: "dry-fruits", name: "Dry Fruits", description: "Premium nuts and dried fruits from Gilgit-Baltistan" },
  { id: "shilajit", name: "Shilajit", description: "Pure Himalayan Shilajit for natural wellness" },
  { id: "honey", name: "Natural Honey", description: "Raw, unprocessed honey from mountain beekeepers" },
  { id: "oils", name: "Natural Oils", description: "Cold-pressed oils for health and beauty" },
] as const;

export type CategoryId = typeof categories[number]["id"];

// Product Schema
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  category: z.string(),
  images: z.array(z.string()),
  benefits: z.array(z.string()),
  ingredients: z.string().optional(),
  sourcingStory: z.string().optional(),
  weight: z.string(),
  inStock: z.boolean(),
  featured: z.boolean(),
  bestSeller: z.boolean(),
  rating: z.number(),
  reviewCount: z.number(),
});

export type Product = z.infer<typeof productSchema>;
export type InsertProduct = Omit<Product, "id">;

// Cart Item Schema
export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Cart Schema
export const cartSchema = z.object({
  id: z.string(),
  items: z.array(cartItemSchema),
  createdAt: z.string(),
});

export type Cart = z.infer<typeof cartSchema>;

// Order Schema
export const orderSchema = z.object({
  id: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
  })),
  customer: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  subtotal: z.number(),
  shipping: z.number(),
  total: z.number(),
  status: z.enum(["pending", "processing", "shipped", "delivered"]),
  createdAt: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
export type InsertOrder = Omit<Order, "id" | "createdAt" | "status">;

// Blog Post Schema
export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  image: z.string(),
  author: z.string(),
  publishedAt: z.string(),
  readTime: z.number(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

// Testimonial Schema
export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  content: z.string(),
  rating: z.number(),
  avatar: z.string().optional(),
});

export type Testimonial = z.infer<typeof testimonialSchema>;

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Newsletter Schema
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type NewsletterSubscription = z.infer<typeof newsletterSchema>;

// User Schema (for future auth)
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type InsertUser = Omit<User, "id">;
