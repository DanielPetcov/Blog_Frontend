import DashboardContent from "./components/DashboardContent";
import { getAdminDashboardAction } from "@/actions/admin-dashboard.actions";

export default async function AdminPage() {
  const result = await getAdminDashboardAction();

  if (!result.success) {
    return <div>{result.error}</div>;
  }

  return <DashboardContent data={result.data} />;
}
