import { ILLUSTRATIONS } from "./constants";
import type { IllustrationPropTypes } from "./types";

function Illustration({
  name,
  className = "w-10 h-10",
  colorPrimary = "#6c63ff",
  colorSecondary = "#ffb9b9",
  colorTertiary = "#090814",
}: IllustrationPropTypes) {
  const renderAsset = ILLUSTRATIONS[name];

  return (
    <div className={className}>
      {renderAsset(colorPrimary, colorSecondary, colorTertiary)}
    </div>
  );
}

export default Illustration;
