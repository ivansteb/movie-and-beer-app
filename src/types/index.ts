import { Timestamp } from "firebase/firestore";

export interface Movie {
  id: string; // ID del documento de Firestore
  title: string;
  genre: string;
  platform: "Netflix" | "HBO Max" | "Prime Video" | "Disney+" | "Otro";
  imageUrl: string;
  isWatched: boolean;
  addedByName: string;
  addedByUid: string;
  addedAt: Timestamp;
}
