import type {
  Product,
  InsertProduct,
  Cart,
  CartItem,
  Order,
  InsertOrder,
  BlogPost,
  Testimonial,
  ContactForm,
  NewsletterSubscription,
} from "@shared/schema";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getBestSellers(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;

  // Cart
  getCart(cartId: string): Promise<Cart | undefined>;
  createCart(): Promise<Cart>;
  addToCart(cartId: string, productId: string, quantity: number): Promise<Cart | undefined>;
  updateCartItem(cartId: string, productId: string, quantity: number): Promise<Cart | undefined>;
  removeFromCart(cartId: string, productId: string): Promise<Cart | undefined>;
  clearCart(cartId: string): Promise<Cart | undefined>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;

  // Blog
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;

  // Contact & Newsletter
  submitContactForm(form: ContactForm): Promise<void>;
  subscribeNewsletter(email: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Products
  async getProducts(): Promise<Product[]> {
    const { data } = await supabase.from<Product>("products").select("*");
    return data ?? [];
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const { data } = await supabase.from<Product>("products").select("*").eq("id", id).single();
    return data ?? undefined;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const { data } = await supabase.from<Product>("products").select("*").eq("slug", slug).single();
    return data ?? undefined;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data } = await supabase.from<Product>("products").select("*").eq("category", category);
    return data ?? [];
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const { data } = await supabase.from<Product>("products").select("*").eq("featured", true);
    return data ?? [];
  }

  async getBestSellers(): Promise<Product[]> {
    const { data } = await supabase.from<Product>("products").select("*").eq("bestSeller", true);
    return data ?? [];
  }

  async searchProducts(query: string): Promise<Product[]> {
    const { data } = await supabase
      .from<Product>("products")
      .select("*")
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`);
    return data ?? [];
  }

  // Cart
  async getCart(cartId: string): Promise<Cart | undefined> {
    const { data } = await supabase.from<Cart>("carts").select("*").eq("id", cartId).single();
    return data ?? undefined;
  }

  async createCart(): Promise<Cart> {
    const newCart: Cart = { id: randomUUID(), items: [], createdAt: new Date().toISOString() };
    await supabase.from<Cart>("carts").insert(newCart);
    return newCart;
  }

  async addToCart(cartId: string, productId: string, quantity: number): Promise<Cart | undefined> {
    const cart = await this.getCart(cartId);
    if (!cart) return undefined;

    const existingItem = cart.items.find((i) => i.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await supabase.from<Cart>("carts").update({ items: cart.items }).eq("id", cartId);
    return cart;
  }

  async updateCartItem(cartId: string, productId: string, quantity: number): Promise<Cart | undefined> {
    const cart = await this.getCart(cartId);
    if (!cart) return undefined;

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId !== productId);
    } else {
      cart.items = cart.items.map((i) => (i.productId === productId ? { ...i, quantity } : i));
    }

    await supabase.from<Cart>("carts").update({ items: cart.items }).eq("id", cartId);
    return cart;
  }

  async removeFromCart(cartId: string, productId: string): Promise<Cart | undefined> {
    const cart = await this.getCart(cartId);
    if (!cart) return undefined;

    cart.items = cart.items.filter((i) => i.productId !== productId);
    await supabase.from<Cart>("carts").update({ items: cart.items }).eq("id", cartId);
    return cart;
  }

  async clearCart(cartId: string): Promise<Cart | undefined> {
    const cart = await this.getCart(cartId);
    if (!cart) return undefined;

    cart.items = [];
    await supabase.from<Cart>("carts").update({ items: [] }).eq("id", cartId);
    return cart;
  }

  // Orders
  async createOrder(orderData: InsertOrder): Promise<Order> {
    const newOrder: Order = { ...orderData, id: randomUUID(), status: "pending", createdAt: new Date().toISOString() };
    await supabase.from<Order>("orders").insert(newOrder);
    return newOrder;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const { data } = await supabase.from<Order>("orders").select("*").eq("id", id).single();
    return data ?? undefined;
  }

  // Blog
  async getBlogPosts(): Promise<BlogPost[]> {
    const { data } = await supabase.from<BlogPost>("blogPosts").select("*");
    return data ?? [];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const { data } = await supabase.from<BlogPost>("blogPosts").select("*").eq("slug", slug).single();
    return data ?? undefined;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    const { data } = await supabase.from<Testimonial>("testimonials").select("*");
    return data ?? [];
  }

  // Contact & Newsletter
  async submitContactForm(form: ContactForm): Promise<void> {
    await supabase.from<ContactForm>("contactForms").insert(form);
  }

  async subscribeNewsletter(email: string): Promise<void> {
    await supabase.from<NewsletterSubscription>("newsletterSubscribers").insert({ email });
  }
}

// Export ready-to-use instance

export const storage = new DatabaseStorage();
