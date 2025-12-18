import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Check,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/product-card";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@shared/schema";

function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <Skeleton className="h-4 w-64 mb-8" />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="mt-4 grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", slug],
    queryFn: async () => {
      const res = await fetch(`/api/products/${slug}`);
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    },
  });

  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold" data-testid="text-product-not-found">Product not found</h1>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild className="mt-4" data-testid="link-back-to-shop">
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) * 100
      )
    : 0;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="nav-breadcrumb">
          <Link href="/" className="hover:text-foreground" data-testid="link-breadcrumb-home">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-foreground" data-testid="link-breadcrumb-shop">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-foreground capitalize"
            data-testid="link-breadcrumb-category"
          >
            {product.category.replace("-", " ")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground" data-testid="text-breadcrumb-product">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-muted" data-testid="img-product-main">
              <div className="flex h-full w-full items-center justify-center text-8xl font-bold text-muted-foreground/20">
                {product.name.charAt(0)}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-muted ring-2 ring-transparent transition-all first:ring-primary hover:ring-primary"
                  data-testid={`img-product-thumbnail-${i}`}
                >
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground/20">
                    {product.name.charAt(0)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex flex-wrap items-center gap-2">
              {product.bestSeller && (
                <Badge variant="default" data-testid="badge-bestseller">Best Seller</Badge>
              )}
              {hasDiscount && (
                <Badge variant="destructive" data-testid="badge-discount">-{discountPercent}% Off</Badge>
              )}
              {product.inStock ? (
                <Badge variant="secondary" className="bg-primary/10 text-primary" data-testid="badge-instock">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="secondary" data-testid="badge-outofstock">Out of Stock</Badge>
              )}
            </div>

            <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl" data-testid="text-product-name">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2" data-testid="rating-container">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-chart-2 text-chart-2"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium" data-testid="text-rating">{product.rating}</span>
              <span className="text-muted-foreground" data-testid="text-review-count">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-heading text-3xl font-bold" data-testid="text-price">
                Rs. {product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through" data-testid="text-original-price">
                  Rs. {product.originalPrice!.toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed" data-testid="text-short-description">
              {product.shortDescription}
            </p>

            <div className="mt-4 text-sm text-muted-foreground" data-testid="text-weight">
              Weight: <span className="font-medium text-foreground">{product.weight}</span>
            </div>

            <Separator className="my-6" />

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                data-testid="button-add-to-cart"
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                data-testid="button-add-to-wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 grid gap-3 rounded-lg bg-muted/50 p-4" data-testid="card-shipping-info">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on orders above Rs. 5,000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>100% authentic, lab-tested quality</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>Easy returns within 7 days</span>
              </div>
            </div>

            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="benefits">
                <AccordionTrigger className="font-heading font-semibold" data-testid="accordion-benefits">
                  Health Benefits
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2" data-testid={`text-benefit-${i}`}>
                        <Check className="h-4 w-4 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {product.ingredients && (
                <AccordionItem value="ingredients">
                  <AccordionTrigger className="font-heading font-semibold" data-testid="accordion-ingredients">
                    Ingredients
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground" data-testid="text-ingredients">{product.ingredients}</p>
                  </AccordionContent>
                </AccordionItem>
              )}

              {product.sourcingStory && (
                <AccordionItem value="sourcing">
                  <AccordionTrigger className="font-heading font-semibold" data-testid="accordion-sourcing">
                    Sourcing Story
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground" data-testid="text-sourcing">{product.sourcingStory}</p>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="shipping">
                <AccordionTrigger className="font-heading font-semibold" data-testid="accordion-shipping">
                  Shipping Information
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      We ship across Pakistan and internationally. Domestic orders
                      are typically delivered within 3-5 business days.
                    </p>
                    <p>
                      Free shipping on all orders above Rs. 5,000. For orders below
                      this amount, a flat shipping fee of Rs. 250 applies.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold" data-testid="text-description-title">Product Description</h2>
          <div className="mt-4 prose prose-gray dark:prose-invert max-w-none">
            {product.description.split("\n\n").map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed" data-testid={`text-description-${i}`}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold" data-testid="text-related-title">Related Products</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
