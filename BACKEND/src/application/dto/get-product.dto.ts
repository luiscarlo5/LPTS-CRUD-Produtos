export interface GetProductInputDTO {
  id: string;
}

export interface GetProductOutputDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string | null;
  createdAt: Date;
}
