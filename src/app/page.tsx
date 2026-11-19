import { AnnounceBar, Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import {
  Marquee,
  Story,
  Categories,
  Process,
  Appointment,
  Faq,
  Visit,
} from '@/components/Sections';
import { Collection } from '@/components/Collection';
import { Spotlight } from '@/components/Spotlight';
import { Lookbook } from '@/components/Lookbook';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';

export default function Page() {
  return (
    <>
      <JsonLd />
      <AnnounceBar />
      <Header />

      <main id="main">
        <span id="top" />
        <Hero />
        <Marquee />
        <Story />
        <Categories />
        <Collection />
        <Spotlight />
        <Process />
        <Lookbook />
        <Testimonials />
        <Appointment />
        <Faq />
        <Visit />
      </main>

      <Footer />
    </>
  );
}
