export interface CreateProductInputDTO {
  name: string;
  description: string;
  price: number;
  imagePath?: string | null;
}

export interface CreateProductOutputDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string | null;
  createdAt: Date;
}
