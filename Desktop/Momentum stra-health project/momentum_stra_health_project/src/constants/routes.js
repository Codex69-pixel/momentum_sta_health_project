export const ROUTES = {
  ROOT: '/',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  PROJECT_DETAIL: (id = ':id') => `/projects/${id}`,
  TASKS: '/tasks',
  TASK_DETAIL: (id = ':id') => `/tasks/${id}`,
  TEAM: '/team',
  SETTINGS: '/settings',
  LOGIN: '/login',
  NOT_FOUND: '*',
};

export default ROUTES;
