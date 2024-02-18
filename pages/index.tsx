import React from 'react';
import dynamic from 'next/dynamic';
import Scrapper  from '@/app/Scraper/Scraper.client';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Scrapper />
    </main> 
  );  
}
