import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './shared/components/AppLayout'
import { ResourceLayout } from './resources/components/ResourceLayout'
import { BasicInfoPage } from './resources/pages/BasicInfoPage'
import { ProjectDetailsPage } from './resources/pages/ProjectDetailsPage'
import { ResourceDetailsPage } from './resources/pages/ResourceDetailsPage'
import { ResourceOverviewPage } from './resources/pages/ResourceOverviewPage'
import { ResourcesListPage } from './resources/pages/ResourcesListPage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/resources" replace /> },
      { path: 'resources', element: <ResourcesListPage /> },
      {
        path: 'resources/:resourceId',
        element: <ResourceLayout />,
        children: [
          { index: true, element: <ResourceOverviewPage /> },
          { path: 'details', element: <ResourceDetailsPage /> },
          { path: 'basic-info', element: <BasicInfoPage /> },
          { path: 'project-details', element: <ProjectDetailsPage /> },
        ],
      },
    ],
  },
])
