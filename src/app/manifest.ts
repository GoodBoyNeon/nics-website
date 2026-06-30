import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nepal Informatics and Computing Society",
    short_name: "NICS",
    description:
      "Computer Science Club for the students of Nepal. We are dedicated to providing a platform for students to learn, explore, and enhance their computing skills through collaboration, projects, events and knowledge sharing.",
    start_url: "/",
    background_color: "#fff",
    theme_color: "#269595",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
