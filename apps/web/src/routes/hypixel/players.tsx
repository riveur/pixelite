import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/hypixel/players')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>Hello "/hypixel/players"!</div>
      <Outlet />
    </>
  )
}
