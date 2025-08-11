import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PopupOverlay from "../../components/common/PopupOverlay/PopupOverlay";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import StoryDetails from "../../components/common/StoryDetails/StoryDetails";
import Hero from "../../components/garden/Hero/Hero";
import MapWrapper from "../../components/garden/MapWrapper/MapWrapper";
import FlowerSelection from "../../components/garden/FlowerSelection/FlowerSelection";
import PlantFlowerForm from "../../components/garden/PlantFlowerForm/PlantFlowerForm";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";
import { getAllCategories } from "../../services/category";
import type { Category } from "../../types/category";
import {
  addStory,
  getRandomFlowerStory,
  searchStories,
  getNextFlowerStory,
  getPrevFlowerStory,
  getStoryByStoryId,
} from "../../services/story";
import { generateStoryId } from "../../utils/storyId";
import type { Story } from "../../types/story";

import css from "./GardenPage.module.css";

export default function GardenPage() {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [flowerDetailsVisible, setFlowerDetailsVisible] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [randomFlower, setRandomFlower] = useState<Story | null>(null);
  const [searchError, setSearchError] = useState<string>("");
  const [randomLoading, setRandomLoading] = useState(true);
  const [currentStoryId, setCurrentStoryId] = useState<string>("");

  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    location: "",
    title: "",
    comment: "",
    audio: null as File | null,
    photo: null as File | null,
    video: null as File | null,
    consent: false,
    sensitive: false,
  });

  function handleNextFlower() {
    if (!randomFlower) return;
    getNextFlowerStory({ id: randomFlower._id }).then((next) => {
      if (next) setRandomFlower(next);
    });
  }

  function handlePrevFlower() {
    if (!randomFlower) return;
    getPrevFlowerStory({ id: randomFlower._id }).then((prev) => {
      if (prev) setRandomFlower(prev);
    });
  }

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
        if (data.length) setSelectedCategoryId(data[0]._id);
      })
      .finally(() => setLoading(false));

    // Load user's last flower data from localStorage
    const savedFlowerData = localStorage.getItem("lastFlowerData");
    if (savedFlowerData) {
      try {
        const parsedData = JSON.parse(savedFlowerData);
        setFormValues((prevValues) => ({
          ...prevValues,
          name: parsedData.name || "",
          age: parsedData.age || "",
          location: parsedData.location || "",
        }));

        // If there's a lastAddedStoryId, load and show that story
        if (parsedData.lastAddedStoryId) {
          getStoryByStoryId(parsedData.lastAddedStoryId)
            .then((story) => {
              if (story) {
                setRandomFlower(story);
              }
            })
            .catch((error) => {
              console.error("Failed to load last added flower story:", error);
            });
        }
      } catch (error) {
        console.error("Failed to parse saved flower data:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Generate initial storyId
    setCurrentStoryId(generateStoryId("flower"));
  }, []);

  useEffect(() => {
    setRandomLoading(true);
    getRandomFlowerStory()
      .then((story) => {
        if (story && typeof story.category === "object") {
          const cat = story.category as Partial<Category>;
          const category: Category = {
            _id: cat._id || "",
            name: cat.name || "",
            flowerImage:
              typeof cat.flowerImage === "string" ? cat.flowerImage : "",
            description:
              typeof cat.description === "string" ? cat.description : undefined,
            flowerAnimation:
              typeof cat.flowerAnimation === "string"
                ? cat.flowerAnimation
                : undefined,
          };
          setRandomFlower({ ...story, category });
        } else if (story && typeof story.category === "string") {
          setRandomFlower({ ...story });
        }
      })
      .finally(() => setRandomLoading(false));
  }, []);

  const handlePlantFlower = async (
    values: {
      name: string;
      age: string | number | null;
      location: string;
      title: string;
      comment: string;
    },
    files: { audio: File | null; photo: File | null; video: File | null }
  ) => {
    try {
      const newStory = await addStory({
        storyId: currentStoryId,
        name: values.name,
        age: values.age === "" || values.age === null ? undefined : values.age,
        location: values.location,
        title: values.title,
        comment: values.comment,
        category: selectedCategoryId,
        source: "flower",
        audio: files.audio ?? undefined,
        photo: files.photo ?? undefined,
        video: files.video ?? undefined,
      });

      const flowerTitle = values.title || "Your memory flower";
      toast.success(
        `🌸 "${flowerTitle}" has been planted and is blooming in the garden!`,
        {
          duration: 3000,
        }
      );

      if (newStory && typeof newStory.category === "object") {
        setRandomFlower(newStory);
      } else if (newStory) {
        const category = categories.find(
          (cat) => cat._id === newStory.category
        );
        if (category) {
          setRandomFlower({ ...newStory, category });
        }
      }

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 50);

      // Save user's last added flower story storyId and data to localStorage for next time
      const dataToSave = {
        name: values.name,
        age: values.age,
        location: values.location,
        lastAddedStoryId: newStory.storyId, // Save the storyId of the last added story
      };
      localStorage.setItem("lastFlowerData", JSON.stringify(dataToSave));

      setFormValues({
        name: "",
        age: "",
        location: "",
        title: "",
        comment: "",
        audio: null,
        photo: null,
        video: null,
        consent: false,
        sensitive: false,
      });

      // Generate new storyId for next submission
      setCurrentStoryId(generateStoryId("flower"));
    } catch (error) {
      console.error("Error planting flower:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to plant flower. Please try again.";
      toast.error(errorMessage, {
        duration: 2000,
      });
    }
  };

  const handleSearchFlower = async (input: string | Story) => {
    setSearchError("");
    if (typeof input === "object" && input._id) {
      setRandomFlower(input);
      setFlowerDetailsVisible(false);
      setSearchBarVisible(false);
      return;
    }
    if (typeof input !== "string" || !input.trim()) return;
    try {
      const results = await searchStories(input, "flower");
      if (results.length > 0) {
        setRandomFlower(results[0]);
        setFlowerDetailsVisible(false);
        setSearchBarVisible(false);
      } else {
        setSearchError("No flowers found for your query.");
      }
    } catch {
      setSearchError("Search failed. Please try again.");
    }
  };

  if (loading || randomLoading) return <div>Loading...</div>;

  return (
    <>
      <FadeInOnScroll>
        <Hero
          onSearch={() => setSearchBarVisible(true)}
          onDetails={() => setFlowerDetailsVisible(true)}
          flower={randomFlower}
        />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <MapWrapper categories={categories} />
      </FadeInOnScroll>
      <div className={css.plantWrapper} id="plant-new-memory-flower">
        <FlowerSelection
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
        <PlantFlowerForm
          selectedCategoryId={selectedCategoryId}
          storyId={currentStoryId}
          initialValues={formValues}
          onFormChange={setFormValues}
          onSubmit={handlePlantFlower}
        />
      </div>
      {searchBarVisible && (
        <PopupOverlay onClose={() => setSearchBarVisible(false)}>
          <SearchBar
            onClose={() => setSearchBarVisible(false)}
            onSearch={handleSearchFlower}
            error={searchError}
            source="flower"
          />
        </PopupOverlay>
      )}
      {flowerDetailsVisible && randomFlower && (
        <PopupOverlay onClose={() => setFlowerDetailsVisible(false)}>
          <StoryDetails
            story={randomFlower}
            onClose={() => setFlowerDetailsVisible(false)}
            onNext={handleNextFlower}
            onPrev={handlePrevFlower}
          />
        </PopupOverlay>
      )}
    </>
  );
}
