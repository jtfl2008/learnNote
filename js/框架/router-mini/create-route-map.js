export default function createRouteMap(routes, oldPathList, oldPathMap) {
  let pathList = oldPathList || [];
  let pathMap = oldPathMap || {};

  routes.forEach((route) => {
    addRouteRecord(route, pathList, pathMap);
  });

  return {
    pathList,
    pathMap,
  };
}

function addRouteRecord(route, pathList, pathMap, parent) {
  let parent = parent ? `$parent.path/${route.path}` : route.path;
  let record = {
    path,
    component: route.component,
    parent,
  };

  if (!pathMap[path]) {
    pathList.push(path);
    pathMap[path] = record;
  }
  if (route.children) {
    route.children.forEach((r) => {
      addRouteRecord(r, pathList, pathMap, route);
    });
  }
}
