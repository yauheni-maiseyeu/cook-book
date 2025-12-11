export interface IUserCard {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  role: string;
  status: 'online' | 'offline';
  followersCount: number;
}

export const USERS: IUserCard[] = [
  {
    id: 'user-201',
    name: 'Алена Смирнова',
    description: 'Frontend Developer, React Native / Expo expert.',
    avatarUrl: 'https://picsum.photos/id/64/100/100',
    role: 'Разработчик',
    status: 'online',
    followersCount: 1540,
  },
  {
    id: 'user-202',
    name: 'Елена Коваль',
    description: 'UI/UX Lead. Занимаюсь дизайн-системами и прототипированием.',
    avatarUrl: 'https://picsum.photos/id/88/100/100',
    role: 'Дизайнер',
    status: 'online',
    followersCount: 980,
  },
  {
    id: 'user-203',
    name: 'Дмитрий Петров',
    description: 'Project Manager. Ответственен за сроки и коммуникацию с клиентами.',
    avatarUrl: 'https://picsum.photos/id/102/100/100',
    role: 'Менеджер',
    status: 'offline',
    followersCount: 500,
  },
];
