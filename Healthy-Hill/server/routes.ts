import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, newsletterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      const { category, featured, bestSeller, search } = req.query;

      let products = await storage.getProducts();

      if (category && typeof category === "string") {
        products = products.filter((p) => p.category === category);
      }

      if (featured === "true") {
        products = products.filter((p) => p.featured);
      }

      if (bestSeller === "true") {
        products = products.filter((p) => p.bestSeller);
      }

      if (search && typeof search === "string") {
        const lowerSearch = search.toLowerCase();
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerSearch) ||
            p.description.toLowerCase().includes(lowerSearch)
        );
      }

      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const product = await storage.getProductBySlug(slug);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    const categories = [
      { id: "dry-fruits", name: "Dry Fruits", description: "Premium nuts and dried fruits from Gilgit-Baltistan" },
      { id: "shilajit", name: "Shilajit", description: "Pure Himalayan Shilajit for natural wellness" },
      { id: "honey", name: "Natural Honey", description: "Raw, unprocessed honey from mountain beekeepers" },
      { id: "oils", name: "Natural Oils", description: "Cold-pressed oils for health and beauty" },
    ];
    res.json(categories);
  });

  // Cart API
  app.post("/api/cart", async (req, res) => {
    try {
      const cart = await storage.createCart();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to create cart" });
    }
  });

  app.get("/api/cart/:cartId", async (req, res) => {
    try {
      const { cartId } = req.params;
      const cart = await storage.getCart(cartId);

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart/:cartId/items", async (req, res) => {
    try {
      const { cartId } = req.params;
      const { productId, quantity = 1 } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const cart = await storage.addToCart(cartId, productId, quantity);

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  });

  app.patch("/api/cart/:cartId/items/:productId", async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;

      if (typeof quantity !== "number") {
        return res.status(400).json({ error: "Quantity is required" });
      }

      const cart = await storage.updateCartItem(cartId, productId, quantity);

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:cartId/items/:productId", async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const cart = await storage.removeFromCart(cartId, productId);

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item from cart" });
    }
  });

  // Orders API
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = req.body;

      // Validate order data
      if (!orderData.items || !orderData.customer) {
        return res.status(400).json({ error: "Invalid order data" });
      }

      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await storage.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Blog API
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);

      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Contact API
  app.post("/api/contact", async (req, res) => {
    try {
      const result = contactFormSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: result.error.errors,
        });
      }

      await storage.submitContactForm(result.data);
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Newsletter API
  app.post("/api/newsletter", async (req, res) => {
    try {
      const result = newsletterSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: result.error.errors,
        });
      }

      await storage.subscribeNewsletter(result.data.email);
      res.json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });

  return httpServer;
}
