import "./LiveCode.css";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import {
  useState,
  useEffect,
  useReducer,
  useRef,
  memo,
  useContext,
  FC,
  PropsWithChildren,
} from "react";

export const LiveCode = (props) => {
  const scope = props.scope ?? {};
  Object.assign(scope, {
    useState,
    useEffect,
    memo,
    useReducer,
    useRef,
    useContext,
  });
  const code = props.code;
  const noInline = props.noInline === true || undefined;
  const noWrap = props.noWrap === true || undefined;
  const [key, setKey] = useState(0);
  const reset = () => {
    setKey(key + 1);
  };

  return (
    <LiveProvider
      key={key}
      code={code}
      scope={scope}
      noInline={noInline}
      disabled={props.disabled ?? false}
      transformCode={(raw) => {
        if (noWrap) {
          return raw;
        }
        if (noInline) {
          return raw;
        }
        return `<>${raw}</>`;
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <LiveEditor style={{ fontFamily: "monospace" }} />
          <div style={{ position: "relative" }}>
            <button
              style={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
              onClick={reset}
            >
              Reset
            </button>
            <BrowserWindow>
              <LivePreview className="live-preview" />
              <LiveError
                style={{
                  color: "red",
                  fontWeight: "bold",
                  padding: "1rem",
                  background: "#ffcdcd",
                  borderRadius: "5px",
                }}
              />
            </BrowserWindow>
          </div>
        </div>
      </div>
    </LiveProvider>
  );
};

export const BrowserWindow: FC<
  PropsWithChildren & {
    showChrome?: boolean;
    noPadding?: boolean;
    address?: string;
    controls?: JSX.Element;
  }
> = (props) => {
  return (
    <div
      style={{
        position: "relative",
        border: "4px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: props.showChrome ? "flex" : "none",
          backgroundColor: "#f5f5f5",
          padding: "4px",
          textAlign: "center",
          borderBottom: "2px solid #ddd",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            display: "inline-block",
            marginLeft: "5px",
            backgroundColor: "#ff5f5f", // Red button
          }}
        ></div>
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            display: "inline-block",
            marginLeft: "5px",
            backgroundColor: "#ffd653", // Yellow button
          }}
        ></div>
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            display: "inline-block",
            marginLeft: "5px",
            backgroundColor: "#6ce07d", // Green button
          }}
        ></div>
        {props.address && (
          <div
            style={{
              fontSize: "0.8rem",
              marginLeft: "auto",
              marginRight: "auto",
              background: "white",
              borderRadius: "5px",
              border: "1px solid #ddd",
              paddingInline: "1rem",
            }}
          >
            {props.address}
          </div>
        )}
        {props.controls && props.controls}
      </div>
      <div
        style={{
          position: "relative",
          padding: props.noPadding ? "0px" : "8px",
          height: "100%",
          overflow: "auto",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
