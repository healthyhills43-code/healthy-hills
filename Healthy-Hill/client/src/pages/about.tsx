import { motion } from "framer-motion";
import { Mountain, Heart, Leaf, Users, Award, Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const values = [
  {
    icon: Leaf,
    title: "Purity",
    description:
      "We source only the purest, most natural products from the pristine environments of Gilgit-Baltistan.",
  },
  {
    icon: Heart,
    title: "Authenticity",
    description:
      "Every product is carefully verified for authenticity, maintaining traditional harvesting methods.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We work directly with local farmers and communities, ensuring fair trade and sustainable practices.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "Rigorous quality testing ensures that every product meets the highest standards before reaching you.",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Local Farmers" },
  { value: "50+", label: "Products" },
  { value: "15+", label: "Countries Shipped" },
];

const timeline = [
  {
    year: "2018",
    title: "The Beginning",
    description:
      "HealthyHills was founded with a mission to bring authentic Himalayan products to health-conscious consumers worldwide.",
  },
  {
    year: "2019",
    title: "Direct Sourcing",
    description:
      "Established direct partnerships with farmers and harvesters in Gilgit-Baltistan, ensuring quality at the source.",
  },
  {
    year: "2020",
    title: "Quality Lab",
    description:
      "Opened our quality testing facility to ensure every product meets international purity and safety standards.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "Expanded shipping to over 15 countries, bringing Himalayan wellness to customers around the world.",
  },
  {
    year: "2024",
    title: "Sustainability Initiative",
    description:
      "Launched our sustainability program, focusing on eco-friendly packaging and supporting local communities.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Our Story
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              HealthyHills was born from a deep love for the majestic mountains of
              Gilgit-Baltistan and a desire to share their natural treasures with
              the world. We believe that the purest wellness comes from nature,
              and our mission is to bring these gifts to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeInUp}>
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/30">
                <div className="flex h-full items-center justify-center">
                  <Mountain className="h-32 w-32 text-primary/30" />
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                From the Mountains to Your Home
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nestled in the heart of the Karakoram and Himalayan ranges,
                  Gilgit-Baltistan is home to some of the world's most pristine
                  natural environments. The unique climate, pure air, and
                  mineral-rich soil create perfect conditions for growing
                  exceptionally nutritious and flavorful produce.
                </p>
                <p>
                  For generations, the people of this region have known the
                  remarkable health benefits of their local products. The famous
                  longevity of the Hunza people has been attributed to their diet
                  rich in local dry fruits, pure honey, and natural Shilajit.
                </p>
                <p>
                  We work directly with local farmers, beekeepers, and harvesters
                  who have passed down their knowledge through generations. This
                  ensures not only the highest quality products but also supports
                  the livelihoods of mountain communities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div {...fadeInUp}>
              <Card className="h-full border-card-border">
                <CardContent className="p-6 md:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    To make authentic, pure, and beneficial natural products from
                    Gilgit-Baltistan accessible to health-conscious people
                    worldwide, while supporting sustainable practices and local
                    communities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full border-card-border">
                <CardContent className="p-6 md:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold">
                    Our Vision
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    To become the world's most trusted source for premium
                    Himalayan natural products, known for uncompromising quality,
                    authenticity, and commitment to sustainability.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              These core principles guide everything we do
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  className="h-full border-card-border text-center"
                  data-testid={`card-value-${value.title.toLowerCase()}`}
                >
                  <CardContent className="p-6">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-semibold">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Our Journey
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              From humble beginnings to a global brand
            </p>
          </motion.div>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative mb-8 flex ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    className={`ml-12 w-full md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="absolute left-2.5 top-1 h-4 w-4 rounded-full border-4 border-primary bg-background md:left-1/2 md:-translate-x-1/2" />
                    <Card className="border-card-border">
                      <CardContent className="p-5">
                        <span className="font-heading text-xl font-bold text-primary">
                          {item.year}
                        </span>
                        <h3 className="mt-1 font-heading text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
