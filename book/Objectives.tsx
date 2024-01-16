import { FC, PropsWithChildren } from "react";
import map from "./images/map.png";

export const Objectives: FC<PropsWithChildren> = (props) => {
  return (
    <div
      style={{
        padding: ".5rem",
        marginBlock: ".5rem",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderLeft: "20px solid #f7ccff",
        background: "#f5f5f5",
      }}
    >
      <img
        src={map}
        style={{
          marginRight: 10,
          alignSelf: "flex-start",
          maxWidth: 80,
          minWidth: 80,
        }}
      />
      <div>{props.children}</div>
    </div>
  );
};
