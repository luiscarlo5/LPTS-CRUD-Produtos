export interface UpdateProductInputDTO {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  imagePath?: string | null;
}

export interface UpdateProductOutputDTO {
  id: string;
  name: string;
  description: string;
  price?: number;
  imagePath: string | null;
  createdAt: Date;
}
