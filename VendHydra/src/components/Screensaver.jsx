import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// --- Helpers for YouTube detection ---
const isYouTubeUrl = (url = '') =>
  url.includes('youtube.com') || url.includes('youtu.be');

const getYouTubeEmbedUrl = (url = '') => {
  try {
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}`;
    }

    const u = new URL(url);
    const id = u.searchParams.get('v');
    if (id) {
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}`;
    }
    return url;
  } catch {
    return url;
  }
};

const Screensaver = ({ isActive }) => {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // NEW

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`${API_URL}/promotions?machineId=vm_001`);
        setAds(res.data || []);
      } catch (err) {
        console.error('Failed to load screensaver ads:', err);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    if (!isActive || ads.length === 0) return;

    // Show loading placeholder each time a new ad loads
    setIsLoading(true);

    const currentAd = ads[currentIndex];
    const duration = (currentAd?.duration || 10) * 1000;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [isActive, currentIndex, ads]);

  if (!isActive) return null;

  if (ads.length === 0) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <h1 className="text-6xl font-black text-white animate-pulse">
          Touch to Start
        </h1>
      </div>
    );
  }

  const currentAd = ads[currentIndex];
  const isYT = currentAd.mediaType === 'video' && isYouTubeUrl(currentAd.mediaUrl);
  const isVideoFile = currentAd.mediaType === 'video' && !isYT;

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">

      {/* ⭐ Loading Placeholder (fade-out when media loads) */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center z-[5]">
          <div className="text-white/50 text-2xl font-semibold">
            Loading...
          </div>
        </div>
      )}

      {/* MEDIA RENDERING */}
      {isYT ? (
        <iframe
          key={currentIndex}
          src={getYouTubeEmbedUrl(currentAd.mediaUrl)}
          title="Advertisement"
          className="w-full h-full border-0"
          allow="autoplay; fullscreen"
          onLoad={() => setIsLoading(false)} // NEW
        />
      ) : isVideoFile ? (
        <video
          key={currentIndex}
          src={currentAd.mediaUrl}
          autoPlay
          muted
          loop={false}
          className="w-full h-full object-cover animate-fade-in"
          onLoadedData={() => setIsLoading(false)} // NEW
        />
      ) : (
        <img
          key={currentIndex}
          src={currentAd.mediaUrl}
          alt="Advertisement"
          className="w-full h-full object-cover animate-fade-in"
          onLoad={() => setIsLoading(false)} // NEW
        />
      )}

      {/* Overlay Text */}
      <div className="absolute bottom-20 w-full text-center z-[20] pointer-events-none">
        <div className="inline-block bg-black/50 backdrop-blur-md px-8 py-4 rounded-full border border-white/20">
          <h2 className="text-4xl text-white font-bold animate-bounce">
            Tap Screen to Order
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Screensaver;
