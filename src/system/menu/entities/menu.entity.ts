import { Menu as MenuEntity } from '@prisma/client';

export class Menu implements MenuEntity {
  id: number;
  name: string;
  path: string;
  icon: string;
  hidden: boolean;
  status: number;
  sort: number;
  parentId: number;
  createdAt: Date;
  updatedAt: Date;
}
