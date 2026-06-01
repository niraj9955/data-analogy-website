"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogData } from "@/lib/types";

export function BlogSection({ blogs }: { blogs: BlogData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 580;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-cyan-200 text-cyan-700"
            >
              Insights
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Blogs
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 transparent",
            scrollSnapType: "x mandatory",
          }}
        >
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="shrink-0 w-[320px] sm:w-[400px] lg:w-[500px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              style={{ scrollSnapAlign: "start" }}
            >
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${blog.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-cyan-600 text-white text-xs">
                    {blog.category}
                  </Badge>
                </div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-cyan-700 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                  <span>{blog.author}</span>
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
