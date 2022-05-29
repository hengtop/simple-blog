import React, { ReactElement } from "react";

import { FlexCenter } from "./style";

export default function Index({ children }: { children: ReactElement }) {
  return <FlexCenter>{children}</FlexCenter>;
}
