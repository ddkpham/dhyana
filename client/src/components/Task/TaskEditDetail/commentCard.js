import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Comment = ({ description, username }) => {
  return (
    <div style={{width: 555, borderBottom: "0.5px solid lightgrey", paddingLeft: 10, paddingTop: 5, paddingBottom: 3,}}>
        <Typography variant="body2" gutterBottom>
            {username}
        </Typography>
        <Typography style={{paddingLeft: 3, textSizeAdjust: 0.1}} variant="caption" gutterBottom>
            {description}
        </Typography>
    </div>
  );
};

export default Comment;
