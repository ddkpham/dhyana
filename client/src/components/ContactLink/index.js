import React from "react";
import { Link } from "react-router-dom";

function ContactLink(props) {
  const { first_name, last_name } = props;
  console.log("ContactLink -> first_name, last_name", first_name, last_name);
  return (
    <div>
      <Link
        to={{
          pathname: `/contact/${first_name}/${last_name}`,
          param: "test",
          state: {
            first_name,
            last_name,
          },
        }}
      >
        {first_name} {last_name}
      </Link>
    </div>
  );
}

export default ContactLink;
