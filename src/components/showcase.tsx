"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
  ExternalLink,
  Maximize2,
} from "lucide-react";
import { projects } from "@/lib/content";
import { ContactLink } from "./contact";
import { FloristDemo } from "./florist-demo";

export function Showcase({
  initialId = projects[0].id,
  standalone = false,
}: {
  initialId?: string;
  standalone?: boolean;
}) {
  const [index, setIndex] = useState(
    Math.max(
      0,
      projects.findIndex((p) => p.id === initialId),
    ),
  );
  const [exploring, setExploring] = useState(false);
  const [frameFailed, setFrameFailed] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const exploreButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const project = projects[index];
  useEffect(() => {
    if (exploring) closeButton.current?.focus();
    else if (restoreFocus.current) {
      exploreButton.current?.focus();
      restoreFocus.current = false;
    }
  }, [exploring]);
  function change(direction: number) {
    setExploring(false);
    setFrameFailed(false);
    setFrameLoaded(false);
    setIndex((i) => (i + direction + projects.length) % projects.length);
  }
  function close() {
    restoreFocus.current = true;
    setExploring(false);
  }
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      id="ejemplos"
      className={`showcase section-shell ${standalone ? "standalone" : ""}`}
      aria-labelledby="showcase-title"
    >
      <div className="section-label">
        <span>01 / POSIBILIDADES REALES</span>
        <span>IMAGINA EL TUYO AQUÍ</span>
      </div>
      <div className="showcase-heading">
        <Heading id="showcase-title">
          Tu negocio.
          <br />
          <span>Otra dimensión.</span>
        </Heading>
        <span className="project-counter" aria-live="polite" aria-atomic="true">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="muted">
            / {String(projects.length).padStart(2, "0")}
          </span>
        </span>
      </div>
      <div className="showcase-carousel">
        <button
          className="stage-arrow stage-arrow-left"
          onClick={() => change(-1)}
          aria-label="Negocio anterior"
        >
          <ArrowLeft size={25} />
        </button>
        <div className="project-stage" key={project.id}>
          <div className="stage-top">
            <span className="stage-dot" />
            <span>{`${project.mode === "internal" ? "CONCEPTO" : "PROYECTO"} / ${project.brand.toUpperCase()}`}</span>
            <span className="stage-right">
              {project.mode === "internal" ? "DEMO INTERACTIVA" : "SITIO REAL"}
              <Maximize2 size={14} />
            </span>
          </div>
          <div
            className="demo-viewer"
            onKeyDown={(event) => {
              if (event.key === "Escape" && exploring) close();
            }}
          >
            {exploring && (
              <div className="viewer-toolbar">
                <span>{project.sector}</span>
                <div>
                  {project.mode === "external" && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir aparte <ExternalLink size={14} />
                    </a>
                  )}
                  <button ref={closeButton} onClick={close}>
                    Cerrar demo <X size={16} />
                  </button>
                </div>
              </div>
            )}
            {project.mode === "external" ? (
              project.embeddable && !frameFailed ? (
                <>
                  <div
                    className={`live-project ${exploring ? "is-interactive" : "is-preview"}`}
                  >
                    {!frameLoaded && (
                      <div className="frame-loading" role="status">
                        Cargando {project.brand}…
                      </div>
                    )}
                    <iframe
                      src={project.url}
                      title={`Sitio real de ${project.brand}`}
                      className="external-demo"
                      loading="lazy"
                      onLoad={() => setFrameLoaded(true)}
                      onError={() => setFrameFailed(true)}
                      tabIndex={exploring ? 0 : -1}
                      inert={!exploring}
                      aria-hidden={!exploring}
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                    {!exploring && (
                      <button
                        ref={exploreButton}
                        onClick={() => setExploring(true)}
                        className="live-preview-activate"
                        aria-label="Explorar sitio"
                      >
                        <span>
                          Explorar sitio <ArrowUpRight size={18} />
                        </span>
                      </button>
                    )}
                  </div>
                  <p className="frame-help">
                    ¿La web no se muestra?{" "}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ábrela en otra pestaña <ArrowUpRight size={14} />
                    </a>
                  </p>
                </>
              ) : (
                <div className="frame-fallback">
                  <h3>Explora el sitio completo.</h3>
                  <p>Visita el proyecto en su propia pestaña.</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-green"
                  >
                    Abrir sitio <ArrowUpRight size={17} />
                  </a>
                </div>
              )
            ) : exploring ? (
              <FloristDemo />
            ) : (
              <div className="project-preview">
                <div className="preview-copy">
                  <div className="preview-brand">
                    {project.brand}
                    <span>{project.brandSubtitle}</span>
                  </div>
                  <p className="preview-kicker">{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <button
                    ref={exploreButton}
                    onClick={() => setExploring(true)}
                    className="preview-explore"
                  >
                    Explorar sitio <ArrowUpRight size={18} />
                  </button>
                </div>
                <div className="preview-image">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                  />
                  <span>{project.caption}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          className="stage-arrow stage-arrow-right"
          onClick={() => change(1)}
          aria-label="Negocio siguiente"
        >
          <ArrowRight size={25} />
        </button>
      </div>
      <div className="project-caption">
        <div>
          <span className="project-sector">{project.sector}</span>
          <span className="project-kind">
            {project.mode === "internal"
              ? "Diseño conceptual"
              : "Proyecto real"}
          </span>
        </div>
        <div className="project-actions">
          {project.mode === "external" ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Abrir sitio <ExternalLink size={17} />
            </a>
          ) : (
            <Link href={`/sectores/${project.id}`}>
              Enlace del sector <ArrowUpRight size={17} />
            </Link>
          )}
          <ContactLink className="text-link">Quiero algo así</ContactLink>
        </div>
      </div>
      <p className="showcase-statement">
        Tu negocio no es igual al otro.
        <br />
        <span>Tu sitio web tampoco debería serlo.</span>
      </p>
    </section>
  );
}
