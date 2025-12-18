import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@shared/schema";

function BlogSkeleton() {
  return (
    <div className="space-y-12">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <Skeleton className="aspect-[4/3] md:aspect-auto" />
          <CardContent className="p-6 md:p-8">
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </div>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-[4/3]" />
            <CardContent className="p-5">
              <Skeleton className="h-4 w-20 mb-3" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function BlogPage() {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const res = await fetch("/api/blog");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="bg-card py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center">
              <Skeleton className="h-10 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

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
            <h1 className="font-heading text-3xl font-bold md:text-4xl" data-testid="text-blog-title">
              HealthyHills Blog
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground" data-testid="text-blog-description">
              Discover health tips, recipes, and insights about natural products
              from the Himalayas
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card
                className="group cursor-pointer overflow-hidden border-card-border"
                data-testid={`card-blog-featured-${featuredPost.id}`}
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/30 md:aspect-auto">
                    <div className="flex h-full items-center justify-center text-6xl font-bold text-primary/20">
                      {featuredPost.title.charAt(0)}
                    </div>
                  </div>
                  <CardContent className="flex flex-col justify-center p-6 md:p-8">
                    <Badge variant="secondary" className="w-fit" data-testid="badge-featured-category">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="mt-4 font-heading text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl" data-testid="text-featured-title">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground line-clamp-3" data-testid="text-featured-excerpt">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1" data-testid="text-featured-author">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1" data-testid="text-featured-date">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <div className="flex items-center gap-1" data-testid="text-featured-readtime">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime} min read
                      </div>
                    </div>
                    <Button className="mt-6 w-fit gap-2" data-testid="button-read-featured">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </motion.div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card
                  className="group h-full cursor-pointer overflow-hidden border-card-border transition-shadow hover:shadow-lg"
                  data-testid={`card-blog-${post.id}`}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/20">
                    <div className="flex h-full items-center justify-center text-4xl font-bold text-primary/20">
                      {post.title.charAt(0)}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${post.id}`}>
                      {post.category}
                    </Badge>
                    <h3 className="mt-3 font-heading text-lg font-semibold leading-tight transition-colors group-hover:text-primary line-clamp-2" data-testid={`text-title-${post.id}`}>
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2" data-testid={`text-excerpt-${post.id}`}>
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span data-testid={`text-author-${post.id}`}>{post.author}</span>
                      <span>|</span>
                      <span data-testid={`text-readtime-${post.id}`}>{post.readTime} min read</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-xl bg-primary p-8 text-center md:p-12"
        >
          <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl" data-testid="text-newsletter-title">
            Stay Updated
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80" data-testid="text-newsletter-description">
            Subscribe to our newsletter for the latest health tips, recipes, and
            exclusive offers.
          </p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-primary-foreground text-foreground placeholder:text-muted-foreground"
              data-testid="input-blog-newsletter-email"
            />
            <Button
              type="submit"
              variant="secondary"
              data-testid="button-blog-subscribe"
            >
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
