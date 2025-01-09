// this is the open api configuration schema
import configureOpenAPI from "@/lib/configure-openapi.js";
// this is the app definition
import createApp from "@/lib/create-app.js";
// this is the index route
import index from "@/routes/index.routes.js";

// create the app
const app = createApp();
// load routes
const routes = [
  index,
];
// configure open api schema
configureOpenAPI(app);

// add routes
routes.forEach(route => app.route("/", route));

export default app;
