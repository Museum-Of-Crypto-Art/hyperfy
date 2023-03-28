import React, { useEffect } from 'react';
import { useWorld } from 'hyperfy';

export default function App() {
  const world = useWorld();

  useEffect(() => {
    const emoteIds = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd0'];
    const disposers = emoteIds.map((id) =>
      world.command(id, () => {
        world.emote(id);
      })
    );

    return () => {
      disposers.forEach((dispose) => dispose());
    };
  }, []);

  return (
    <app>
      {['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd0'].map((id) => (
        <emote key={id} id={id} src={`${id}.glb`} loop />
      ))}
    </app>
  );
}
