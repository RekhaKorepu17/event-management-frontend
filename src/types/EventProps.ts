export interface EventProps {
    id: number;
    name: string;
    description: string;
    eventDate: Date;
    startTime: Date;
    endTime: Date;
    address: string;
    eventType: string;
    eventStatus: "active" | "completed" | "cancelled";
    organizerName: string;
    organizerContact: string;
    imageUrl: string;
    role: string; 
  }