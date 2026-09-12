import { logoutAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return <Button onClick={logoutAction}>Logout</Button>;
}
