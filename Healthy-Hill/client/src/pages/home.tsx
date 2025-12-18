import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Leaf,
  Shield,
  Truck,
  Star,
  ChevronRight,
  Mountain,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/products/product-card";
import type { Product, Testimonial } from "@shared/schema";
import { categories } from "@shared/schema";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const valueProps = [
  {
    icon: Mountain,
    title: "Himalayan Purity",
    description:
      "Sourced directly from the pristine mountains of Gilgit-Baltistan, where nature remains untouched.",
  },
  {
    icon: Sparkles,
    title: "Direct from Source",
    description:
      "We work directly with local farmers and harvesters, ensuring authenticity and fair trade practices.",
  },
  {
    icon: Shield,
    title: "Lab Tested Quality",
    description:
      "Every product undergoes rigorous quality testing to ensure purity and safety for your family.",
  },
];

const trustBadges = [
  "100% Natural",
  "Sourced from Himalayas",
  "Premium Quality",
  "Lab Tested",
];

function ProductSkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-[4/3] w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { data: featuredProducts = [], isLoading: featuredLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
    queryFn: async () => {
      const res = await fetch("/api/products?featured=true");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const { data: bestSellers = [], isLoading: bestSellersLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { bestSeller: true }],
    queryFn: async () => {
      const res = await fetch("/api/products?bestSeller=true");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6" data-testid="badge-hero-premium">
              <Leaf className="mr-1 h-3 w-3" />
              Premium Natural Products
            </Badge>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl xl:text-7xl" data-testid="text-hero-title">
              Discover the{" "}
              <span className="text-primary">Purest Wellness</span> from the
              Himalayas
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl" data-testid="text-hero-description">
              Experience the finest dry fruits, pure Shilajit, natural honey, and
              cold-pressed oils sourced directly from the majestic mountains of
              Gilgit-Baltistan.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/shop" data-testid="link-hero-shop-now">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about" data-testid="link-hero-our-story">
                  Discover Our Story
                </Link>
              </Button>
            </div>

            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {trustBadges.map((badge, index) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium shadow-sm"
                  data-testid={`badge-trust-${index}`}
                >
                  <CheckCircle className="h-4 w-4 text-primary" />
                  {badge}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl" data-testid="text-featured-title">
              Featured Products
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground" data-testid="text-featured-description">
              Handpicked selections of our finest natural products
            </p>
          </motion.div>

          <div className="mt-10">
            {featuredLoading ? (
              <ProductSkeletonGrid />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.slice(0, 4).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>

          <motion.div {...fadeInUp} className="mt-10 text-center">
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link href="/shop" data-testid="link-view-all-products">
                View All Products
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl" data-testid="text-categories-title">
              Shop by Category
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground" data-testid="text-categories-description">
              Explore our range of premium natural products
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/shop?category=${category.id}`}>
                  <Card
                    className="group cursor-pointer overflow-visible border-card-border transition-shadow hover:shadow-lg hover-elevate"
                    data-testid={`card-category-${category.id}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/20 to-accent/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Leaf className="h-16 w-16 text-primary/40 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-heading text-lg font-semibold" data-testid={`text-category-name-${category.id}`}>
                        {category.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2" data-testid={`text-category-desc-${category.id}`}>
                        {category.description}
                      </p>
                      <div className="mt-3 flex items-center text-sm font-medium text-primary">
                        Shop Now
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl" data-testid="text-why-title">
              Why Choose HealthyHills
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground" data-testid="text-why-description">
              We're committed to bringing you the purest products from nature
            </p>
          </motion.div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="text-center"
                data-testid={`card-value-prop-${index}`}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <prop.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold">
                  {prop.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl" data-testid="text-bestsellers-title">
              Best Sellers
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground" data-testid="text-bestsellers-description">
              Our customers' most loved products
            </p>
          </motion.div>

          <div className="mt-10">
            {bestSellersLoading ? (
              <ProductSkeletonGrid />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {bestSellers.slice(0, 4).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl" data-testid="text-testimonials-title">
              What Our Customers Say
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground" data-testid="text-testimonials-description">
              Hear from our happy customers around the world
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  className="h-full border-card-border"
                  data-testid={`card-testimonial-${testimonial.id}`}
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "fill-chart-2 text-chart-2"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-muted-foreground" data-testid={`text-testimonial-content-${testimonial.id}`}>
                      "{testimonial.content}"
                    </p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="font-semibold" data-testid={`text-testimonial-name-${testimonial.id}`}>{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-location-${testimonial.id}`}>
                        {testimonial.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <motion.div {...fadeInUp}>
              <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl" data-testid="text-newsletter-title">
                Subscribe to Our Newsletter
              </h2>
              <p className="mt-3 text-primary-foreground/80" data-testid="text-newsletter-description">
                Get 10% off your first order and stay updated with our latest
                products, health tips, and exclusive offers.
              </p>
            </motion.div>

            <motion.div {...fadeInUp}>
              <form className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="whitespace-nowrap"
                  data-testid="button-newsletter-subscribe"
                >
                  Subscribe Now
                </Button>
              </form>
              <p className="mt-3 text-sm text-primary-foreground/70" data-testid="text-newsletter-disclaimer">
                By subscribing, you agree to receive marketing emails from us.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-4">
            <motion.div {...fadeInUp} className="flex items-center gap-4" data-testid="card-feature-shipping">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-muted-foreground">
                  On orders above Rs. 5,000
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="flex items-center gap-4" data-testid="card-feature-quality">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Quality Guarantee</p>
                <p className="text-sm text-muted-foreground">
                  100% authentic products
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="flex items-center gap-4" data-testid="card-feature-natural">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">100% Natural</p>
                <p className="text-sm text-muted-foreground">
                  No additives or preservatives
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="flex items-center gap-4" data-testid="card-feature-premium">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Premium Quality</p>
                <p className="text-sm text-muted-foreground">
                  Handpicked & tested
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
