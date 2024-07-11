import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { TripDetails } from "./pages/trip-details";
import { CreateTrip } from "./pages/create-trip";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTrip/>,
  },
  {
    path: "/trips/:tripsId",
    element: <TripDetails/>,
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}