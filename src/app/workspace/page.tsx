import { RouteGuard } from "@/components/RouteGuard";
import { StudentWorkspace } from "@/components/workspace/StudentWorkspace";

export default function WorkspacePage() {
  return (
    <RouteGuard role="student">
      <StudentWorkspace />
    </RouteGuard>
  );
}
