import { BrowserWindow } from "LiveCode";
import "./Book.css";
import {
  NavLink,
  useParams,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Console, Hook, Unhook } from "console-feed";

const labs = import.meta.glob("./labs/**/contents.mdx", { eager: true });
const sections = import.meta.glob("./labs/**/section-*.mdx", { eager: true });

const findLabModule = (path: string) => {
  const module = labs[`./labs/${path}/contents.mdx`];
  return module;
};

const Lab = () => {
  const params = useParams();
  const Lab = findLabModule(params.lab);
  const Sections = findSectionsForLab(params.lab);
  if (!Lab) {
    return <div>Lab not found</div>;
  }
  return (
    <>
      <div id="lesson-contents">
        <h1>{Lab.title}</h1>
        <Lab.default />
        {Sections.map(({ path, module }) => {
          return (
            <div key={path}>
              <NavLink
                to={`/lab/${params.lab}/${path
                  .split("/")[3]
                  .replace(".mdx", "")}`}
              >
                <h4>
                  {module.title ?? "(title missing)"}

                  <div style={{ marginLeft: "1rem" }}></div>
                </h4>
              </NavLink>

              <p>
                In this section, you'll{" "}
                {module.description ?? "(description missing)"}
              </p>
            </div>
          );
        })}
      </div>

      {Lab.hidePreview === true || Lab.noCommonPreview === true ? null : (
        <Preview key={`${params.lab}/${params.section}`} />
      )}
    </>
  );
};

const findSectionModule = (lab: string, section: string) => {
  const module = sections[`./labs/${lab}/${section}.mdx`];
  return module;
};

const Section = () => {
  const params = useParams();
  const Lab = findLabModule(params.lab);
  const Section = findSectionModule(params.lab, params.section);
  const sections = findSectionsForLab(params.lab);
  const sectionIndex = sections.findIndex(
    ({ path }) => path === `./labs/${params.lab}/${params.section}.mdx`,
  );

  const nextSection = sections[sectionIndex + 1];

  if (!Section) {
    return <div>Section not found</div>;
  }
  return (
    <>
      <div id="lesson-contents">
        <h1>{Section.title}</h1>
        <Section.default />
        {nextSection && (
          <>
            Go to next section:{" "}
            <NavLink
              to={`/lab/${params.lab}/${nextSection.path
                .split("/")[3]
                .replace(".mdx", "")}`}
            >
              {nextSection.module.title ?? "(title missing)"}
            </NavLink>
          </>
        )}
      </div>
      {Lab.hidePreview === true ? null : (
        <Preview key={`${params.lab}/${params.section}`} />
      )}
    </>
  );
};

const findSectionsForLab = (lab: string) => {
  return Object.entries(sections)
    .filter(([path]) => path.startsWith(`./labs/${lab}/section-`))
    .map(([path, module]) => {
      return {
        path,
        module,
      };
    });
};

export const Book = () => {
  return (
    <div id="book-layout">
      <ol id="table-of-contents">
        <h1 id="title">Intro to React</h1>
        {Object.entries(labs).map(([path, module], index) => {
          const labName = path.split("/")[2];
          return (
            <li key={path} className="lab">
              <NavLink to={`/lab/${labName}`}>
                <span className="index">{index + 1}. </span>
                <span className="title">
                  {module.title ?? "(title missing)"}
                </span>
              </NavLink>
              <ol className="section">
                {true &&
                  findSectionsForLab(labName).map(({ path, module }) => {
                    return (
                      <li key={path}>
                        <NavLink
                          to={`/lab/${labName}/${path
                            .split("/")[3]
                            .replace(".mdx", "")}`}
                        >
                          {module.title ?? "(title missing)"}
                        </NavLink>
                      </li>
                    );
                  })}
              </ol>
            </li>
          );
        })}
        <div id="gutter" />
      </ol>

      <Routes>
        <Route path="/lab/:lab" element={<Lab />} />
        <Route path="/lab/:lab/:section" element={<Section />} />
      </Routes>
    </div>
  );
};

const Preview = () => {
  const pathname = useLocation().pathname;
  const labPath = pathname.split("/")[2];
  const sectionModule = findSectionModule(
    pathname.split("/")[2],
    pathname.split("/")[3],
  );

  const [mode, setMode] = useState("/your-solution");

  const previewPath = [
    "/labs/",
    labPath,
    mode,
    sectionModule?.sectionPrefix ?? "",
    "/index.html",
  ].join("");

  const [previewLogs, setPreviewLogs] = useState([]);
  const previewRef = useRef<HTMLIFrameElement>();
  const consoleRef = useRef<HTMLDivElement>();
  const [navCount, setNavCount] = useState(0);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const hookedConsole = Hook(console, (log) => {
      setPreviewLogs((logs) => [...logs, ...log]);
    });
    let hookedPreviewConsole;
    if (previewRef.current) {
      hookedPreviewConsole = Hook(
        previewRef.current.contentWindow.console,
        (log) => {
          if (consoleRef.current) {
            requestAnimationFrame(() => {
              consoleRef.current.scrollTo(0, consoleRef.current.scrollHeight);
            });
          }
          setPreviewLogs((currLogs) => [...currLogs, log]);
        },
        false,
      );
    }
    return () => {
      Unhook(hookedConsole);
      hookedPreviewConsole && Unhook(hookedPreviewConsole);
      // setPreviewLogs([]);
    };
  }, [previewPath, navCount]);

  useEffect(() => {
    const consoleEl = consoleRef.current;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement) {
              node.querySelectorAll("span").forEach((span) => {
                if (span.innerText.match("__console_feed_remaining__")) {
                  span.remove();
                }
              });
            }
          }
        }
      }
    });

    observer.observe(consoleEl, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const omitPreview = sectionModule?.consoleOnly ?? false;
  return (
    <div id="preview">
      {omitPreview || (
        <BrowserWindow
          showChrome
          noPadding
          address={previewPath}
          controls={
            <>
              <select
                value={mode}
                onChange={(event) => {
                  setMode(event.target.value);
                }}
              >
                <option value="/collins-solution">Collins Solution</option>
                <option value="/your-solution">Your Solution</option>
              </select>
              <a href={previewPath} target="_blank">
                Open in New Tab
              </a>
            </>
          }
        >
          {loadError && (
            <div
              style={{
                background: "#fcc",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ color: "red", fontSize: "3rem" }}>
                Error loading.
              </span>
              {previewPath}
            </div>
          )}
          {pathname.startsWith("/lab/") && (
            <iframe
              ref={previewRef}
              id="preview-iframe"
              src={previewPath}
              onLoad={() => {
                setNavCount((count) => count + 1);
                if (previewRef.current.contentDocument.body.innerHTML === "") {
                  setLoadError(true);
                } else {
                  setLoadError(false);
                }
              }}
            />
          )}
        </BrowserWindow>
      )}
      <div id="console">
        <div id="console-controls">
          <button
            onClick={() => {
              setPreviewLogs([]);
            }}
          >
            ∅ Clear
          </button>
        </div>
        <div ref={consoleRef} id="logs">
          <Console logs={previewLogs} variant="light" />
        </div>
      </div>
    </div>
  );
};
