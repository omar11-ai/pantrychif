/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { IngredientsPicker } from "./pages/IngredientsPicker";
import { Results } from "./pages/Results";
import { RecipeDetails } from "./pages/RecipeDetails";
import { Favorites } from "./pages/Favorites";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "ingredients", element: <IngredientsPicker /> },
      { path: "results", element: <Results /> },
      { path: "recipe/:id", element: <RecipeDetails /> },
      { path: "favorites", element: <Favorites /> },
      { path: "about", element: <About /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
