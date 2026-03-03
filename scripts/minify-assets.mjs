import { build } from "esbuild";
import { promises as fs } from "node:fs";

const jobs = [
  { input: "assets/js/main.js", output: "assets/js/main.min.js", loader: "js" },
  {
    input: "assets/js/animations.js",
    output: "assets/js/animations.min.js",
    loader: "js",
  },
  {
    input: "assets/js/portfolio.js",
    output: "assets/js/portfolio.min.js",
    loader: "js",
  },
  {
    input: "assets/css/style.css",
    output: "assets/css/style.min.css",
    loader: "css",
  },
  {
    input: "assets/css/responsive.css",
    output: "assets/css/responsive.min.css",
    loader: "css",
  },
  {
    input: "assets/css/animations.css",
    output: "assets/css/animations.min.css",
    loader: "css",
  },
];

async function minifyAsset(job) {
  await fs.access(job.input);
  await build({
    entryPoints: [job.input],
    outfile: job.output,
    minify: true,
    bundle: false,
    legalComments: "none",
    charset: "utf8",
    logLevel: "silent",
    loader: { [`.${job.loader}`]: job.loader },
  });
  console.log(`✔ Minified ${job.input} -> ${job.output}`);
}

async function run() {
  for (const job of jobs) {
    await minifyAsset(job);
  }
  console.log("✅ Minification complete");
}

run().catch((error) => {
  console.error("❌ Minification failed", error);
  process.exit(1);
});
