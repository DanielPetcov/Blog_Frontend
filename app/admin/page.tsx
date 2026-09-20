import DashboardContent from "./components/DashboardContent";
import { getAdminDashboard } from "@/lib/api/admin-dashboard";

export default async function AdminPage() {
  const dashboard = await getAdminDashboard();

  return <DashboardContent data={dashboard} />;
}
