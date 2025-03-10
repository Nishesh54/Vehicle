'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useLocationStore } from '../../lib/store';
import Header from '../../components/Header';
import MapComponent from '../../components/MapComponent';
import VehicleList from '../../components/VehicleList';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuthStore();
  const { isTracking, userLocation } = useLocationStore();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Emergency Vehicle Dashboard</h1>
        
        {user && (
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">Welcome, {user.name}</p>
                <p className="text-gray-500">
                  {isTracking 
                    ? "Your location is being shared in real-time with emergency services" 
                    : "Enable real-time tracking to share your location with emergency services"}
                </p>
              </div>
              
              {userLocation && (
                <div className="text-sm text-gray-600">
                  <div>Current coordinates:</div>
                  <div className="font-mono">
                    {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                  </div>
                  <div className={`text-xs mt-1 ${isTracking ? 'text-green-600' : 'text-gray-500'}`}>
                    {isTracking 
                      ? "Real-time updates active" 
                      : "Single location update"
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Location Map</h2>
                <p className="text-sm text-gray-500">View nearby emergency vehicles</p>
              </div>
              <MapComponent />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium">Nearby Vehicles</h2>
                  <p className="text-sm text-gray-500">Sorted by distance</p>
                </div>
                {isTracking && (
                  <div className="flex items-center text-xs text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                    Live updates
                  </div>
                )}
              </div>
              <VehicleList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 