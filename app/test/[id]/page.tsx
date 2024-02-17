'use client';
import { getAmazonHomePage } from '@/pages/api/amazon';
import { useEffect, useState } from 'react';

export default function Test({}) {

  const fetchData = async () => {
    const response = await fetch('/api/amazon');
    // const data = await response.json();
    console.log("response", response);
  };

  return (
    <div>
      <button onClick={fetchData}>Test</button>
      <h1>Test</h1>
    </div>
  );
}