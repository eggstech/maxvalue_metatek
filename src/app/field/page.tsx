'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FieldRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/field/dashboard');
  }, [router]);

  return null; 
}
