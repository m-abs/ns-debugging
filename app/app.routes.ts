import { HomeRoutes } from './home/home.routes';
import { AboutRoutes } from './about/about.routes';

export const AppRoutes: any[] = [
  ...HomeRoutes,
  ...AboutRoutes,
];
