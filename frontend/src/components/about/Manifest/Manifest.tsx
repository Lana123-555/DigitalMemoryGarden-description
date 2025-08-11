import { useTranslation } from "react-i18next";
import css from "./Manifest.module.css";

export default function Manifest() {
  const { t } = useTranslation();

  return (
    <>
      <div className={css.container}>
        <div className={css.page}>
          <img
            src="/pattern.png"
            alt="Pattern image"
            className={css.patternLeft}
          />
          <h2 className={css.title}>{t("about.manifest.title")}</h2>
          <p className={css.text}>
            <span className={css.sectionTitle}>How the Idea Was Planted</span>
            <br />
            <br />
            The war changed everything. As the creator of this platform - and
            like many Ukrainians - I felt the need to preserve the moments we
            were living through, not just the history, but the emotions, the
            voices, the silences. At first, I imagined creating a printed book,
            a quiet place to gather wartime stories. But over time, I realised
            that memory today lives not only on pages - it lives online, across
            borders, and across generations.
            <br />
            <br />
            That’s how the idea for the Digital Memory Garden was born. A
            living, interactive space where memory can be shared, honoured, and
            kept - through stories, sounds, drawings, and gestures.
          </p>
          <p className={css.text}>
            <span className={css.sectionTitle}>For Ukraine, for the World</span>
            <br />
            <br />
            This platform is for everyone touched by the war - directly or from
            afar.
            <br />
            <br />
            For Ukrainians, for the diaspora, for those who want to witness,
            understand, support. It’s a digital place where grief can be
            expressed gently, and memory can be planted like a seed.
          </p>
          <p className={css.text}>
            <span className={css.sectionTitle}>Why We Remember</span>
            <br />
            <br />
            We believe memory is not just history - it’s care. Behind every
            photo, audio clip, or flickering candle on this platform is a
            person. A life paused by conflict but not erased. Here, storytelling
            becomes an act of defiance. Memory becomes action. And design
            becomes the bridge between silence and solidarity.
          </p>
        </div>
        <div className={css.page}>
          <div className={css.imagesWrapper}>
            <img
              src="/manifest1.webp"
              alt="Manifest image"
              className={css.image}
            />
            <img
              src="/manifest2.webp"
              alt="Manifest image"
              className={css.image}
            />
          </div>
          <p className={css.text}>
            <span className={css.sectionTitle}>What Makes It Different</span>
            <br />
            <br />
            This is not a museum. Not a government archive. Not a one-way
            display. It’s a space built by people - for people. It’s emotional,
            not institutional. Interactive, not static.
            <br />
            <br />
            Every flower planted here tells a story. Every lit candle honours
            someone. Every contribution - whether big or small - is part of a
            collective act of remembrance. It’s the first platform of its kind
            in Ukraine that treats memory not only as documentation but as
            shared experience. It grows, shifts, and responds - like memory
            itself.
          </p>
          <p className={css.text}>
            <span className={css.sectionTitle}>What We Believe</span>
            <br />
            <br />
            <ul className={css.list}>
              <li>We believe in memory as an act of care.</li>
              <li>
                We believe everyone has the right to be remembered, in their own
                voice.
              </li>
              <li>
                We believe digital storytelling can be symbolic, respectful, and
                deeply human.
              </li>
              <li>
                We believe emotion is not a weakness in design - it’s the reason
                we design.
              </li>
              <li>
                We believe in safe spaces, optional anonymity, and giving people
                the tools to speak, draw, or remain silent.
              </li>
            </ul>
          </p>
          <p className={css.text}>
            <span className={css.sectionTitle}>Ethics and Respect</span>
            <br />
            <br />
            We follow clear ethical practices. Every contribution is voluntary.
            Anonymity is always an option. Sensitive content is marked, and
            moderation is in place to ensure that the space remains emotionally
            safe and respectful for everyone.
          </p>
          <img
            src="/pattern.png"
            alt="Pattern image"
            className={css.patternRight}
          />
        </div>
      </div>
    </>
  );
}
