
import React from 'react';
import { Junction, CongestionLevel, SignalState, ParkingZone } from './types';

export const INITIAL_JUNCTIONS: Junction[] = [
  { id: 'j1', name: 'Silk Board Junction', congestion: CongestionLevel.HIGH, vehicleCount: 145, signalStatus: SignalState.RED, isEmergencyOverride: false, lat: 10, lng: 10 },
  { id: 'j2', name: 'Hebbal Flyover', congestion: CongestionLevel.MEDIUM, vehicleCount: 62, signalStatus: SignalState.GREEN, isEmergencyOverride: false, lat: 50, lng: 20 },
  { id: 'j3', name: 'Connaught Place', congestion: CongestionLevel.LOW, vehicleCount: 22, signalStatus: SignalState.GREEN, isEmergencyOverride: false, lat: 30, lng: 70 },
  { id: 'j4', name: 'Worli Sea Face', congestion: CongestionLevel.MEDIUM, vehicleCount: 45, signalStatus: SignalState.YELLOW, isEmergencyOverride: false, lat: 80, lng: 40 },
];

export const INITIAL_PARKING_ZONES: ParkingZone[] = [
  { id: 'p1', name: 'Phoenix Mall North', totalSpots: 500, occupiedSpots: 485, illegalCount: 12, type: 'Mall' },
  { id: 'p2', name: 'City Hospital Main', totalSpots: 100, occupiedSpots: 20, illegalCount: 2, type: 'Hospital' },
  { id: 'p3', name: 'Railway Station West', totalSpots: 250, occupiedSpots: 180, illegalCount: 5, type: 'Station' },
];

export const COLORS = {
  [CongestionLevel.LOW]: 'bg-green-500',
  [CongestionLevel.MEDIUM]: 'bg-yellow-500',
  [CongestionLevel.HIGH]: 'bg-red-500',
};

export const SIGNAL_COLORS = {
  [SignalState.RED]: 'bg-red-600',
  [SignalState.YELLOW]: 'bg-yellow-500',
  [SignalState.GREEN]: 'bg-emerald-500',
};
