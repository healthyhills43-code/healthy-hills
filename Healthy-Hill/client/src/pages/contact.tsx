import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contactFormSchema, type ContactForm } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+92 123 456 7890",
    description: "Mon-Sat, 9am-6pm PKT",
  },
  {
    icon: Mail,
    title: "Email",
    content: "hello@healthyhills.com",
    description: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Gilgit-Baltistan, Pakistan",
    description: "Our sourcing headquarters",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon - Sat: 9am - 6pm",
    description: "Sunday: Closed",
  },
];

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email and SMS. You can use this to track your package on our shipping partner's website.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for unopened products. If you're not satisfied with your purchase, please contact us within 7 days of delivery for a full refund or exchange.",
  },
  {
    question: "Are your products organic?",
    answer:
      "All our products are 100% natural and sourced from organic farming practices in Gilgit-Baltistan. We don't use any chemical fertilizers or pesticides.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to over 15 countries worldwide. International shipping rates and delivery times vary by destination. Contact us for specific details.",
  },
  {
    question: "How should I store the products?",
    answer:
      "Most of our products should be stored in a cool, dry place away from direct sunlight. Specific storage instructions are included with each product. Honey and oils should be kept at room temperature.",
  },
  {
    question: "Are your products lab tested?",
    answer:
      "Yes, every batch of our products undergoes rigorous quality testing for purity, safety, and authenticity. We can provide certificates of analysis upon request.",
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-heading text-3xl font-bold md:text-4xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-card-border">
                <CardContent className="p-6 md:p-8">
                  <h2 className="font-heading text-2xl font-bold">
                    Send us a Message
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Fill out the form below and we'll get back to you shortly.
                  </p>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="mt-6 space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  {...field}
                                  data-testid="input-contact-name"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  {...field}
                                  data-testid="input-contact-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="How can we help?"
                                {...field}
                                data-testid="input-contact-subject"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us more about your inquiry..."
                                className="min-h-[150px] resize-none"
                                {...field}
                                data-testid="textarea-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gap-2 sm:w-auto"
                        disabled={contactMutation.isPending}
                        data-testid="button-contact-submit"
                      >
                        <Send className="h-4 w-4" />
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-card-border">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold">
                    Contact Information
                  </h3>
                  <div className="mt-4 space-y-4">
                    {contactInfo.map((info) => (
                      <div key={info.title} className="flex gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{info.content}</p>
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-card-border bg-green-50 dark:bg-green-950/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                      <SiWhatsapp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold">
                        Chat on WhatsApp
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Quick responses, easy ordering
                      </p>
                    </div>
                  </div>
                  <Button
                    className="mt-4 w-full gap-2 bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <a
                      href="https://wa.me/921234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-whatsapp"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Start Chat
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="font-heading text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-muted-foreground">
            Find quick answers to common questions
          </p>

          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
