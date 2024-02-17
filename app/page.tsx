import React from 'react';
import dynamic from 'next/dynamic';

export default function Home() {
  const Scrapper = dynamic(() => import('./Scraper/Scraper.client'), {
    ssr: false,  // Disable server-side rendering for this component
  });
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Scrapper/>
    </main> 
  );  
}
