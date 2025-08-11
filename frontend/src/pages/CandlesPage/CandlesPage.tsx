import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import PopupOverlay from "../../components/common/PopupOverlay/PopupOverlay";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import StoryDetails from "../../components/common/StoryDetails/StoryDetails";
import Hero from "../../components/candles/Hero/Hero";
import CandleSelection from "../../components/candles/CandleSelection/CandleSelection";
import AddCandleForm from "../../components/candles/AddCandleForm/AddCandleForm";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";
import { getAllCandleTypes } from "../../services/candleType";
import {
  addCandle,
  searchStories,
  getStoryByStoryId,
} from "../../services/story";
import { generateStoryId } from "../../utils/storyId";
import type { CandleType } from "../../types/candleType";
import type { Story } from "../../types/story";
import css from "./CandlesPage.module.css";

const CANDLE_CATEGORY_ID = "6881265b7ff3d7fcb8363ce3";

export default function CandlesPage() {
  const [candleTypes, setCandleTypes] = useState<CandleType[]>([]);
  const [selectedCandleTypeId, setSelectedCandleTypeId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchError, setSearchError] = useState<string>("");
  const [lastAddedCandle, setLastAddedCandle] = useState<Story | null>(null);
  const [currentStoryId, setCurrentStoryId] = useState<string>("");
  const [candleDetailsVisible, setCandleDetailsVisible] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({
    name: "",
    dateOfBirth: "",
    dateOfDeath: "",
  });

  useEffect(() => {
    getAllCandleTypes()
      .then((data) => {
        setCandleTypes(data);
        if (data.length) setSelectedCandleTypeId(data[0]._id);
      })
      .finally(() => setLoading(false));

    // Load user's last candle data from localStorage
    const savedCandleData = localStorage.getItem("lastCandleData");
    if (savedCandleData) {
      try {
        const parsedData = JSON.parse(savedCandleData);
        setInitialFormValues({
          name: parsedData.name || "",
          dateOfBirth: parsedData.dateOfBirth || "",
          dateOfDeath: parsedData.dateOfDeath || "",
        });

        // If there's a lastAddedStoryId, load and show that story
        if (parsedData.lastAddedStoryId) {
          getStoryByStoryId(parsedData.lastAddedStoryId)
            .then((story) => {
              if (story) {
                setLastAddedCandle(story);
              }
            })
            .catch((error) => {
              console.error("Failed to load last added candle story:", error);
            });
        }
      } catch (error) {
        console.error("Failed to parse saved candle data:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Generate new storyId when component mounts or when candle is added successfully
    setCurrentStoryId(generateStoryId("candle"));
  }, [lastAddedCandle]);

  const handleAddCandle = async (
    values: {
      name: string;
      dateOfBirth: string;
      dateOfDeath: string;
      comment: string;
    },
    files: { audio: File | null; photo: File | null; video: File | null }
  ) => {
    const newCandle = await addCandle({
      storyId: currentStoryId,
      name: values.name || undefined,
      dateOfBirth: values.dateOfBirth || undefined,
      dateOfDeath: values.dateOfDeath || undefined,
      comment: values.comment || undefined,
      category: CANDLE_CATEGORY_ID,
      candleType: selectedCandleTypeId,
      audio: files.audio ?? undefined,
      photo: files.photo ?? undefined,
      video: files.video ?? undefined,
    });

    console.log("New candle added:", newCandle);
    setLastAddedCandle(newCandle);

    // Save user's data to localStorage for next time (excluding comment and files)
    const dataToSave = {
      name: values.name,
      dateOfBirth: values.dateOfBirth,
      dateOfDeath: values.dateOfDeath,
      lastAddedStoryId: newCandle.storyId, // Save the storyId of the last added story
    };
    localStorage.setItem("lastCandleData", JSON.stringify(dataToSave));

    const candleName = values.name || "Memorial candle";
    toast.success(
      `🕯️ "${candleName}" has been lit and added to our memorial!`,
      {
        duration: 3000,
      }
    );

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const handleSearchCandle = async (input: string | Story) => {
    setSearchError("");
    if (typeof input === "object" && input._id) {
      // If a specific candle is selected, set it as the displayed candle
      setLastAddedCandle(input);
      setSearchBarVisible(false);
      return;
    }
    if (typeof input !== "string" || !input.trim()) return;
    try {
      const results = await searchStories(input, "candle");
      if (results.length > 0) {
        // Set the first found candle as the displayed candle
        console.log("Search result:", results[0]);
        setLastAddedCandle(results[0]);
        setSearchBarVisible(false);
      } else {
        setSearchError("No candles found for your query.");
      }
    } catch {
      setSearchError("Search failed. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <FadeInOnScroll>
        <Hero
          onSearch={() => setSearchBarVisible(true)}
          lastAddedCandle={lastAddedCandle}
          onDetails={() => setCandleDetailsVisible(true)}
        />
      </FadeInOnScroll>
      <div className={css.candleWrapper} id="light-new-memory-candle">
        <CandleSelection
          candleTypes={candleTypes}
          selectedId={selectedCandleTypeId}
          onSelect={setSelectedCandleTypeId}
        />
        <AddCandleForm
          onSubmit={handleAddCandle}
          storyId={currentStoryId}
          initialValues={initialFormValues}
        />
      </div>
      {candleDetailsVisible && lastAddedCandle && (
        <PopupOverlay onClose={() => setCandleDetailsVisible(false)}>
          <StoryDetails
            story={lastAddedCandle}
            onClose={() => setCandleDetailsVisible(false)}
          />
        </PopupOverlay>
      )}
      {searchBarVisible && (
        <PopupOverlay onClose={() => setSearchBarVisible(false)}>
          <SearchBar
            onClose={() => setSearchBarVisible(false)}
            onSearch={handleSearchCandle}
            error={searchError}
            source="candle"
            placeholder="Search for candles by name..."
          />
        </PopupOverlay>
      )}
    </>
  );
}
