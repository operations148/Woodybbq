import { Scene1Hero } from "@/components/scenes/Scene1Hero";
import { Scene2Pit } from "@/components/scenes/Scene2Pit";
import { Scene3Story } from "@/components/scenes/Scene3Story";
import { Scene4PitToPlate } from "@/components/scenes/Scene4PitToPlate";
import { Scene5Table } from "@/components/scenes/Scene5Table";
import { Scene6Trust } from "@/components/scenes/Scene6Trust";
import { Scene7Close } from "@/components/scenes/Scene7Close";

/**
 * The homepage is exactly seven top-level scenes, data-scene 1 through 7.
 * The header is chrome and is not a scene. The footer lives inside Scene 7,
 * so the close resolves and holds instead of trailing into an eighth block.
 */
export default function Home() {
  return (
    <>
      <Scene1Hero />
      <Scene2Pit />
      <Scene3Story />
      <Scene4PitToPlate />
      <Scene5Table />
      <Scene6Trust />
      <Scene7Close />
    </>
  );
}
