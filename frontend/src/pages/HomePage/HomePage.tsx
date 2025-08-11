import { useState } from "react";
import Hero from "../../components/home/Hero/Hero";
import MemoryTools from "../../components/home/MemoryTools/MemoryTools";
import Map from "../../components/home/Map/Map";
import Numbers from "../../components/home/Numbers/Numbers";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";
import PopupOverlay from "../../components/common/PopupOverlay/PopupOverlay";
import Instructions from "../../components/home/Instructions/Instructions";

export default function HomePage() {
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [selectedTool, setSelectedTool] = useState<"a" | "b" | "c" | null>(
    null
  );

  const handleToolClick = (tool: "a" | "b" | "c") => {
    setSelectedTool(tool);
    setInstructionsVisible(true);
  };

  const handleCloseInstructions = () => {
    setInstructionsVisible(false);
    setSelectedTool(null);
  };

  return (
    <>
      <FadeInOnScroll>
        <Hero />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <MemoryTools onToolClick={handleToolClick} />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Map />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Numbers />
      </FadeInOnScroll>

      {instructionsVisible && selectedTool && (
        <PopupOverlay onClose={handleCloseInstructions}>
          <Instructions
            selectedTool={selectedTool}
            onClose={handleCloseInstructions}
          />
        </PopupOverlay>
      )}
    </>
  );
}
