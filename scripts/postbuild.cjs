/**
 * Пост-обработка сборки для GitHub Pages:
 * — 404.html = index.html (чтобы любые пути открывали SPA);
 * — .nojekyll (уже в public/, но дублируем на случай удаления).
 */
const { copyFileSync, writeFileSync } = require("node:fs");

copyFileSync("dist/index.html", "dist/404.html");
writeFileSync("dist/.nojekyll", "");
console.log("dist готов для GitHub Pages (404.html + .nojekyll)");
