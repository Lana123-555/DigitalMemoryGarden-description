import Hero from "../../components/donate/Hero/Hero";
import Information from "../../components/donate/Information/Information";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";

export default function DonatePage() {
  return (
    <>
      <FadeInOnScroll>
        <Hero />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Information />
      </FadeInOnScroll>
    </>
  );
}
