export class Parking {
  id?: number;
  userId?: number;
  vehicleNumber?: string;
  driverName?: string;
  spaceId?: number;
  garageId?: number;
  userCheckIn?: Date;
  userCheckOut?: Date;
  withCleaningService?: boolean;
  cleaningCost?: string;
  parkingCost?: string;
  cost?: string;
  isActive?: boolean;
  isBooked?: boolean;
}
