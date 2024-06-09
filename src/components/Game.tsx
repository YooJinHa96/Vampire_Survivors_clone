import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

import MainScene from "../class/scene/MainScene";
import LoadingScene from "../class/scene/LoadingScene";

const Game: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: [LoadingScene, MainScene],
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainerRef} />;
};

export default Game;
