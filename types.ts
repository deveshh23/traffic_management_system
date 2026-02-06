
export enum CongestionLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum SignalState {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN'
}

export interface Junction {
  id: string;
  name: string;
  congestion: CongestionLevel;
  vehicleCount: number;
  signalStatus: SignalState;
  isEmergencyOverride: boolean;
  lat: number;
  lng: number;
}

export interface ParkingZone {
  id: string;
  name: string;
  totalSpots: number;
  occupiedSpots: number;
  illegalCount: number;
  type: 'Mall' | 'Hospital' | 'Station' | 'Public';
}

export interface Alert {
  id: string;
  type: 'ILLEGAL_PARKING' | 'CONGESTION' | 'EMERGENCY_CORRIDOR';
  location: string;
  timestamp: Date;
  severity: 'WARNING' | 'CRITICAL' | 'INFO';
  message: string;
}

export interface VideoAnalysisResult {
  vehicleCount: number;
  congestionLevel: CongestionLevel;
  illegalParkingDetected: boolean;
  obstructions: string[];
}
