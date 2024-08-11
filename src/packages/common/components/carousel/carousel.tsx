"use client";

import { Flex, IconButton } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useInViewport } from "react-in-viewport";

function CarouselChild({
  children,
  setVisible,
  index,
}: {
  children: React.ReactNode;
  setVisible: (index: number, vis: boolean) => any;
  index: number;
}) {
  const myRef = useRef<HTMLDivElement>(null);
  const { inViewport } = useInViewport(myRef, {
    threshold: 0.5,
  });

  useEffect(() => {
    setVisible(index, inViewport);
  }, [inViewport]);

  return (
    <div style={{ scrollSnapAlign: "center" }} ref={myRef}>
      {children}
    </div>
  );
}

interface Props {
  children: React.ReactNode[];
  showPagination?: boolean;
  showScrollbar?: boolean;
  showButtons?: boolean;
}

export function Carousel({
  children,
  showButtons,
  showPagination,
  showScrollbar,
}: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [firstElementInView, setFirstElementInView] = useState(0);
  const [lastElementInView, setLastElementInView] = useState(0);
  const [childrenVisibility, setChildrenVisibility] = useState<boolean[]>([]);

  function updateVisibleElements(index: number, isVisible: boolean) {
    const vis = childrenVisibility;
    vis[index] = isVisible;

    let firstVisible = -1;
    let lastVisible = 0;

    vis.forEach((childVisibility, childIndex) => {
      if (childVisibility) {
        if (firstVisible === -1) firstVisible = childIndex;
        else lastVisible = childIndex;
      }
    });

    setFirstElementInView(firstVisible);
    setLastElementInView(lastVisible);
    setChildrenVisibility(vis);
  }

  const scrollToChild = (childIndex: number) => {
    setTimeout(() => {
      carouselRef.current?.children[childIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }, 0);
  };

  return (
    <Flex position="relative">
      <Flex
        className={showScrollbar ? "" : "hideScrollbar"}
        ref={carouselRef}
        gap="4"
        overflowX="scroll"
        style={{ borderRadius: "8px", scrollSnapType: "x mandatory" }}
      >
        {children.map((child, index) => (
          <CarouselChild
            key={index}
            index={index}
            setVisible={updateVisibleElements}
          >
            {child}
          </CarouselChild>
        ))}
      </Flex>

      {firstElementInView > 0 && (
        <Flex position="absolute" left="-16px" height="100%" align="center">
          <IconButton
            size="2"
            variant="solid"
            onClick={() => scrollToChild(firstElementInView - 1)}
          >
            <BsChevronLeft />
          </IconButton>
        </Flex>
      )}

      {lastElementInView < children.length - 1 && (
        <Flex position="absolute" right="-16px" height="100%" align="center">
          <IconButton
            size="2"
            variant="solid"
            onClick={() => scrollToChild(lastElementInView + 1)}
          >
            <BsChevronRight />
          </IconButton>
        </Flex>
      )}
    </Flex>
  );
}
