import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className="group relative overflow-visible border-card-border transition-shadow hover:shadow-lg"
        data-testid={`card-product-${product.id}`}
      >
        <Link href={`/product/${product.slug}`} data-testid={`link-product-${product.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg bg-muted">
            <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-muted-foreground/30 transition-transform duration-300 group-hover:scale-105">
              {product.name.charAt(0)}
            </div>
            
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {product.bestSeller && (
                <Badge variant="default" className="text-xs" data-testid={`badge-bestseller-${product.id}`}>
                  Best Seller
                </Badge>
              )}
              {hasDiscount && (
                <Badge variant="destructive" className="text-xs" data-testid={`badge-discount-${product.id}`}>
                  -{discountPercent}%
                </Badge>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </Link>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-1" data-testid={`rating-${product.id}`}>
            <Star className="h-4 w-4 fill-chart-2 text-chart-2" />
            <span className="text-sm font-medium" data-testid={`text-rating-${product.id}`}>{product.rating}</span>
            <span className="text-sm text-muted-foreground" data-testid={`text-reviews-${product.id}`}>
              ({product.reviewCount})
            </span>
          </div>

          <Link href={`/product/${product.slug}`} data-testid={`link-product-name-${product.id}`}>
            <h3 className="font-heading font-semibold leading-tight line-clamp-2 hover:text-primary transition-colors" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
          </Link>

          <p className="mt-1 text-sm text-muted-foreground line-clamp-2" data-testid={`text-product-desc-${product.id}`}>
            {product.shortDescription}
          </p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-lg font-bold" data-testid={`text-price-${product.id}`}>
                Rs. {product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${product.id}`}>
                  Rs. {product.originalPrice!.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <Button
            className="mt-3 w-full gap-2"
            onClick={(e) => {
              e.preventDefault();
              addItem(product.id);
            }}
            disabled={!product.inStock}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
