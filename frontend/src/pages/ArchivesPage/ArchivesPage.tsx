import { useEffect, useState } from "react";
import AddStory from "../../components/archives/AddStory/AddStory";
import Book from "../../components/archives/Book/Book";
import Hero from "../../components/archives/Hero/Hero";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";
import PopupOverlay from "../../components/common/PopupOverlay/PopupOverlay";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import {
  searchStories,
  getStoriesByCategory,
  getStoriesContextByCategory,
} from "../../services/story";
import { getAllCategories } from "../../services/category";
import type { Story } from "../../types/story";
import type { Category } from "../../types/category";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

export default function ArchivesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [page, setPage] = useState(1);
  const [stories, setStories] = useState<Story[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchError, setSearchError] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchStoriesArr, setSearchStoriesArr] = useState<Story[]>([]);

  const { t } = useTranslation();

  // Load categories on mount
  useEffect(() => {
    getAllCategories().then((cats) => {
      setCategories(cats);
      if (cats.length) setSelectedCategoryId(cats[0]._id);
    });
  }, []);

  // Load stories for selected category and page
  useEffect(() => {
    if (!selectedCategoryId || isSearching) return;
    getStoriesByCategory(selectedCategoryId, page, 4).then((res) => {
      setStories(res.stories);
      setTotalCount(res.totalCount);
    });
  }, [selectedCategoryId, page, isSearching]);

  // Handle category change
  const handleCategoryChange = (id: string) => {
    setSelectedCategoryId(id);
    setPage(1);
    setIsSearching(false);
    setSearchStoriesArr([]);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);
    setIsSearching(false);
    setSearchStoriesArr([]);
  };

  // Handle search
  const handleSearchStory = async (input: string | Story) => {
    setSearchError("");
    if (typeof input === "object" && input._id && input.category) {
      // Якщо вибрано історію з підказки — шукаємо контекст
      const catId =
        typeof input.category === "string"
          ? input.category
          : input.category._id;
      setSelectedCategoryId(catId);
      setIsSearching(true);
      const contextStories = await getStoriesContextByCategory(
        catId,
        input._id,
        4
      );
      setSearchStoriesArr(contextStories);
      setSearchBarVisible(false);
      return;
    }
    if (typeof input !== "string" || !input.trim()) return;
    try {
      const results = await searchStories(input);
      if (results.length > 0) {
        // Беремо першу знайдену, шукаємо контекст
        const first = results[0];
        const catId =
          typeof first.category === "string"
            ? first.category
            : first.category._id;
        setSelectedCategoryId(catId);
        setIsSearching(true);
        const contextStories = await getStoriesContextByCategory(
          catId,
          first._id,
          4
        );
        setSearchStoriesArr(contextStories);
        setSearchBarVisible(false);
      } else {
        setSearchError(t("archives.book.noStories"));
      }
    } catch {
      setSearchError("Search failed. Please try again.");
    }
  };

  return (
    <>
      <FadeInOnScroll>
        <Hero
          onSearch={() => setSearchBarVisible(true)}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={handleCategoryChange}
        />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Book
          stories={isSearching ? searchStoriesArr : stories}
          totalCount={isSearching ? searchStoriesArr.length : totalCount}
          page={page}
          onPageChange={handlePageChange}
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          isSearching={isSearching}
        />
      </FadeInOnScroll>
      <AddStory
        categories={categories}
        onStoryAdded={() => {
          if (selectedCategoryId && !isSearching) {
            getStoriesByCategory(selectedCategoryId, 1, 4).then((res) => {
              setStories(res.stories);
              setTotalCount(res.totalCount);
              setPage(1);
            });
            toast.success(`📚 "Story has been added to our archive!`, {
              duration: 3000,
            });
          }
        }}
      />
      {searchBarVisible && (
        <PopupOverlay onClose={() => setSearchBarVisible(false)}>
          <SearchBar
            onClose={() => setSearchBarVisible(false)}
            onSearch={handleSearchStory}
            error={searchError}
          />
        </PopupOverlay>
      )}
    </>
  );
}
