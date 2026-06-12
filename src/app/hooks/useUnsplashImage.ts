import { useState, useEffect } from 'react';

export function useUnsplashImage(query: string) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      // Using a simple hash to generate consistent random image for each query
      const hash = query.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const imageNumber = (hash % 1000) + 1;
      
      // Use picsum.photos as a reliable placeholder service
      setImageUrl(`https://picsum.photos/seed/${query.replace(/\s/g, '')}/400/400`);
      setIsLoading(false);
    }
  }, [query]);

  return { imageUrl, isLoading };
}