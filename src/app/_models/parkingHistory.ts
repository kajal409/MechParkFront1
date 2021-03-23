export class ParkingHistory {
  id?: number;
  userId?: number;
  vehicleNumber?: string;
  driverName?: string;
  spaceId?: number;
  garageId?: number;
  userCheckIn?: Date;
  userCheckOut?: Date;
  withCleaningService?: boolean;
  cost?: string;
  parkingCost: string;
  cleaningCost: string;
  interval?: string;
}
