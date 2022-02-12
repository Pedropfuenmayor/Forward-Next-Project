import { printIntrospectionSchema } from "graphql";
import React from "react";
import { RefType, Props } from "../../models/models";

const LinkButton = React.forwardRef<RefType, Props>(({ onClick, href, children}, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        {children}
      </a>
    )
  })

  export default LinkButton