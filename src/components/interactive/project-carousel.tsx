import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ElementRef,
  type MouseEvent,
  type SetStateAction,
  type UIEvent,
} from "react";
import { cx } from "class-variance-authority";
import { clamp, cn, formatDate } from "src/lib/utils";
import Icons from "@components/ui/icons";
import type { Project } from "src/lib/projects";

interface ProjectSlideProps {
  project: Project;
  index: number;
  currentIndex: number;
  isDisabled: boolean;
  isDragging: boolean;
  carouselWidth: number;
  scrollPosition: MotionValue<number>;
}

function ProjectSlide({
  project,
  index,
  currentIndex,
  isDisabled,
  isDragging,
  carouselWidth,
  scrollPosition,
}: ProjectSlideProps) {
  const slideRef = useRef<ElementRef<"li">>(null);
  const [slideOffsetLeft, setSlideOffsetLeft] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const imagePosition = useTransform(
    scrollPosition,
    [slideOffsetLeft + slideWidth, slideOffsetLeft - carouselWidth],
    ["0%", "100%"]
  );

  const updateSlideConstraints = useCallback(() => {
    if (!slideRef.current) return;

    setSlideOffsetLeft(slideRef.current.offsetLeft);
    setSlideWidth(slideRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    updateSlideConstraints();

    window.addEventListener("resize", updateSlideConstraints);
    window.addEventListener("orientationchange", updateSlideConstraints);

    return () => {
      window.removeEventListener("resize", updateSlideConstraints);
      window.removeEventListener("orientationchange", updateSlideConstraints);
    };
  }, [updateSlideConstraints]);

  return (
    <motion.li
      key={project._id}
      ref={slideRef}
      aria-labelledby={`project-item-${project._id}-heading`}
      data-item-index={index}
      aria-current={currentIndex === index}
      aria-hidden={isDisabled}
      className="relative aspect-[2/3] w-[clamp(18rem,42vmin,26rem)] overflow-hidden rounded-md shadow-lg"
    >
      <a
        href={`/project/${project.slug.current}`}
        aria-label={
          isDisabled ? undefined : `Show ${project.name} project details`
        }
        data-astro-prefetch
        aria-disabled={isDisabled}
        className={cx(
          "group block h-full w-full rounded-md border border-neutrals-50/30",
          (isDisabled || isDragging) && "pointer-events-none"
        )}
        draggable={false}
      >
        <article
          className={cn(
            "absolute text-white z-20 inset-0 flex flex-col items-center justify-center gap-y-2 bg-neutrals-900/50 p-4 text-center opacity-0 backdrop-blur-sm transition-opacity duration-300",
            !isDisabled &&
              "group-hover:opacity-100 group-focus-visible:opacity-100"
          )}
        >
          <div className="overflow-hidden">
            <time
              dateTime={project.date}
              className="block translate-y-full text-xs uppercase text-neutrals-50/90 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0"
            >
              {formatDate(project.date)}
            </time>
          </div>
          <div className="overflow-hidden">
            <h3
              id={`project-item-${project._id}-heading`}
              className="translate-y-full text-2xl font-bold transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 lg:text-4xl"
            >
              {project.name}
            </h3>
          </div>
          {project.tags && (
            <div className="overflow-hidden">
              <p className="translate-y-full text-xs text-neutrals-50/90 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 lg:text-sm">
                {project.tags.join(", ")}
              </p>
            </div>
          )}
        </article>
        <motion.img
          alt={project.name}
          loading="lazy"
          decoding="async"
          src={project.poster}
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-full w-full object-cover transition-[transform,opacity,filter] duration-700",
            isDisabled
              ? "opacity-20 grayscale"
              : "group-hover:scale-105 group-focus-visible:scale-105"
          )}
          style={{
            objectPosition: imagePosition,
            // backgroundColor:
            //   project.poster.asset.metadata.palette.dominant.background,
          }}
        />
      </a>
    </motion.li>
  );
}

const CAROUSEL_SLIDES_GAP = 24;

interface ProjectCarouselProps {
  projects: Project[];
}

function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const carouselWrapperRef = useRef<ElementRef<"div">>(null);
  const carouselRef = useRef<ElementRef<"ul">>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [carouselSlideWidth, setCarouselSlideWidth] = useState(0);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const scrollPosition = useMotionValue(0);
  const scrollProgress = useTransform(
    scrollPosition,
    [0, maxScrollWidth],
    ["0%", "100%"]
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{
    scrollX: number;
    pointerX: number;
  } | null>(null);

  const updateCarouselConstraints = useCallback(() => {
    if (
      !carouselWrapperRef.current ||
      !carouselRef.current ||
      !carouselRef.current.firstElementChild
    )
      return;

    setCarouselWidth(carouselWrapperRef.current.offsetWidth);
    setCarouselSlideWidth(
      (carouselRef.current.firstElementChild as ElementRef<"li">).offsetWidth
    );
    setMaxScrollWidth(
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
    );
  }, []);

  useEffect(() => {
    updateCarouselConstraints();

    window.addEventListener("resize", updateCarouselConstraints);
    window.addEventListener("orientationchange", updateCarouselConstraints);

    return () => {
      window.removeEventListener("resize", updateCarouselConstraints);
      window.removeEventListener(
        "orientationchange",
        updateCarouselConstraints
      );
    };
  }, [updateCarouselConstraints]);

  function updateCurrentSlide(latestScrollPosition: number) {
    setCurrentSlide(
      clamp(
        0,
        Math.round(
          latestScrollPosition / (carouselSlideWidth + CAROUSEL_SLIDES_GAP)
        ),
        projects.length - 1
      )
    );
  }

  useMotionValueEvent(scrollPosition, "change", updateCurrentSlide);

  function scrollToSlide(slideIndex: number) {
    if (!carouselRef.current) return;

    carouselRef.current.scrollTo({
      left: slideIndex * (carouselSlideWidth + CAROUSEL_SLIDES_GAP),
      behavior: "smooth",
    });
  }

  function scrollToPreviousSlide() {
    scrollToSlide(currentSlide - 1);
  }

  function scrollToNextSlide() {
    scrollToSlide(currentSlide + 1);
  }

  const handleScroll = useCallback(
    (event: UIEvent<ElementRef<"ul">>) => {
      scrollPosition.set(event.currentTarget.scrollLeft);
    },
    [scrollPosition]
  );

  const handleMouseDown = useCallback((event: MouseEvent) => {
    const isMainMouseButtonClicked = event.button === 0;

    if (isMainMouseButtonClicked) {
      setDragStart({
        scrollX: (event.currentTarget as HTMLElement).scrollLeft,
        pointerX: event.clientX,
      });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (carouselRef.current && dragStart) {
        const distanceX = event.clientX - dragStart.pointerX;

        carouselRef.current.scrollTo({
          left: dragStart.scrollX - distanceX,
        });
        if (!isDragging) setIsDragging(true);
      }
    },
    [dragStart, isDragging]
  );

  return (
    <div ref={carouselWrapperRef} className="mt-4 w-full">
      <div className="relative py-8">
        <div
          aria-label="Carousel Controls"
          className="pointer-events-none absolute top-1/2 z-30 flex w-full -translate-y-1/2 justify-between px-4 lg:px-8"
        >
          <button
            type="button"
            onClick={scrollToPreviousSlide}
            title="Previous project slide"
            aria-controls="project-carousel"
            disabled={currentSlide === 0}
            className="pointer-events-auto aspect-square h-fit rounded-full border border-neutrals-600  bg-neutrals-900/90 p-4 text-neutrals-100 drop-shadow-md backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutrals-900/50"
          >
            <Icons.ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={scrollToNextSlide}
            title="Next project slide"
            aria-controls="project-carousel"
            disabled={currentSlide === projects.length - 1}
            className="pointer-events-auto aspect-square h-fit rounded-full border border-neutrals-600 bg-neutrals-900/90 p-4 text-neutrals-100 drop-shadow-md backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-50 supports-[backdrop-filter]:bg-neutrals-900/50"
          >
            <Icons.ChevronRight className="size-5" />
          </button>
        </div>
        <div className="h-[calc(clamp(18rem,42vmin,26rem)*3/2)] touch-none select-none overflow-hidden">
          <ul
            ref={carouselRef}
            id="project-carousel"
            aria-label="Project Carousel"
            onScroll={handleScroll}
            onMouseDownCapture={handleMouseDown}
            onMouseUpCapture={handleMouseUp}
            onMouseMoveCapture={handleMouseMove}
            className={cn(
              "grid auto-cols-min grid-flow-col gap-x-6 overflow-x-auto pe-[calc(50vw-(clamp(18rem,42vmin,26rem)+1.5rem)/2)] ps-[calc(50vw-clamp(18rem,42vmin,26rem)/2-7px)] lg:pe-[calc((50vw-150px)-(clamp(18rem,42vmin,26rem)+1.5rem)/2)]  lg:ps-[calc((50vw-150px)-clamp(18rem,42vmin,26rem)/2-7px)] xl:pe-[calc((50vw-304px)-(clamp(18rem,42vmin,26rem)+1.5rem)/2)] xl:ps-[calc((50vw-304px)-clamp(18rem,42vmin,26rem)/2-7px)]",
              isDragging && "cursor-grabbing"
            )}
          >
            {projects.map((project, index) => (
              <ProjectSlide
                key={project._id}
                project={project}
                index={index}
                currentIndex={currentSlide}
                isDisabled={false}
                isDragging={isDragging}
                carouselWidth={carouselWidth}
                scrollPosition={scrollPosition}
              />
            ))}
          </ul>
        </div>
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Project {currentSlide + 1} of {projects.length}
        </p>
      </div>
      <div className="h-px w-full bg-gradient-to-r  from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30">
        <motion.div
          style={{ width: scrollProgress }}
          className="h-full bg-gradient-to-r from-neutrals-600/60 via-neutrals-600 to-neutrals-600/60"
        />
      </div>
    </div>
  );
}

export default ProjectCarousel;
