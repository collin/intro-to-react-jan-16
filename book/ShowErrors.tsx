import { FC, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const ShowErrors: FC<PropsWithChildren> = (props) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
            <button
              onClick={() => {
                // eslint-disable-next-line no-self-assign
                window.location.href = window.location.href;
              }}
            >
              Reload
            </button>
            <pre>{error.stack}</pre>
          </div>
        );
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
};
