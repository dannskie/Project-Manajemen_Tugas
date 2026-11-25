export class CreateTaskDto {
  judul: string;
  mataKuliah: string;
  deadline: string; // "H-1" | "H-3" | "H-7" | "H-14"
  deskripsi?: string;
  isCompleted?: boolean;
}