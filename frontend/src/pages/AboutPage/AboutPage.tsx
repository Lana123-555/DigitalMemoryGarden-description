import Hero from "../../components/about/Hero/Hero";
import Statistics from "../../components/about/Statistics/Statistics";
import Reviews from "../../components/about/Reviews/Reviews";
import Information from "../../components/about/Information/Information";
import Manifest from "../../components/about/Manifest/Manifest";
import Author from "../../components/about/Author/Author";
import FadeInOnScroll from "../../components/common/FadeInOnScroll/FadeInOnScroll";

export default function AboutPage() {
  return (
    <>
      <FadeInOnScroll>
        <Hero />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <Statistics />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.2}>
        <Reviews />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.3}>
        <Information />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.4}>
        <Manifest />
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.5}>
        <Author />
      </FadeInOnScroll>
    </>
  );
}
