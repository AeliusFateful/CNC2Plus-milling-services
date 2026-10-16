"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/site/portfolio-modal").then((m) => m.PortfolioModal), {
  ssr: false,
});

type Props = React.ComponentProps<typeof Modal>;

/** Окно проекта подгружается отдельным чанком при первом открытии, а не вместе со страницей. */
export function PortfolioModal(props: Props) {
  const requested = useRef(false);
  if (props.work) requested.current = true;
  return requested.current ? <Modal {...props} /> : null;
}
