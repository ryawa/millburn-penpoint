import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import article from "./schemas/article";
import author from "./schemas/author";
import blockContent from "./schemas/blockContent";
import category from "./schemas/category";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/studio",
  title: "Millburn Penpoint",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [article, author, blockContent, category],
  },
});
