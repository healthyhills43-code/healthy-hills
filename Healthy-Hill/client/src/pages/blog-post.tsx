import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, User, ArrowLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import type { BlogPost } from "@shared/schema";

function BlogPostSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <Skeleton className="h-4 w-48 mb-8" />
      <Skeleton className="h-6 w-24 mb-4" />
      <Skeleton className="h-12 w-full mb-4" />
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="aspect-[16/9] w-full mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) throw new Error("Blog post not found");
      return res.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold" data-testid="text-blog-not-found">
            Article not found
          </h1>
          <p className="mt-2 text-muted-foreground">
            The article you're looking for doesn't exist.
          </p>
          <Button asChild className="mt-4" data-testid="link-back-to-blog">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground" data-testid="nav-breadcrumb">
          <Link href="/" className="hover:text-foreground" data-testid="link-breadcrumb-home">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/blog" className="hover:text-foreground" data-testid="link-breadcrumb-blog">
            Blog
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground line-clamp-1" data-testid="text-breadcrumb-post">
            {post.title}
          </span>
        </nav>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" data-testid="badge-category">
            {post.category}
          </Badge>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl" data-testid="text-post-title">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1" data-testid="text-post-author">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-1" data-testid="text-post-date">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1" data-testid="text-post-readtime">
              <Clock className="h-4 w-4" />
              {post.readTime} min read
            </div>
          </div>

          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/30">
            <div className="flex h-full items-center justify-center text-8xl font-bold text-primary/20">
              {post.title.charAt(0)}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground" data-testid="text-post-excerpt">
              {post.excerpt}
            </p>
            
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed" data-testid="text-post-content">
              <p>
                {post.content}
              </p>
              <p>
                This is a preview of the article content. In a production environment, 
                the full article content would be stored in the database and rendered 
                here with proper formatting, images, and embedded media.
              </p>
              <p>
                At HealthyHills, we are committed to providing you with the highest 
                quality natural products from Gilgit-Baltistan. Our team of experts 
                carefully researches and writes articles to help you understand the 
                benefits of our products and how to incorporate them into your daily life.
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex items-center justify-between">
            <Button variant="outline" asChild data-testid="link-back-to-blog-bottom">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <Button asChild data-testid="link-shop-cta">
              <Link href="/shop">
                Shop Products
              </Link>
            </Button>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
