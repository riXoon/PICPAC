import Filter1 from "../assets/filters/filter-none.png"
import Filter2 from "../assets/filters/filter-gray.png"
import Filter3 from "../assets/filters/filter-blur.png"
import Filter4 from "../assets/filters/filter-brightness.png"
import Filter5 from "../assets/filters/filter-sepia.png"
import Filter6 from "../assets/filters/filter-contrast.png"
import Filter7 from "../assets/filters/filter-vintage.png"
import Filter8 from "../assets/filters/filter-peachy.png"
import Filter9 from "../assets/filters/filter-dreamy.png"
import Filter10 from "../assets/filters/filter-golderhour.png"
import Filter11 from "../assets/filters/filter-indiekid.png"
import Filter12 from "../assets/filters/filter-polaroid.png"
import Filter13 from "../assets/filters/filter-retro.png"
import Filter14 from "../assets/filters/filter-washedout.png"


export const filters = [
  { filterName: 'None', value: 'none', image: Filter1 },
  { filterName: 'Vintage', value: 'sepia(0.6) contrast(1.2) brightness(0.9)', image: Filter7 },
  { filterName: 'Gray', value: 'grayscale(1)', image: Filter2 },
  { filterName: 'Noir', value: 'grayscale(1) contrast(1.3)', image: Filter8 },
  { filterName: 'Blur', value: 'blur(3px)', image: Filter3 },
  { filterName: 'Washed Out', value: 'brightness(1.2) contrast(0.8)', image: Filter14 },
  { filterName: 'Brightness', value: 'brightness(1.4)', image: Filter4 },
  { filterName: 'Sepia', value: 'sepia(1)', image: Filter5 },
  { filterName: 'Contrast', value: 'contrast(1.5)', image: Filter6 },
  { filterName: 'Polaroid', value: 'sepia(0.3) contrast(0.8) brightness(1.05)', image: Filter12 },
  { filterName: 'Retro', value: 'sepia(0.3) contrast(0.9) brightness(1.1)', image: Filter13 },
  { filterName: 'Indie Kid', value: 'saturate(1.3) hue-rotate(30deg) contrast(1.1)', image: Filter11 },
  { filterName: 'Dreamy', value: 'brightness(1.1) blur(1px) contrast(0.9)', image: Filter9 },
  { filterName: 'Muted', value: 'saturate(0.6) contrast(0.9)' },
  { filterName: 'Golden Hour', value: 'sepia(0.4) brightness(1.1) contrast(1.05)', image: Filter10 },
  { filterName: 'Peachy', value: 'sepia(0.2) hue-rotate(-10deg) brightness(1.2)', image: Filter8 },
];
