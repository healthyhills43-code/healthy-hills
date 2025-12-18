import { Link } from "wouter";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { Button } from "@/components/ui/button";

const footerLinks = {
  shop: [
    { name: "Dry Fruits", href: "/shop?category=dry-fruits" },
    { name: "Shilajit", href: "/shop?category=shilajit" },
    { name: "Natural Honey", href: "/shop?category=honey" },
    { name: "Natural Oils", href: "/shop?category=oils" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/contact" },
  ],
  support: [
    { name: "Shipping Info", href: "/contact" },
    { name: "Returns", href: "/contact" },
    { name: "FAQs", href: "/contact" },
    { name: "Track Order", href: "/contact" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: SiFacebook, href: "#" },
  { name: "Instagram", icon: SiInstagram, href: "#" },
  { name: "X", icon: SiX, href: "#" },
  { name: "YouTube", icon: SiYoutube, href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2" data-testid="link-footer-home">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                Healthy<span className="text-primary">Hills</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Bringing the purest natural products from the majestic mountains of
              Gilgit-Baltistan directly to your doorstep. Experience Himalayan
              wellness like never before.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+92 123 456 7890</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@healthyhills.com</span>
              </div>
            </div>
            <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>Gilgit-Baltistan, Pakistan</span>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
              Shop
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HealthyHills. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                asChild
                data-testid={`link-social-${social.name.toLowerCase()}`}
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
