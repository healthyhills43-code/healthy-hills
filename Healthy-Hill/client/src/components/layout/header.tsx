import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Sun, Moon, Search, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-provider";
import { CartSheet } from "@/components/cart/cart-sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getItemCount, isOpen, setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">
            Healthy<span className="text-primary">Hills</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={location === item.href ? "secondary" : "ghost"}
                className="font-medium"
                data-testid={`link-nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/shop">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsOpen(true)}
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="default"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
                data-testid="badge-cart-count"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </Badge>
            )}
          </Button>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 pt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={location === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start font-medium"
                      data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <CartSheet open={isOpen} onOpenChange={setIsOpen} />
    </header>
  );
}
