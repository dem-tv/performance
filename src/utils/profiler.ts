import type { ProfilerOnRenderCallback } from 'react';

export const profiler: ProfilerOnRenderCallback = (
  id,
  phase,
  baseDuration,
  commitTime
) => {
  console.log(`${id}'s ${phase} phase:`);
  console.log(`Commit Duration: ${commitTime}`);
  console.log(`Render Duration: ${baseDuration}`);
  console.log('-----------------------');
};
