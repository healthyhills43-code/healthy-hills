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
import { randomUUID } from "crypto";

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

// Initial product data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium Gilgit Almonds",
    slug: "premium-gilgit-almonds",
    description: "Our premium almonds are sourced directly from the pristine orchards of Gilgit-Baltistan, where the unique climate and altitude create the perfect conditions for growing exceptionally flavorful nuts. These almonds are naturally dried using traditional methods passed down through generations, ensuring maximum retention of nutrients and authentic taste.\n\nRich in vitamin E, healthy fats, and protein, these almonds make an excellent addition to your daily diet. Whether enjoyed as a snack, added to your morning oatmeal, or used in cooking and baking, their superior quality shines through in every bite.",
    shortDescription: "Hand-picked from Gilgit orchards, naturally dried for maximum flavor and nutrition.",
    price: 1299,
    originalPrice: 1499,
    category: "dry-fruits",
    images: ["/products/almonds-1.jpg", "/products/almonds-2.jpg"],
    benefits: ["Rich in Vitamin E", "Heart-healthy fats", "High protein content", "Natural energy booster", "Supports brain health"],
    ingredients: "100% Natural Almonds from Gilgit-Baltistan",
    sourcingStory: "Harvested from family-owned orchards in Hunza Valley, where almonds have been cultivated for over 500 years.",
    weight: "500g",
    inStock: true,
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 234,
  },
  {
    id: "2",
    name: "Organic Hunza Walnuts",
    slug: "organic-hunza-walnuts",
    description: "Hunza Valley walnuts are renowned worldwide for their exceptional quality and rich, buttery flavor. Grown in the high-altitude regions where the air is pure and the soil is mineral-rich, these walnuts develop a distinctive taste that sets them apart from ordinary varieties.\n\nPacked with omega-3 fatty acids, antioxidants, and essential minerals, Hunza walnuts are nature's perfect brain food. The traditional harvesting and processing methods ensure that every nut retains its natural goodness.",
    shortDescription: "World-famous Hunza walnuts with rich, buttery flavor and superior nutrition.",
    price: 1499,
    originalPrice: 1799,
    category: "dry-fruits",
    images: ["/products/walnuts-1.jpg", "/products/walnuts-2.jpg"],
    benefits: ["Omega-3 rich", "Brain health support", "Antioxidant properties", "Heart-healthy", "Natural sleep aid"],
    ingredients: "100% Organic Walnuts from Hunza Valley",
    sourcingStory: "Collected from ancient walnut groves in Hunza, some trees over 300 years old.",
    weight: "500g",
    inStock: true,
    featured: true,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    id: "3",
    name: "Dried Hunza Apricots",
    slug: "dried-hunza-apricots",
    description: "Hunza apricots are legendary for their exceptional sweetness and health benefits. Dried naturally under the mountain sun, these apricots retain their vibrant color and concentrated nutrients.",
    shortDescription: "Sun-dried Hunza apricots, naturally sweet and packed with iron and fiber.",
    price: 899,
    originalPrice: 1099,
    category: "dry-fruits",
    images: ["/products/apricots-1.jpg", "/products/apricots-2.jpg"],
    benefits: ["High in iron", "Rich in potassium", "Excellent fiber source", "Natural sweetness", "Energy boosting"],
    ingredients: "100% Sun-Dried Apricots from Hunza Valley",
    sourcingStory: "Dried using centuries-old solar drying techniques on rooftops overlooking the Karakoram mountains.",
    weight: "400g",
    inStock: true,
    featured: true,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "4",
    name: "Pure Himalayan Shilajit",
    slug: "pure-himalayan-shilajit",
    description: "Our premium Shilajit is harvested from the high-altitude rocks of the Karakoram and Himalayan ranges, where it forms naturally over centuries. This mineral-rich resin is considered one of nature's most powerful supplements.",
    shortDescription: "Authentic high-altitude Shilajit, lab-tested for purity and potency.",
    price: 3499,
    originalPrice: 3999,
    category: "shilajit",
    images: ["/products/shilajit-1.jpg", "/products/shilajit-2.jpg"],
    benefits: ["Natural energy booster", "Supports cognitive function", "Rich in minerals", "Enhances vitality", "Immune system support"],
    ingredients: "100% Pure Himalayan Shilajit Resin",
    sourcingStory: "Collected by experienced harvesters from rocks above 16,000 feet in the Karakoram range.",
    weight: "30g",
    inStock: true,
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "5",
    name: "Wild Mountain Honey",
    slug: "wild-mountain-honey",
    description: "This exceptional honey is harvested from wild bee colonies in the remote forests of Gilgit-Baltistan. Completely raw and unprocessed, this honey retains all its natural enzymes, antioxidants, and beneficial compounds.",
    shortDescription: "Raw, unfiltered honey from wild mountain bees, rich in natural enzymes.",
    price: 1899,
    originalPrice: 2199,
    category: "honey",
    images: ["/products/honey-1.jpg", "/products/honey-2.jpg"],
    benefits: ["100% raw and unfiltered", "Natural antibacterial properties", "Rich in antioxidants", "Immune boosting", "Natural energy source"],
    ingredients: "100% Raw Wild Mountain Honey",
    sourcingStory: "Harvested sustainably from wild bee colonies in the pristine forests of Skardu.",
    weight: "500g",
    inStock: true,
    featured: true,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 201,
  },
  {
    id: "6",
    name: "Cold-Pressed Almond Oil",
    slug: "cold-pressed-almond-oil",
    description: "Our premium almond oil is extracted using traditional cold-pressing methods from the finest Gilgit almonds.",
    shortDescription: "Traditional cold-pressed almond oil, perfect for cooking and skincare.",
    price: 1599,
    originalPrice: 1899,
    category: "oils",
    images: ["/products/almond-oil-1.jpg", "/products/almond-oil-2.jpg"],
    benefits: ["Rich in Vitamin E", "Natural moisturizer", "Heart-healthy cooking oil", "Hair nourishment", "Antioxidant properties"],
    ingredients: "100% Cold-Pressed Almond Oil",
    sourcingStory: "Pressed from premium Gilgit almonds using traditional stone grinding methods.",
    weight: "250ml",
    inStock: true,
    featured: false,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 98,
  },
  {
    id: "7",
    name: "Apricot Kernel Oil",
    slug: "apricot-kernel-oil",
    description: "Extracted from the kernels of Hunza apricots, this golden oil is a beauty secret that has been used in the region for centuries.",
    shortDescription: "Light, nourishing oil from Hunza apricot kernels for skin and hair care.",
    price: 1399,
    originalPrice: 1599,
    category: "oils",
    images: ["/products/apricot-oil-1.jpg", "/products/apricot-oil-2.jpg"],
    benefits: ["Lightweight and fast-absorbing", "Rich in vitamins A & E", "Anti-aging properties", "Natural skin softener", "Excellent for massage"],
    ingredients: "100% Cold-Pressed Apricot Kernel Oil",
    sourcingStory: "Made from the kernels of sun-dried Hunza apricots, using traditional extraction methods.",
    weight: "200ml",
    inStock: true,
    featured: false,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 76,
  },
  {
    id: "8",
    name: "Premium Cashew Nuts",
    slug: "premium-cashew-nuts",
    description: "Our carefully selected cashews are roasted to perfection, bringing out their natural sweetness and satisfying crunch.",
    shortDescription: "Premium roasted cashews, carefully selected for quality and flavor.",
    price: 1699,
    originalPrice: 1999,
    category: "dry-fruits",
    images: ["/products/cashews-1.jpg", "/products/cashews-2.jpg"],
    benefits: ["Rich in healthy fats", "Good protein source", "Contains essential minerals", "Supports bone health", "Heart-healthy snack"],
    ingredients: "100% Premium Cashew Nuts",
    sourcingStory: "Selected from the finest crops and roasted using traditional methods for optimal flavor.",
    weight: "400g",
    inStock: true,
    featured: false,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 112,
  },
  {
    id: "9",
    name: "Organic Medjool Dates",
    slug: "organic-medjool-dates",
    description: "Known as the 'king of dates', Medjool dates are prized for their large size, soft texture, and rich caramel-like flavor.",
    shortDescription: "Large, soft Medjool dates with rich caramel flavor, naturally sweet.",
    price: 1199,
    originalPrice: 1399,
    category: "dry-fruits",
    images: ["/products/dates-1.jpg", "/products/dates-2.jpg"],
    benefits: ["Natural energy boost", "High in fiber", "Rich in potassium", "Natural sweetener", "Supports digestive health"],
    ingredients: "100% Organic Medjool Dates",
    sourcingStory: "Sourced from organic date farms and carefully packed to preserve freshness.",
    weight: "500g",
    inStock: true,
    featured: false,
    bestSeller: false,
    rating: 4.8,
    reviewCount: 145,
  },
  {
    id: "10",
    name: "Cold-Pressed Walnut Oil",
    slug: "cold-pressed-walnut-oil",
    description: "Made from the finest Hunza walnuts, this cold-pressed oil captures the rich, nutty essence of these legendary nuts.",
    shortDescription: "Gourmet cold-pressed walnut oil from premium Hunza walnuts.",
    price: 1799,
    originalPrice: 2099,
    category: "oils",
    images: ["/products/walnut-oil-1.jpg", "/products/walnut-oil-2.jpg"],
    benefits: ["Highest omega-3 content", "Rich nutty flavor", "Antioxidant properties", "Heart-healthy", "Gourmet quality"],
    ingredients: "100% Cold-Pressed Walnut Oil",
    sourcingStory: "Pressed from premium Hunza walnuts, capturing their legendary rich flavor.",
    weight: "250ml",
    inStock: true,
    featured: false,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 67,
  },
  {
    id: "11",
    name: "Acacia Honey",
    slug: "acacia-honey",
    description: "This light, delicate honey comes from bees that forage primarily on acacia blossoms in the lower valleys of Gilgit-Baltistan.",
    shortDescription: "Light, delicate acacia honey with mild sweetness and floral notes.",
    price: 1599,
    originalPrice: 1799,
    category: "honey",
    images: ["/products/acacia-honey-1.jpg", "/products/acacia-honey-2.jpg"],
    benefits: ["Slow crystallization", "Mild, delicate flavor", "Natural antibacterial", "Rich in antioxidants", "Perfect for tea"],
    ingredients: "100% Pure Acacia Honey",
    sourcingStory: "Collected from beekeepers in the acacia-rich valleys near Gilgit.",
    weight: "500g",
    inStock: true,
    featured: false,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "12",
    name: "Shilajit Capsules",
    slug: "shilajit-capsules",
    description: "For those who prefer convenience without compromising on quality, our Shilajit capsules offer the same premium Himalayan Shilajit in an easy-to-take form.",
    shortDescription: "Convenient capsule form of pure Himalayan Shilajit, 60-day supply.",
    price: 2499,
    originalPrice: 2899,
    category: "shilajit",
    images: ["/products/shilajit-caps-1.jpg", "/products/shilajit-caps-2.jpg"],
    benefits: ["Convenient dosing", "No strong taste", "Travel-friendly", "Same premium quality", "60-day supply"],
    ingredients: "Purified Himalayan Shilajit Extract, Vegetable Capsule",
    sourcingStory: "Made from the same premium Shilajit, processed and encapsulated for convenience.",
    weight: "60 capsules",
    inStock: true,
    featured: false,
    bestSeller: false,
    rating: 4.8,
    reviewCount: 178,
  },
];

const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Amazing Health Benefits of Almonds You Need to Know",
    slug: "health-benefits-of-almonds",
    excerpt: "Discover why almonds are considered a superfood and how incorporating them into your daily diet can transform your health.",
    content: "Almonds are one of nature's most perfect foods...",
    category: "Nutrition",
    image: "/blog/almonds-benefits.jpg",
    author: "Dr. Sarah Khan",
    publishedAt: "2024-12-15",
    readTime: 5,
  },
  {
    id: "2",
    title: "How Shilajit Improves Energy and Vitality Naturally",
    slug: "shilajit-energy-vitality",
    excerpt: "Learn about the ancient Ayurvedic wisdom behind Shilajit and its remarkable effects on energy, focus, and overall wellness.",
    content: "Shilajit has been used for thousands of years...",
    category: "Wellness",
    image: "/blog/shilajit-benefits.jpg",
    author: "Ayush Sharma",
    publishedAt: "2024-12-10",
    readTime: 7,
  },
  {
    id: "3",
    title: "The Secret to Hunza Valley's Famous Longevity",
    slug: "hunza-valley-longevity-secret",
    excerpt: "Explore what makes the people of Hunza Valley live such long, healthy lives and how you can adopt their dietary habits.",
    content: "The Hunza people are renowned for their exceptional longevity...",
    category: "Lifestyle",
    image: "/blog/hunza-valley.jpg",
    author: "Ali Hassan",
    publishedAt: "2024-12-05",
    readTime: 6,
  },
  {
    id: "4",
    title: "Why Raw Honey is Nature's Perfect Medicine",
    slug: "raw-honey-natural-medicine",
    excerpt: "Uncover the medicinal properties of raw, unprocessed honey and why it's been used as a healing agent for millennia.",
    content: "Raw honey has been valued for its medicinal properties...",
    category: "Health",
    image: "/blog/raw-honey.jpg",
    author: "Dr. Sarah Khan",
    publishedAt: "2024-11-28",
    readTime: 5,
  },
  {
    id: "5",
    title: "Cold-Pressed vs. Regular Oils: What's the Difference?",
    slug: "cold-pressed-vs-regular-oils",
    excerpt: "Understanding why cold-pressed oils are superior and how the extraction method affects nutritional value.",
    content: "When it comes to cooking and skincare oils...",
    category: "Education",
    image: "/blog/cold-pressed-oils.jpg",
    author: "Chef Fatima",
    publishedAt: "2024-11-20",
    readTime: 4,
  },
  {
    id: "6",
    title: "Traditional Recipes Using Dry Fruits from Gilgit-Baltistan",
    slug: "traditional-dry-fruit-recipes",
    excerpt: "Authentic recipes from the mountain communities that showcase the versatility of premium dry fruits.",
    content: "The cuisine of Gilgit-Baltistan features dry fruits prominently...",
    category: "Recipes",
    image: "/blog/dry-fruit-recipes.jpg",
    author: "Chef Fatima",
    publishedAt: "2024-11-15",
    readTime: 8,
  },
];

const initialTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmed Malik",
    location: "Lahore, Pakistan",
    content: "The quality of almonds and walnuts from HealthyHills is exceptional. You can taste the difference immediately. I've been ordering for 6 months and the consistency is remarkable.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Sharma",
    location: "Delhi, India",
    content: "I was skeptical about Shilajit at first, but after using HealthyHills' product for 2 months, my energy levels have improved significantly. The quality is authentic and the service is excellent.",
    rating: 5,
  },
  {
    id: "3",
    name: "John Smith",
    location: "London, UK",
    content: "Finally found a reliable source for genuine Himalayan products. The wild mountain honey is unlike anything I've tasted before - pure and incredibly flavorful.",
    rating: 5,
  },
  {
    id: "4",
    name: "Fatima Abbas",
    location: "Karachi, Pakistan",
    content: "The apricot oil has transformed my skincare routine. It's light, absorbs quickly, and has made my skin so much softer. Love the natural products!",
    rating: 5,
  },
  {
    id: "5",
    name: "Michael Chen",
    location: "Singapore",
    content: "Fast international shipping and excellent packaging. The dry fruits arrived fresh and were of premium quality. Highly recommend for anyone seeking authentic products.",
    rating: 4,
  },
  {
    id: "6",
    name: "Sarah Johnson",
    location: "New York, USA",
    content: "As a nutritionist, I'm very particular about quality. HealthyHills products meet my high standards. The Hunza apricots are now a staple in my diet recommendations.",
    rating: 5,
  },
];

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private carts: Map<string, Cart>;
  private orders: Map<string, Order>;
  private blogPosts: Map<string, BlogPost>;
  private testimonials: Map<string, Testimonial>;
  private contactSubmissions: ContactForm[];
  private newsletterSubscribers: Set<string>;

  constructor() {
    this.products = new Map();
    this.carts = new Map();
    this.orders = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = [];
    this.newsletterSubscribers = new Set();

    // Initialize with product data
    initialProducts.forEach((product) => {
      this.products.set(product.id, product);
    });

    // Initialize with blog posts
    initialBlogPosts.forEach((post) => {
      this.blogPosts.set(post.id, post);
    });

    // Initialize with testimonials
    initialTestimonials.forEach((testimonial) => {
      this.testimonials.set(testimonial.id, testimonial);
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find((p) => p.slug === slug);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (p) => p.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter((p) => p.featured);
  }

  async getBestSellers(): Promise<Product[]> {
    return Array.from(this.products.values()).filter((p) => p.bestSeller);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Cart
  async getCart(cartId: string): Promise<Cart | undefined> {
    return this.carts.get(cartId);
  }

  async createCart(): Promise<Cart> {
    const cart: Cart = {
      id: randomUUID(),
      items: [],
      createdAt: new Date().toISOString(),
    };
    this.carts.set(cart.id, cart);
    return cart;
  }

  async addToCart(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart | undefined> {
    const cart = this.carts.get(cartId);
    if (!cart) return undefined;

    const existingItem = cart.items.find((i) => i.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    return cart;
  }

  async updateCartItem(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart | undefined> {
    const cart = this.carts.get(cartId);
    if (!cart) return undefined;

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId !== productId);
    } else {
      const item = cart.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    }

    return cart;
  }

  async removeFromCart(
    cartId: string,
    productId: string
  ): Promise<Cart | undefined> {
    const cart = this.carts.get(cartId);
    if (!cart) return undefined;

    cart.items = cart.items.filter((i) => i.productId !== productId);
    return cart;
  }

  async clearCart(cartId: string): Promise<Cart | undefined> {
    const cart = this.carts.get(cartId);
    if (!cart) return undefined;

    cart.items = [];
    return cart;
  }

  // Orders
  async createOrder(orderData: InsertOrder): Promise<Order> {
    const order: Order = {
      ...orderData,
      id: randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    this.orders.set(order.id, order);
    return order;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  // Blog
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find((p) => p.slug === slug);
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  // Contact & Newsletter
  async submitContactForm(form: ContactForm): Promise<void> {
    this.contactSubmissions.push(form);
  }

  async subscribeNewsletter(email: string): Promise<void> {
    this.newsletterSubscribers.add(email);
  }
}

export const storage = new MemStorage();
