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
import { useContact, ContactLink } from "./contact";
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
  const exploreButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const { setContext } = useContact();
  const project = projects[index];
  useEffect(() => {
    setContext(`un sitio web para ${project.sector.toLowerCase()}`);
  }, [project, setContext]);
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
        <div className="showcase-description">
          <p>
            No todos los negocios son iguales.
            <br />
            Sus sitios web tampoco deberían serlo.
          </p>
          <div className="carousel-controls">
            <span aria-live="polite" aria-atomic="true">
              {String(index + 1).padStart(2, "0")}{" "}
              <span className="muted">
                / {String(projects.length).padStart(2, "0")}
              </span>
            </span>
            <button onClick={() => change(-1)} aria-label="Negocio anterior">
              <ArrowLeft size={21} />
            </button>
            <button onClick={() => change(1)} aria-label="Negocio siguiente">
              <ArrowRight size={21} />
            </button>
          </div>
        </div>
      </div>
      <div className="project-stage" key={project.id}>
        <div className="stage-top">
          <span className="stage-dot" />
          <span>{`${project.mode === "internal" ? "CONCEPTO" : "PROYECTO"} / ${project.brand.toUpperCase()}`}</span>
          <span className="stage-right">
            {project.mode === "internal"
              ? "DEMO INTERACTIVA"
              : "SITIO PUBLICADO"}
            <Maximize2 size={14} />
          </span>
        </div>
        {exploring ? (
          <div
            className="demo-viewer"
            onKeyDown={(event) => {
              if (event.key === "Escape") close();
            }}
          >
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
            {project.mode === "internal" ? (
              <FloristDemo />
            ) : project.embeddable && !frameFailed ? (
              <>
                <iframe
                  src={project.url}
                  title={`Sitio de ${project.title}`}
                  className="external-demo"
                  onError={() => setFrameFailed(true)}
                  referrerPolicy="strict-origin-when-cross-origin"
                />
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
                <p>Este proyecto se puede visitar en su propia pestaña.</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-green"
                >
                  Abrir sitio <ArrowUpRight size={17} />
                </a>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`project-preview ${project.theme === "medical" ? "medical-preview" : ""}`}
          >
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
              <img src={project.image} alt={project.imageAlt} loading="lazy" />
              <span>{project.caption}</span>
            </div>
          </div>
        )}
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
          {project.mode === "external" && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Abrir sitio <ExternalLink size={15} />
            </a>
          )}
          <Link href={`/sectores/${project.id}`}>
            Enlace del sector <ArrowUpRight size={15} />
          </Link>
          <ContactLink
            className="text-link"
            context={`un sitio web para ${project.sector.toLowerCase()}`}
          >
            Quiero algo así
          </ContactLink>
        </div>
      </div>
    </section>
  );
}
