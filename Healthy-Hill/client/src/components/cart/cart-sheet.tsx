import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@shared/schema";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCart();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const subtotal = getCartTotal(products);
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;

  const cartItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  }).filter((item) => item.product);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-heading" data-testid="text-cart-title">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex-1 space-y-4 py-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-20 w-20 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-heading text-lg font-semibold" data-testid="text-cart-empty">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add some products to get started
              </p>
            </div>
            <Button onClick={() => onOpenChange(false)} asChild data-testid="link-continue-shopping-empty">
              <Link href="/shop">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <AnimatePresence mode="popLayout">
                {cartItems.map(({ product, quantity, productId }) => (
                  <motion.div
                    key={productId}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="py-4"
                    data-testid={`cart-item-${productId}`}
                  >
                    <div className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
                          {product!.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <h4 className="font-medium leading-tight line-clamp-2" data-testid={`text-cart-item-name-${productId}`}>
                            {product!.name}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0 text-muted-foreground"
                            onClick={() => removeItem(productId)}
                            data-testid={`button-remove-${productId}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground" data-testid={`text-cart-item-weight-${productId}`}>
                          {product!.weight}
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(productId, quantity - 1)
                              }
                              data-testid={`button-decrease-${productId}`}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium" data-testid={`text-quantity-${productId}`}>
                              {quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(productId, quantity + 1)
                              }
                              data-testid={`button-increase-${productId}`}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold" data-testid={`text-cart-item-total-${productId}`}>
                            Rs. {(product!.price * quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              {subtotal < 5000 && (
                <div className="rounded-lg bg-accent p-3" data-testid="card-free-shipping">
                  <p className="text-sm text-accent-foreground">
                    Add Rs. {(5000 - subtotal).toLocaleString()} more for free
                    shipping!
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-accent-foreground/20">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-cart-subtotal">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span data-testid="text-cart-shipping">
                    {shipping === 0 ? (
                      <span className="text-primary">Free</span>
                    ) : (
                      `Rs. ${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span data-testid="text-cart-total">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => onOpenChange(false)}
                  asChild
                >
                  <Link href="/checkout" data-testid="link-checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onOpenChange(false)}
                  asChild
                >
                  <Link href="/shop" data-testid="link-continue-shopping-bottom">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
