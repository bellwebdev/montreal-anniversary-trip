import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("components/Layout.tsx", [
    index("routes/home.tsx"),
    route("day/:id", "routes/day.tsx"),
    route("culture", "routes/culture.tsx"),
  ]),
] satisfies RouteConfig;
