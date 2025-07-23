export type PackageStatus =
  | 'CREATED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'CANCELLED';

export interface IPackage {
  packageId: string;
  status: PackageStatus;
  lat?: number;
  lon?: number;
  eventTimestamp: Date;
  receivedAt: Date;
  note?: string;
  eta?: Date;
}
