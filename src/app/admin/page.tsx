import { RouteGuard } from "@/components/RouteGuard";
import { TeacherDashboard } from "@/components/admin/TeacherDashboard";

export default function AdminPage() {
  return (
    <RouteGuard role="teacher">
      <TeacherDashboard />
    </RouteGuard>
  );
}
