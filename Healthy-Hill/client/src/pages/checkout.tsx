import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft, CreditCard, Truck, Check, ShoppingBag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/cart-context";
import { apiRequest } from "@/lib/queryClient";
import type { Product } from "@shared/schema";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(10, "Full address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { items, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">(
    "shipping"
  );
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (data) => {
      setOrderNumber(data.id.slice(0, 8).toUpperCase());
      setOrderComplete(true);
      clearCart();
    },
  });

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Pakistan",
    },
  });

  const subtotal = getCartTotal(products);
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;

  const cartItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return { ...item, product };
    })
    .filter((item) => item.product);

  const onSubmit = async (data: CheckoutFormData) => {
    if (step === "shipping") {
      setStep("payment");
    } else if (step === "payment") {
      const orderData = {
        items: cartItems.map(({ product, quantity }) => ({
          productId: product!.id,
          productName: product!.name,
          price: product!.price,
          quantity,
        })),
        customer: data,
        subtotal,
        shipping,
        total,
      };
      createOrderMutation.mutate(orderData);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold" data-testid="text-checkout-empty">
            Your cart is empty
          </h1>
          <p className="mt-2 text-muted-foreground">
            Add some products to proceed to checkout
          </p>
          <Button asChild className="mt-4">
            <Link href="/shop" data-testid="link-continue-shopping">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold" data-testid="text-order-confirmed">
            Order Confirmed!
          </h1>
          <p className="mt-3 text-muted-foreground" data-testid="text-order-confirmation-message">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <div className="mt-6 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-heading text-2xl font-bold" data-testid="text-order-number">{orderNumber}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild data-testid="link-continue-shopping-success">
              <Link href="/shop">
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" asChild data-testid="link-home-success">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() =>
            step === "payment" ? setStep("shipping") : setLocation("/shop")
          }
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
          {step === "payment" ? "Back to Shipping" : "Back to Shop"}
        </Button>

        <div className="mb-8 flex items-center justify-center gap-4" data-testid="nav-checkout-steps">
          <div
            className={`flex items-center gap-2 ${
              step === "shipping" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                step === "shipping" || step === "payment"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              data-testid="step-shipping"
            >
              {step === "payment" ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <span className="font-medium">Shipping</span>
          </div>
          <div className="h-px w-12 bg-border" />
          <div
            className={`flex items-center gap-2 ${
              step === "payment" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                step === "payment"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
              data-testid="step-payment"
            >
              2
            </div>
            <span className="font-medium">Payment</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {step === "shipping" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2" data-testid="text-shipping-title">
                          <Truck className="h-5 w-5" />
                          Shipping Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="John"
                                    {...field}
                                    data-testid="input-first-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Doe"
                                    {...field}
                                    data-testid="input-last-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    {...field}
                                    data-testid="input-email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="+92 300 1234567"
                                    {...field}
                                    data-testid="input-phone"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123 Main Street, Apartment 4B"
                                  {...field}
                                  data-testid="input-address"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid gap-4 sm:grid-cols-3">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Lahore"
                                    {...field}
                                    data-testid="input-city"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="54000"
                                    {...field}
                                    data-testid="input-postal-code"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger data-testid="select-country">
                                      <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Pakistan">
                                      Pakistan
                                    </SelectItem>
                                    <SelectItem value="UAE">UAE</SelectItem>
                                    <SelectItem value="UK">
                                      United Kingdom
                                    </SelectItem>
                                    <SelectItem value="USA">USA</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === "payment" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2" data-testid="text-payment-title">
                          <CreditCard className="h-5 w-5" />
                          Payment Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-lg border border-dashed border-border bg-muted/50 p-6 text-center" data-testid="card-cod">
                          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 font-heading font-semibold">
                            Cash on Delivery
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Pay when you receive your order. Card payments coming
                            soon!
                          </p>
                        </div>

                        <div className="rounded-lg bg-accent/50 p-4" data-testid="card-shipping-address">
                          <h4 className="font-medium">Shipping Address</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {form.getValues("firstName")}{" "}
                            {form.getValues("lastName")}
                            <br />
                            {form.getValues("address")}
                            <br />
                            {form.getValues("city")},{" "}
                            {form.getValues("postalCode")}
                            <br />
                            {form.getValues("country")}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 w-full"
                  disabled={createOrderMutation.isPending}
                  data-testid="button-continue"
                >
                  {createOrderMutation.isPending
                    ? "Processing..."
                    : step === "shipping"
                    ? "Continue to Payment"
                    : "Place Order"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle data-testid="text-order-summary-title">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(({ product, quantity, productId }) => (
                  <div key={productId} className="flex gap-3" data-testid={`summary-item-${productId}`}>
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <div className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground/30">
                        {product!.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium leading-tight line-clamp-2" data-testid={`text-summary-name-${productId}`}>
                        {product!.name}
                      </p>
                      <p className="text-sm text-muted-foreground" data-testid={`text-summary-qty-${productId}`}>
                        Qty: {quantity}
                      </p>
                    </div>
                    <p className="font-semibold" data-testid={`text-summary-total-${productId}`}>
                      Rs. {(product!.price * quantity).toLocaleString()}
                    </p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span data-testid="text-summary-subtotal">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span data-testid="text-summary-shipping">
                      {shipping === 0 ? (
                        <span className="text-primary">Free</span>
                      ) : (
                        `Rs. ${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span data-testid="text-summary-total">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
