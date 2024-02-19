import React from 'react';
  import Scrapper  from '@/app/components/Scraper/Scraper.client';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Scrapper />
    </main> 
  );  
}
