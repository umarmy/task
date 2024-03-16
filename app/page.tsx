'use client';

import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router = useRouter();

  return router.push('/inventory');;
}

export default HomePage
