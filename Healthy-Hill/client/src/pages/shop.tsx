import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/product-card";
import { categories } from "@shared/schema";
import type { Product } from "@shared/schema";

type SortOption = "popularity" | "price-asc" | "price-desc" | "newest" | "rating";

const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

const priceRanges = [
  { id: "under-1000", label: "Under Rs. 1,000", min: 0, max: 1000 },
  { id: "1000-2000", label: "Rs. 1,000 - 2,000", min: 1000, max: 2000 },
  { id: "2000-3000", label: "Rs. 2,000 - 3,000", min: 2000, max: 3000 },
  { id: "over-3000", label: "Over Rs. 3,000", min: 3000, max: Infinity },
];

function ProductSkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
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

function FilterSection({
  selectedCategory,
  setSelectedCategory,
  selectedPriceRanges,
  setSelectedPriceRanges,
  onlyInStock,
  setOnlyInStock,
  onlyBestSellers,
  setOnlyBestSellers,
}: {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedPriceRanges: string[];
  setSelectedPriceRanges: (v: string[]) => void;
  onlyInStock: boolean;
  setOnlyInStock: (v: boolean) => void;
  onlyBestSellers: boolean;
  setOnlyBestSellers: (v: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-heading font-semibold" data-testid="text-filter-categories">Categories</h3>
        <div className="space-y-2">
          <div
            className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors ${
              selectedCategory === ""
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
            onClick={() => setSelectedCategory("")}
            data-testid="filter-category-all"
          >
            All Products
          </div>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => setSelectedCategory(cat.id)}
              data-testid={`filter-category-${cat.id}`}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-heading font-semibold" data-testid="text-filter-price">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center gap-2">
              <Checkbox
                id={range.id}
                checked={selectedPriceRanges.includes(range.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedPriceRanges([...selectedPriceRanges, range.id]);
                  } else {
                    setSelectedPriceRanges(
                      selectedPriceRanges.filter((id) => id !== range.id)
                    );
                  }
                }}
                data-testid={`filter-price-${range.id}`}
              />
              <Label htmlFor={range.id} className="text-sm cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-heading font-semibold" data-testid="text-filter-other">Other Filters</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={onlyInStock}
              onCheckedChange={(checked) => setOnlyInStock(!!checked)}
              data-testid="filter-in-stock"
            />
            <Label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock Only
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="best-sellers"
              checked={onlyBestSellers}
              onCheckedChange={(checked) => setOnlyBestSellers(!!checked)}
              data-testid="filter-best-sellers"
            />
            <Label htmlFor="best-sellers" className="text-sm cursor-pointer">
              Best Sellers
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const initialCategory = urlParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyBestSellers, setOnlyBestSellers] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedPriceRanges.length > 0) {
      const ranges = selectedPriceRanges.map((id) =>
        priceRanges.find((r) => r.id === id)
      );
      result = result.filter((p) =>
        ranges.some((r) => r && p.price >= r.min && p.price <= r.max)
      );
    }

    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    if (onlyBestSellers) {
      result = result.filter((p) => p.bestSeller);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.reverse();
        break;
      case "popularity":
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [
    allProducts,
    searchQuery,
    selectedCategory,
    selectedPriceRanges,
    onlyInStock,
    onlyBestSellers,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedPriceRanges.length +
    (onlyInStock ? 1 : 0) +
    (onlyBestSellers ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRanges([]);
    setOnlyInStock(false);
    setOnlyBestSellers(false);
    setSearchQuery("");
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
            <h1 className="font-heading text-3xl font-bold md:text-4xl" data-testid="text-shop-title">
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)?.name ||
                  "Shop"
                : "All Products"}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground" data-testid="text-shop-description">
              {selectedCategory
                ? categories.find((c) => c.id === selectedCategory)
                    ?.description
                : "Explore our complete collection of premium natural products from Gilgit-Baltistan"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 lg:hidden" data-testid="button-mobile-filters">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSection
                    selectedCategory={selectedCategory}
                    setSelectedCategory={(v) => {
                      setSelectedCategory(v);
                      setMobileFiltersOpen(false);
                    }}
                    selectedPriceRanges={selectedPriceRanges}
                    setSelectedPriceRanges={setSelectedPriceRanges}
                    onlyInStock={onlyInStock}
                    setOnlyInStock={setOnlyInStock}
                    onlyBestSellers={onlyBestSellers}
                    setOnlyBestSellers={setOnlyBestSellers}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-48" data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    data-testid={`sort-option-${option.value}`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground" data-testid="text-active-filters">Active filters:</span>
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1" data-testid="badge-filter-category">
                {categories.find((c) => c.id === selectedCategory)?.name}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedCategory("")}
                />
              </Badge>
            )}
            {selectedPriceRanges.map((id) => (
              <Badge key={id} variant="secondary" className="gap-1" data-testid={`badge-filter-price-${id}`}>
                {priceRanges.find((r) => r.id === id)?.label}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setSelectedPriceRanges(
                      selectedPriceRanges.filter((r) => r !== id)
                    )
                  }
                />
              </Badge>
            ))}
            {onlyInStock && (
              <Badge variant="secondary" className="gap-1" data-testid="badge-filter-instock">
                In Stock
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setOnlyInStock(false)}
                />
              </Badge>
            )}
            {onlyBestSellers && (
              <Badge variant="secondary" className="gap-1" data-testid="badge-filter-bestsellers">
                Best Sellers
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setOnlyBestSellers(false)}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground"
              data-testid="button-clear-filters"
            >
              Clear all
            </Button>
          </div>
        )}

        <div className="mt-8 flex gap-8">
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterSection
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPriceRanges={selectedPriceRanges}
                setSelectedPriceRanges={setSelectedPriceRanges}
                onlyInStock={onlyInStock}
                setOnlyInStock={setOnlyInStock}
                onlyBestSellers={onlyBestSellers}
                setOnlyBestSellers={setOnlyBestSellers}
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {isLoading ? (
              <ProductSkeletonGrid />
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold" data-testid="text-no-products">
                  No products found
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearAllFilters}
                  data-testid="button-clear-filters-empty"
                >
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
