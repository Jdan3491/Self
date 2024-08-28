import { useRouter } from 'vue-router';
import homeA from '@/assets/home_a.jfif';
import homeB from '@/assets/home_b.jfif';
import brand from '@/assets/logo.png';

export function useWelcomeComponent() {
  const router = useRouter();

  const goToPage = () => {
    router.push('/home');
  };

  return {
    goToPage,
    coverImage: homeA, // Placeholder; you can set a default or specific image if needed
    brand,
    images: [homeA, homeB] // Array of images for the carousel
  };
}
