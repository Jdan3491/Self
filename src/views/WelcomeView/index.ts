import { useRouter } from 'vue-router';
import coverImage from '@/assets/OIG3.jfif';
import brand from '@/assets/OIG2.jfif';

export function useWelcomeComponent() {
  const router = useRouter();

  const goToPage = () => {
    router.push('/home');
  };

  return {
    goToPage,
    coverImage,
    brand
  };
}
