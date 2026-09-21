import splashSunroom from "@/img/splash-sunroom.png";
import heroWindow from "@/img/hero-window-ledge.png";
import onboardingSunroom from "@/img/onboarding-sunroom.png";
import onboardingWindow from "@/img/onboarding-window.png";
import onboardingDusk from "@/img/onboarding-dusk.png";
import pillarTrauma from "@/img/pillar-trauma.png";
import pillarMindful from "@/img/pillar-mindful.png";
import pillarIndustry from "@/img/pillar-industry.png";
import pillarCurated from "@/img/pillar-curated.png";
import coachJackie from "@/img/coach-jackie.png";
import testimonialMira from "@/img/testimonial-mira.png";
import testimonialDaniel from "@/img/testimonial-daniel.png";
import testimonialAsha from "@/img/testimonial-asha.png";
import resourceJournal from "@/img/resource-journal.png";
import resourcePlants from "@/img/resource-plants.png";
import resourceBreath from "@/img/resource-breath.png";
import resourceEvening from "@/img/resource-evening.png";
import resourceBetween from "@/img/resource-between.png";
import resourceLinen from "@/img/resource-linen.png";

/** Editorial photography generated for the W&H SF visual system. */
export const PHOTOS = {
  splash: splashSunroom,
  sunroom: onboardingSunroom,
  windowPortrait: onboardingWindow,
  duskLandscape: onboardingDusk,
  heroInterior: heroWindow,
  teaJournal: resourceJournal,
  plants: resourcePlants,
  breath: resourceBreath,
  evening: resourceEvening,
  between: resourceBetween,
  linen: resourceLinen,
  jackie: coachJackie,
  testimonial1: testimonialMira,
  testimonial2: testimonialDaniel,
  testimonial3: testimonialAsha,
  pillarTrauma,
  pillarMindful,
  pillarIndustry,
  pillarCurated,
} as const;
