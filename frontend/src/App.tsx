import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Home, AddRecipe, MyRecipes, More} from "./pages/Dashboard/";
import { DashboardLayout } from "./layouts";
import { UILoader } from "./components/loaders";
import { ErrorPage } from "./pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage/>,
    },

    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <ErrorPage/> ,
      children: [
        {
          path: "/dashboard/",
          element: <Home />,
        },
        {
          path: "/dashboard/addrecipe",
          element: <AddRecipe />,
        },
        {
          path: "/dashboard/myrecipes",
          element: <MyRecipes />,
        },
        {
          path: "/dashboard/recipe/:id",
          element: <More />,
        },
      ],
    },
  ]);
  return (
  <div className="container w-[100vw] h-[100vh]">
    <Suspense fallback={<UILoader/>}>
    <RouterProvider
      router={router}
      fallbackElement={<UILoader/>}
      />
    </Suspense>
  </div>
  )

}

export default App;
