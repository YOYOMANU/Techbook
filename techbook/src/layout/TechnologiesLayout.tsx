import { Outlet } from "react-router-dom";
import { TechnologiesProvider } from "../context/Technologies-context";

export default function TechnologiesLayout() {
  return (
    <TechnologiesProvider>
      <Outlet />
    </TechnologiesProvider>
  );
}
