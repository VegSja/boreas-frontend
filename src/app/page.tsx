'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map…</p>,
});

export default function Home() {
  return (
    <>
      <main className="h-[calc(100vh-56px)] w-screen">
        <Map />
      </main>
    </>
  );
}
