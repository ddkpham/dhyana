import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Comment = ({ description, username, date_created }) => {
  console.log("Comment -> date_created", date_created);
  return (
    <div
      style={{
        width: 555,
        borderBottom: "0.5px solid lightgrey",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 3,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" gutterBottom>
          {username}
        </Typography>
        <Typography
          style={{
            paddingLeft: 3,
            textSizeAdjust: 0.1,
            fontSize: "0.6em",
            color: "lightgrey",
          }}
          variant="caption"
          gutterBottom
        >
          {date_created}
        </Typography>
      </div>
      <Typography
        style={{ paddingLeft: 3, textSizeAdjust: 0.1 }}
        variant="caption"
        gutterBottom
      >
        {description}
      </Typography>
    </div>
  );
};

export default Comment;
