"use client";

import { DiagramStep } from "@/data/types";
import { ArrayDiagram } from "./ArrayDiagram";
import { HashMapDiagram } from "./HashMapDiagram";
import { GridDiagram } from "./GridDiagram";
import { LinkedListDiagram } from "./LinkedListDiagram";

export function DiagramRenderer({ step }: { step: DiagramStep }) {
  switch (step.type) {
    case "array":
      return <ArrayDiagram values={step.values} highlights={step.highlights} pointers={step.pointers} window={step.window} />;
    case "hashmap":
      return <HashMapDiagram entries={step.entries} lookup={step.lookup} />;
    case "grid":
      return <GridDiagram matrix={step.matrix} visited={step.visited} current={step.current} frontier={step.frontier} path={step.path} />;
    case "linked-list":
      return <LinkedListDiagram values={step.values} pointers={step.pointers} removedIndex={step.removedIndex} />;
    case "narrative":
    default:
      return null;
  }
}
